import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const currentUserId = session?.user?.id ? Number(session.user.id) : null;

    const body = await req.json();
    const { sessionId } = body;

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }

    const secretKey = process.env.STRIPE_SECRET_KEY?.trim();

    // If Stripe key exists and starts with sk_test_
    if (secretKey && secretKey.startsWith('sk_test_')) {
      const stripe = new Stripe(secretKey, {
        apiVersion: '2025-02-24.acacia' as Stripe.LatestApiVersion,
      });

      const stripeSession = await stripe.checkout.sessions.retrieve(sessionId);

      if (stripeSession.payment_status === 'paid' || stripeSession.status === 'complete') {
        const metadata = stripeSession.metadata || {};
        const metaUserId = metadata.userId && metadata.userId !== 'guest' ? Number(metadata.userId) : currentUserId;

        // Check if booking already recorded
        const existing = await prisma.booking.findFirst({
          where: { stripeSessionId: sessionId },
        });

        if (existing) {
          return NextResponse.json({ booking: existing, alreadyConfirmed: true });
        }

        // Determine user ID
        let targetUserId = metaUserId || currentUserId;
        if (!targetUserId) {
          const guest = await prisma.user.upsert({
            where: { email: stripeSession.customer_email || 'guest@indiapath.ai' },
            update: {},
            create: {
              email: stripeSession.customer_email || 'guest@indiapath.ai',
              name: 'Guest Traveler',
              password: '$2a$10$demohashplaceholderforprototypetestmodeonly',
            },
          });
          targetUserId = guest.id;
        }

        const booking = await prisma.booking.create({
          data: {
            userId: targetUserId,
            poiId: metadata.poiId ? Number(metadata.poiId) : null,
            poiName: metadata.poiName || 'Tamil Nadu Heritage Monument',
            bookingDate: metadata.bookingDate || new Date().toISOString().split('T')[0],
            timeSlot: metadata.timeSlot || 'General Entry',
            ticketCount: Number(metadata.ticketCount || 1),
            amount: Number(metadata.amount || (stripeSession.amount_total ? stripeSession.amount_total / 100 : 100)),
            currency: 'INR',
            status: 'confirmed',
            stripeSessionId: sessionId,
            isTestMode: true,
          },
        });

        // Update payment status in payments table
        try {
          await prisma.payment.upsert({
            where: { stripePaymentIntentId: sessionId },
            update: { status: 'paid' },
            create: {
              userId: targetUserId,
              stripePaymentIntentId: sessionId,
              amount: booking.amount,
              currency: 'inr',
              status: 'paid',
            },
          });
        } catch (dbErr) {
          console.warn('Could not update payment status:', dbErr);
        }

        return NextResponse.json({ booking, success: true });
      }
    }

    return NextResponse.json({ error: 'Session verification incomplete' }, { status: 400 });
  } catch (error) {
    console.error('Confirm booking error:', error);
    return NextResponse.json({ error: 'Failed to verify session' }, { status: 500 });
  }
}
