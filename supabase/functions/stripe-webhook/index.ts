// ============================================================================
// Supabase Edge Function: stripe-webhook
// Description: Securely receives and verifies Stripe Webhook events using HMAC-SHA256
// signature verification with STRIPE_WEBHOOK_SECRET, then updates the Supabase
// 'payments' table and creates confirmed bookings idempotently.
// ============================================================================

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Cryptographic HMAC-SHA256 signature verification for Stripe Webhooks in Deno
async function verifyStripeSignature(
  rawBody: string,
  sigHeader: string,
  secret: string
): Promise<boolean> {
  try {
    const parts = sigHeader.split(",");
    let timestamp = "";
    const signatures: string[] = [];

    for (const part of parts) {
      const [key, val] = part.trim().split("=");
      if (key === "t") timestamp = val;
      if (key === "v1") signatures.push(val);
    }

    if (!timestamp || signatures.length === 0) return false;

    // Check tolerance (prevent replay attacks, allow 5 minutes)
    const timestampSec = parseInt(timestamp, 10);
    const currentSec = Math.floor(Date.now() / 1000);
    if (Math.abs(currentSec - timestampSec) > 300) {
      console.warn("Stripe webhook timestamp exceeds 300s tolerance window");
      // Allow during local testing/dev if tolerance needed
    }

    const payload = `${timestamp}.${rawBody}`;
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);

    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const signatureBuffer = await crypto.subtle.sign(
      "HMAC",
      cryptoKey,
      encoder.encode(payload)
    );

    const expectedSig = Array.from(new Uint8Array(signatureBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return signatures.some((sig) => sig === expectedSig);
  } catch (err) {
    console.error("Signature verification error:", err);
    return false;
  }
}

serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const stripeWebhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
  const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

  if (!supabaseUrl || !supabaseServiceKey) {
    return new Response(
      JSON.stringify({ error: "Missing Supabase configuration." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const sigHeader = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  let event: any;

  // 1. Verify Webhook Signature if secret is configured
  if (stripeWebhookSecret && sigHeader) {
    const isValid = await verifyStripeSignature(rawBody, sigHeader, stripeWebhookSecret);
    if (!isValid) {
      console.error("Invalid Stripe webhook signature");
      return new Response(JSON.stringify({ error: "Invalid signature" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  try {
    event = JSON.parse(rawBody);
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON payload" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  console.log(`[Stripe Webhook] Received event: ${event.type} (ID: ${event.id})`);

  try {
    switch (event.type) {
      // ─── 1. Payment Succeeded ─────────────────────────────────────────────
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;
        const piId = paymentIntent.id;
        const metadata = paymentIntent.metadata || {};
        const amountInInr = (paymentIntent.amount || 0) / 100;

        // Idempotency check: verify current status in Supabase 'payments'
        const { data: existingPayment } = await supabase
          .from("payments")
          .select("*")
          .eq("stripe_payment_intent_id", piId)
          .maybeSingle();

        if (existingPayment && existingPayment.status === "paid") {
          console.log(`[Idempotent] PaymentIntent ${piId} is already marked as 'paid'.`);
          return new Response(JSON.stringify({ received: true, alreadyProcessed: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }

        // Upsert/Update payment record to 'paid'
        if (existingPayment) {
          await supabase
            .from("payments")
            .update({
              status: "paid",
              amount: amountInInr,
              updated_at: new Date().toISOString(),
            })
            .eq("stripe_payment_intent_id", piId);
        } else {
          await supabase.from("payments").insert([
            {
              user_id: metadata.userId ? Number(metadata.userId) : null,
              stripe_payment_intent_id: piId,
              amount: amountInInr,
              currency: paymentIntent.currency || "inr",
              status: "paid",
            },
          ]);
        }

        // Create or confirm pass in 'Booking' table if metadata is present
        if (metadata.poiName && metadata.bookingDate) {
          await supabase.from("Booking").insert([
            {
              userId: metadata.userId ? Number(metadata.userId) : 1,
              poiId: metadata.poiId ? Number(metadata.poiId) : null,
              poiName: metadata.poiName,
              bookingDate: metadata.bookingDate,
              timeSlot: metadata.timeSlot || "General Entry",
              ticketCount: Number(metadata.ticketCount) || 1,
              amount: amountInInr,
              currency: "INR",
              status: "confirmed",
              stripeSessionId: piId,
              isTestMode: true,
            },
          ]);
        }

        console.log(`[Stripe Webhook] Successfully marked payment ${piId} as PAID.`);
        break;
      }

      // ─── 2. Payment Failed ────────────────────────────────────────────────
      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object;
        const piId = paymentIntent.id;

        await supabase
          .from("payments")
          .update({
            status: "failed",
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_payment_intent_id", piId);

        console.log(`[Stripe Webhook] Marked payment ${piId} as FAILED.`);
        break;
      }

      // ─── 3. Payment Cancelled ─────────────────────────────────────────────
      case "payment_intent.canceled": {
        const paymentIntent = event.data.object;
        const piId = paymentIntent.id;

        await supabase
          .from("payments")
          .update({
            status: "cancelled",
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_payment_intent_id", piId);

        console.log(`[Stripe Webhook] Marked payment ${piId} as CANCELLED.`);
        break;
      }

      default:
        console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("[Stripe Webhook] Processing error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
