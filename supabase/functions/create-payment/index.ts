// ============================================================================
// Supabase Edge Function: create-payment
// Description: Securely creates a Stripe PaymentIntent in Test Mode after server-side
// price validation and logs a 'pending' record in the Supabase 'payments' table.
// ============================================================================

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Official server-side verified pricing rules
function calculateServerPrice(poiName: string, category: string, ticketCount: number): number {
  const count = Math.max(1, Math.min(20, Number(ticketCount) || 1));
  const cat = (category || "").toLowerCase();
  const name = (poiName || "").toLowerCase();

  let pricePerTicket = 150; // Default Heritage Site pass in INR

  if (cat.includes("temple") || name.includes("temple") || name.includes("kovil")) {
    pricePerTicket = 50; // Temple Special Darshan / Entrance fee
  } else if (cat.includes("beach") || name.includes("beach")) {
    pricePerTicket = 100; // Beach / Coastal Walk pass
  } else if (cat.includes("nature")) {
    pricePerTicket = 100;
  }

  return pricePerTicket * count;
}

serve(async (req: Request) => {
  // 1. Handle CORS Preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const stripePublishableKey = Deno.env.get("STRIPE_PUBLISHABLE_KEY") || "";

    if (!stripeSecretKey) {
      return new Response(
        JSON.stringify({
          error: "STRIPE_SECRET_KEY is not configured in Supabase Edge Function secrets.",
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Safety check: Strict Sandbox / Test Mode only
    if (!stripeSecretKey.startsWith("sk_test_")) {
      return new Response(
        JSON.stringify({
          error: "Security Policy: Only Stripe Sandbox test keys (sk_test_...) are permitted.",
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 2. Parse request payload
    const body = await req.json();
    const {
      poiId,
      poiName,
      category = "heritage",
      bookingDate,
      timeSlot = "09:00 AM - 12:00 PM",
      ticketCount = 1,
      userId = null,
      customerEmail,
    } = body;

    if (!poiName || !bookingDate) {
      return new Response(
        JSON.stringify({ error: "Missing required booking details (poiName, bookingDate)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 3. Server-side price validation (Never trust client-submitted price)
    const verifiedAmount = calculateServerPrice(poiName, category, ticketCount);
    const amountInPaise = Math.round(verifiedAmount * 100);

    // 4. Create Stripe PaymentIntent via Stripe REST API
    const stripeParams = new URLSearchParams();
    stripeParams.append("amount", amountInPaise.toString());
    stripeParams.append("currency", "inr");
    stripeParams.append("payment_method_types[]", "card");
    stripeParams.append("description", `Pass for ${poiName} (${ticketCount} tickets)`);
    if (customerEmail) {
      stripeParams.append("receipt_email", customerEmail);
    }

    // Attach metadata for reconciliation
    stripeParams.append("metadata[poiId]", String(poiId || ""));
    stripeParams.append("metadata[poiName]", String(poiName));
    stripeParams.append("metadata[bookingDate]", String(bookingDate));
    stripeParams.append("metadata[timeSlot]", String(timeSlot));
    stripeParams.append("metadata[ticketCount]", String(ticketCount));
    stripeParams.append("metadata[amount]", String(verifiedAmount));
    stripeParams.append("metadata[userId]", String(userId || ""));
    stripeParams.append("metadata[isTestMode]", "true");

    const stripeResponse = await fetch("https://api.stripe.com/v1/payment_intents", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: stripeParams.toString(),
    });

    const paymentIntent = await stripeResponse.json();

    if (!stripeResponse.ok || paymentIntent.error) {
      console.error("Stripe API error:", paymentIntent.error);
      return new Response(
        JSON.stringify({ error: paymentIntent.error?.message || "Failed to create PaymentIntent" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 5. Create 'pending' record in Supabase 'payments' table
    if (supabaseUrl && supabaseServiceKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        await supabase.from("payments").insert([
          {
            user_id: userId ? Number(userId) : null,
            stripe_payment_intent_id: paymentIntent.id,
            amount: verifiedAmount,
            currency: "inr",
            status: "pending",
          },
        ]);
      } catch (dbErr) {
        console.warn("Failed to log pending payment to database:", dbErr);
      }
    }

    // 6. Return ONLY the client secret to the client (NEVER the secret key)
    return new Response(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        amount: verifiedAmount,
        currency: "inr",
        publishableKey: stripePublishableKey,
        poiName,
        bookingDate,
        ticketCount,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Edge function create-payment error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
