import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

// In-memory fallback booking store by userId/email
export const inMemoryBookings: any[] = [];

export async function GET() {
  try {
    const session = await auth();
    const sessionUserId = session?.user?.id ? Number(session.user.id) : null;
    const sessionUserEmail = session?.user?.email ? String(session.user.email).toLowerCase() : null;

    if (!sessionUserId && !sessionUserEmail) {
      return NextResponse.json({ bookings: [], isAuthenticated: false });
    }

    let bookings: any[] = [];
    try {
      bookings = await prisma.booking.findMany({
        where: sessionUserId ? { userId: sessionUserId } : undefined,
        orderBy: { createdAt: 'desc' },
      });
    } catch {
      bookings = [];
    }

    if (bookings && bookings.length > 0) {
      return NextResponse.json({ bookings, isAuthenticated: true });
    }

    const userBookings = inMemoryBookings.filter(
      (b) =>
        (sessionUserId && b.userId === sessionUserId) ||
        (sessionUserEmail && b.userEmail === sessionUserEmail)
    );

    return NextResponse.json({ bookings: userBookings, isAuthenticated: true });
  } catch (error) {
    console.error('Fetch bookings error:', error);
    return NextResponse.json({ bookings: [], isAuthenticated: false });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const sessionUserId = session?.user?.id ? Number(session.user.id) : null;
    const sessionUserEmail = session?.user?.email ? String(session.user.email).toLowerCase() : null;
    const userId = sessionUserId || 1;

    const body = await req.json();
    const {
      poiId,
      poiName,
      bookingDate,
      timeSlot,
      ticketCount = 1,
      amount = 100,
      stripeSessionId,
    } = body;

    if (!poiName || !bookingDate) {
      return NextResponse.json(
        { error: 'Missing required booking information' },
        { status: 400 }
      );
    }

    let booking: any = null;
    try {
      booking = await prisma.booking.create({
        data: {
          userId,
          poiId: poiId ? Number(poiId) : null,
          poiName,
          bookingDate,
          timeSlot: timeSlot || 'General Entry',
          ticketCount: Number(ticketCount),
          amount: Number(amount),
          currency: 'INR',
          status: 'confirmed',
          stripeSessionId: stripeSessionId || null,
          isTestMode: true,
        },
      });
    } catch (dbErr) {
      console.warn('[Bookings] DB write error, saving to memory:', dbErr);
      booking = {
        id: Date.now(),
        userId,
        userEmail: sessionUserEmail,
        poiId: poiId ? Number(poiId) : null,
        poiName,
        bookingDate,
        timeSlot: timeSlot || 'General Entry',
        ticketCount: Number(ticketCount),
        amount: Number(amount),
        currency: 'INR',
        status: 'confirmed',
        stripeSessionId: stripeSessionId || null,
        isTestMode: true,
        createdAt: new Date().toISOString(),
      };
      inMemoryBookings.unshift(booking);
    }

    return NextResponse.json({ booking, message: 'Booking confirmed successfully (Test Mode)' });
  } catch (error) {
    console.error('Create booking error:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}
