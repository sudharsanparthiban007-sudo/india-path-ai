import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    const rawBody = await req.text();
    const sig = req.headers.get('stripe-signature');

    let event: any;

    if (secretKey && webhookSecret && sig) {
      try {
        const stripe = new Stripe(secretKey, {
          apiVersion: '2025-02-24.acacia' as Stripe.LatestApiVersion,
        });
        event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
      } catch (err: any) {
        console.error('Webhook signature verification failed:', err.message);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
      }
    } else {
      // Fallback for simulation / direct invocation
      try {
        event = JSON.parse(rawBody);
      } catch {
        return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
      }
    }

    console.log(`[Next.js Webhook] Processing event: ${event.type}`);

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data?.object || {};
        const piId = paymentIntent.id || `pi_${Date.now()}`;
        const metadata = paymentIntent.metadata || {};
        const amountInInr = (paymentIntent.amount || 0) / 100;

        try {
          // Idempotency: check if payment is already marked 'paid'
          const existing = await prisma.payment.findUnique({
            where: { stripePaymentIntentId: piId },
          });

          if (existing && existing.status === 'paid') {
            console.log(`[Idempotent] PaymentIntent ${piId} is already paid.`);
            return NextResponse.json({ received: true, duplicate: true });
          }

          // Upsert payment status to 'paid'
          await prisma.payment.upsert({
            where: { stripePaymentIntentId: piId },
            update: {
              status: 'paid',
              amount: amountInInr,
            },
            create: {
              userId: metadata.userId ? Number(metadata.userId) : undefined,
              stripePaymentIntentId: piId,
              amount: amountInInr,
              currency: paymentIntent.currency || 'inr',
              status: 'paid',
            },
          });
        } catch (dbErr) {
          console.warn('[Webhook] Prisma payment update notice:', dbErr);
        }

        // Create confirmed booking pass if metadata is present
        if (metadata.poiName && metadata.bookingDate) {
          try {
            const userId = metadata.userId ? Number(metadata.userId) : 1;
            await prisma.booking.create({
              data: {
                userId,
                poiId: metadata.poiId ? Number(metadata.poiId) : null,
                poiName: metadata.poiName,
                bookingDate: metadata.bookingDate,
                timeSlot: metadata.timeSlot || 'General Entry',
                ticketCount: Number(metadata.ticketCount) || 1,
                amount: amountInInr,
                currency: 'INR',
                status: 'confirmed',
                stripeSessionId: piId,
                isTestMode: true,
              },
            });
          } catch (bkErr) {
            console.warn('[Webhook] Prisma booking creation notice:', bkErr);
          }
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data?.object || {};
        try {
          await prisma.payment.updateMany({
            where: { stripePaymentIntentId: paymentIntent.id },
            data: { status: 'failed' },
          });
        } catch {}
        break;
      }

      case 'payment_intent.canceled': {
        const paymentIntent = event.data?.object || {};
        try {
          await prisma.payment.updateMany({
            where: { stripePaymentIntentId: paymentIntent.id },
            data: { status: 'cancelled' },
          });
        } catch {}
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: error.message || 'Webhook failed' }, { status: 500 });
  }
}
