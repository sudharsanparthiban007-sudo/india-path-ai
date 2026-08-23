import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

function calculateServerPrice(poiName: string, ticketCount: number): number {
  const count = Math.max(1, Math.min(20, Number(ticketCount) || 1));
  const name = (poiName || '').toLowerCase();
  let pricePerTicket = 150;
  if (name.includes('temple') || name.includes('kovil')) {
    pricePerTicket = 50;
  }
  return pricePerTicket * count;
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.user?.id ? Number(session.user.id) : null;

    const body = await req.json();
    const { poiId, poiName, bookingDate, timeSlot, ticketCount = 1 } = body;

    if (!poiName || !bookingDate) {
      return NextResponse.json(
        { error: 'Missing required booking details (poiName, bookingDate)' },
        { status: 400 }
      );
    }

    // Server-side price validation
    const verifiedAmount = calculateServerPrice(poiName, ticketCount);

    const secretKey = process.env.STRIPE_SECRET_KEY?.trim();

    // Strict safety check: Never allow live keys
    if (secretKey && !secretKey.startsWith('sk_test_')) {
      return NextResponse.json(
        { error: 'Security policy: Only Stripe test-mode keys (sk_test_...) are permitted.' },
        { status: 400 }
      );
    }

    const origin = req.headers.get('origin') || 'http://localhost:3000';

    if (!secretKey) {
      // Return placeholder state when test key is not yet connected
      return NextResponse.json({
        isPlaceholder: true,
        message: 'Connect a Stripe test key (STRIPE_SECRET_KEY=sk_test_...) in .env.local to enable real Stripe Checkout.',
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

    // Initialize Stripe in test mode
    const stripe = new Stripe(secretKey, {
      apiVersion: '2025-02-24.acacia' as Stripe.LatestApiVersion,
    });

    // Create Stripe Checkout Session in Test Mode
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: session?.user?.email ?? undefined,
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: `Monument Entry & Tour Pass — ${poiName}`,
              description: `Date: ${bookingDate} | Slot: ${timeSlot || 'General Entry'} | ${ticketCount} Ticket(s)`,
            },
            unit_amount: Math.round(verifiedAmount * 100), // convert to paise
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: userId ? String(userId) : 'guest',
        poiId: poiId ? String(poiId) : '',
        poiName,
        bookingDate,
        timeSlot: timeSlot || 'General Entry',
        ticketCount: String(ticketCount),
        amount: String(verifiedAmount),
        isTestMode: 'true',
      },
      success_url: `${origin}/bookings?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/explore?cancelled=true`,
    });

    // Record pending payment in payments table
    try {
      await prisma.payment.create({
        data: {
          userId: userId ?? undefined,
          stripePaymentIntentId: checkoutSession.id,
          amount: verifiedAmount,
          currency: 'inr',
          status: 'pending',
        },
      });
    } catch (dbErr) {
      console.warn('Could not record pending checkout session:', dbErr);
    }

    return NextResponse.json({
      checkoutUrl: checkoutSession.url,
      sessionId: checkoutSession.id,
      isPlaceholder: false,
    });
  } catch (error: unknown) {
    console.error('Stripe checkout session error:', error);
    const message = error instanceof Error ? error.message : 'Failed to create checkout session';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
