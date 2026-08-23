import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

// Server-side verified pricing rules
function calculateServerPrice(poiName: string, category: string, ticketCount: number): number {
  const count = Math.max(1, Math.min(20, Number(ticketCount) || 1));
  const cat = (category || '').toLowerCase();
  const name = (poiName || '').toLowerCase();

  let pricePerTicket = 150; // Default Heritage Site pass in INR

  if (cat.includes('temple') || name.includes('temple') || name.includes('kovil')) {
    pricePerTicket = 50; // Temple Special Entry fee
  } else if (cat.includes('beach') || name.includes('beach')) {
    pricePerTicket = 100;
  } else if (cat.includes('nature')) {
    pricePerTicket = 100;
  }

  return pricePerTicket * count;
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.user?.id ? Number(session.user.id) : null;

    const body = await req.json();
    const {
      poiId,
      poiName,
      category = 'heritage',
      bookingDate,
      timeSlot = '09:00 AM - 12:00 PM',
      ticketCount = 1,
    } = body;

    if (!poiName || !bookingDate) {
      return NextResponse.json(
        { error: 'Missing required booking details (poiName, bookingDate)' },
        { status: 400 }
      );
    }

    // 1. Server-side price validation (Does not trust client-submitted amount)
    const verifiedAmount = calculateServerPrice(poiName, category, ticketCount);
    const amountInPaise = Math.round(verifiedAmount * 100);

    const secretKey = process.env.STRIPE_SECRET_KEY?.trim();
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || process.env.STRIPE_PUBLISHABLE_KEY || '';

    // Check if Stripe key is configured in test mode
    if (!secretKey || !secretKey.startsWith('sk_test_')) {
      // Return placeholder response if test key is missing
      return NextResponse.json({
        isPlaceholder: true,
        amount: verifiedAmount,
        currency: 'inr',
        message: 'Stripe secret key (sk_test_...) is not set or in test mode. You can complete a test payment simulation directly.',
        bookingDraft: {
          poiId,
          poiName,
          bookingDate,
          timeSlot,
          ticketCount,
          amount: verifiedAmount,
        },
      });
    }

    // 2. Initialize Stripe SDK in Test Mode
    const stripe = new Stripe(secretKey, {
      apiVersion: '2025-02-24.acacia' as Stripe.LatestApiVersion,
    });

    // 3. Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInPaise,
      currency: 'inr',
      payment_method_types: ['card'],
      receipt_email: session?.user?.email ?? undefined,
      description: `Entry Pass for ${poiName} (${ticketCount} tickets)`,
      metadata: {
        userId: userId ? String(userId) : '',
        poiId: poiId ? String(poiId) : '',
        poiName,
        bookingDate,
        timeSlot: timeSlot || 'General Entry',
        ticketCount: String(ticketCount),
        amount: String(verifiedAmount),
        isTestMode: 'true',
      },
    });

    // 4. Create 'pending' record in 'payments' table
    try {
      await prisma.payment.create({
        data: {
          userId: userId ?? undefined,
          stripePaymentIntentId: paymentIntent.id,
          amount: verifiedAmount,
          currency: 'inr',
          status: 'pending',
        },
      });
    } catch (dbErr) {
      console.warn('Could not record pending payment in database:', dbErr);
    }

    // 5. Return ONLY client secret to client (NEVER secret key)
    return NextResponse.json({
      isPlaceholder: false,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: verifiedAmount,
      currency: 'inr',
      publishableKey,
      poiName,
      bookingDate,
      timeSlot,
      ticketCount,
    });
  } catch (error: any) {
    console.error('PaymentIntent creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to initialize payment' },
      { status: 500 }
    );
  }
}
