import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { paymentIntentId, paymentMethod = 'pm_card_visa' } = body;

    if (!paymentIntentId) {
      return NextResponse.json({ error: 'paymentIntentId is required' }, { status: 400 });
    }

    const secretKey = process.env.STRIPE_SECRET_KEY?.trim();

    // If Stripe secret key is not set, simulate successful confirmation
    if (!secretKey || !secretKey.startsWith('sk_test_')) {
      return NextResponse.json({
        success: true,
        isSimulated: true,
        paymentIntentId,
        status: 'succeeded',
        message: 'Simulated payment succeeded. To record real transactions in Stripe Sandbox Dashboard, configure STRIPE_SECRET_KEY in .env.local',
      });
    }

    const stripe = new Stripe(secretKey, {
      apiVersion: '2025-02-24.acacia' as Stripe.LatestApiVersion,
    });

    // Confirm PaymentIntent in real Stripe Sandbox
    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
      payment_method: paymentMethod || 'pm_card_visa',
      return_url: 'http://localhost:3000/bookings?success=true',
    });

    const amountInInr = (paymentIntent.amount || 0) / 100;
    const metadata = paymentIntent.metadata || {};

    if (paymentIntent.status === 'succeeded') {
      try {
        await prisma.payment.upsert({
          where: { stripePaymentIntentId: paymentIntent.id },
          update: { status: 'paid', amount: amountInInr },
          create: {
            userId: metadata.userId ? Number(metadata.userId) : undefined,
            stripePaymentIntentId: paymentIntent.id,
            amount: amountInInr,
            currency: paymentIntent.currency || 'inr',
            status: 'paid',
          },
        });
      } catch (e) {
        console.warn('DB payment update warning:', e);
      }

      if (metadata.poiName && metadata.bookingDate) {
        try {
          await prisma.booking.create({
            data: {
              userId: metadata.userId ? Number(metadata.userId) : 1,
              poiId: metadata.poiId ? Number(metadata.poiId) : null,
              poiName: metadata.poiName,
              bookingDate: metadata.bookingDate,
              timeSlot: metadata.timeSlot || 'General Entry',
              ticketCount: Number(metadata.ticketCount) || 1,
              amount: amountInInr,
              currency: 'INR',
              status: 'confirmed',
              stripeSessionId: paymentIntent.id,
              isTestMode: true,
            },
          });
        } catch (e) {
          console.warn('DB booking update warning:', e);
        }
      }
    }

    return NextResponse.json({
      success: true,
      status: paymentIntent.status,
      paymentIntentId: paymentIntent.id,
      amount: amountInInr,
      currency: paymentIntent.currency,
      isSimulated: false,
    });
  } catch (error: any) {
    console.error('Stripe PaymentIntent confirm error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to confirm payment with Stripe' },
      { status: 500 }
    );
  }
}
