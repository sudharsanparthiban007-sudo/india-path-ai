import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    const session = await auth();
    const userId = session?.user?.id ? Number(session.user.id) : null;

    if (!userId) {
      // If not logged in, check for latest bookings or return guest message
      try {
        const bookings = await prisma.booking.findMany({
          orderBy: { createdAt: 'desc' },
          take: 5,
        });
        return NextResponse.json({ bookings: bookings || [], isAuthenticated: false });
      } catch {
        return NextResponse.json({ bookings: [], isAuthenticated: false });
      }
    }

    try {
      const bookings = await prisma.booking.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });
      return NextResponse.json({ bookings: bookings || [], isAuthenticated: true });
    } catch {
      return NextResponse.json({ bookings: [], isAuthenticated: true });
    }
  } catch (error) {
    console.error('Fetch bookings error:', error);
    return NextResponse.json({ bookings: [], isAuthenticated: false });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    let userId = session?.user?.id ? Number(session.user.id) : null;

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

    // If user is not authenticated, check or create demo guest account
    if (!userId) {
      let guest = await prisma.user.findUnique({
        where: { email: 'traveler@indiapath.ai' },
      });

      if (!guest) {
        guest = await prisma.user.create({
          data: {
            name: 'Demo Traveler',
            email: 'traveler@indiapath.ai',
            password: '$2a$10$demohashplaceholderforprototypetestmodeonly',
          },
        });
      }
      userId = guest.id;
    }

    const booking = await prisma.booking.create({
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

    return NextResponse.json({ booking, message: 'Booking confirmed successfully (Test Mode)' });
  } catch (error) {
    console.error('Create booking error:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}
