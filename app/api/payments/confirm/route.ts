import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { inMemoryBookings } from '@/app/api/booking/route';
import { inMemoryPayments } from '@/app/api/payments/history/route';
import { auth } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const sessionUserId = session?.user?.id ? Number(session.user.id) : null;

    const body = await req.json();
    const { paymentIntentId, paymentMethod = 'pm_card_visa', metadata: clientMetadata } = body;

    if (!paymentIntentId) {
      return NextResponse.json({ error: 'paymentIntentId is required' }, { status: 400 });
    }

    const secretKey = process.env.STRIPE_SECRET_KEY?.trim();

    // If Stripe secret key is not set or placeholder, simulate successful confirmation
    if (!secretKey || !secretKey.startsWith('sk_test_')) {
      const meta = clientMetadata || {};
      const bookingUserId = meta.userId ? Number(meta.userId) : (sessionUserId || 1);
      const amountInInr = meta.amount ? Number(meta.amount) : 100;

      const simBooking = {
        id: Date.now(),
        userId: bookingUserId,
        poiId: meta.poiId ? Number(meta.poiId) : null,
        poiName: meta.poiName || 'Shore Temple',
        bookingDate: meta.bookingDate || new Date().toISOString().split('T')[0],
        timeSlot: meta.timeSlot || '09:00 AM - 12:00 PM',
        ticketCount: Number(meta.ticketCount) || 1,
        amount: amountInInr,
        currency: 'INR',
        status: 'confirmed',
        stripeSessionId: paymentIntentId,
        isTestMode: true,
        createdAt: new Date().toISOString(),
      };
      inMemoryBookings.unshift(simBooking);

      const simPayment = {
        id: Date.now(),
        userId: bookingUserId,
        stripePaymentIntentId: paymentIntentId,
        amount: amountInInr,
        currency: 'inr',
        status: 'paid',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      inMemoryPayments.unshift(simPayment);

      return NextResponse.json({
        success: true,
        isSimulated: true,
        paymentIntentId,
        status: 'succeeded',
        booking: simBooking,
        message: 'Payment verified and pass generated in Test Mode.',
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
    const metadata = paymentIntent.metadata || clientMetadata || {};
    const bookingUserId = metadata.userId ? Number(metadata.userId) : (sessionUserId || 1);

    let createdBooking: any = null;

    if (paymentIntent.status === 'succeeded') {
      try {
        await prisma.payment.upsert({
          where: { stripePaymentIntentId: paymentIntent.id },
          update: { status: 'paid', amount: amountInInr },
          create: {
            userId: bookingUserId,
            stripePaymentIntentId: paymentIntent.id,
            amount: amountInInr,
            currency: paymentIntent.currency || 'inr',
            status: 'paid',
          },
        });
      } catch (e) {
        console.warn('DB payment update warning:', e);
      }

      const paymentRecord = {
        id: Date.now(),
        userId: bookingUserId,
        stripePaymentIntentId: paymentIntent.id,
        amount: amountInInr,
        currency: paymentIntent.currency || 'inr',
        status: 'paid',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      inMemoryPayments.unshift(paymentRecord);

      if (metadata.poiName && metadata.bookingDate) {
        try {
          createdBooking = await prisma.booking.create({
            data: {
              userId: bookingUserId,
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

        if (!createdBooking) {
          createdBooking = {
            id: Date.now(),
            userId: bookingUserId,
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
            createdAt: new Date().toISOString(),
          };
        }
        inMemoryBookings.unshift(createdBooking);
      }
    }

    return NextResponse.json({
      success: true,
      status: paymentIntent.status,
      paymentIntentId: paymentIntent.id,
      amount: amountInInr,
      currency: paymentIntent.currency,
      booking: createdBooking,
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
