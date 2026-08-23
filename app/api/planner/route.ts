import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateItinerary } from '@/lib/ai';
import { auth } from '@/lib/auth';
import type { Language } from '@/lib/i18n';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.user?.id ? Number(session.user.id) : null;

    const body = await req.json();
    const { destination, days, interests, language = 'en' } = body;

    if (!destination || !days || !interests) {
      return NextResponse.json(
        { error: 'Missing required fields (destination, days, interests)' },
        { status: 400 }
      );
    }

    const itinerary = await generateItinerary(
      destination,
      Number(days),
      interests,
      language as Language
    );

    let savedTrip: any = null;
    try {
      savedTrip = await prisma.trip.create({
        data: {
          destination,
          days: Number(days),
          interests: Array.isArray(interests) ? interests.join(', ') : String(interests),
          itinerary: itinerary.content,
          userId: userId ?? undefined,
        },
      });
    } catch (dbErr) {
      console.warn('[Planner] Database save trip warning:', dbErr);
      savedTrip = {
        id: Date.now(),
        destination,
        days: Number(days),
        interests: Array.isArray(interests) ? interests.join(', ') : String(interests),
        itinerary: itinerary.content,
        createdAt: new Date(),
      };
    }

    return NextResponse.json({
      trip: savedTrip,
      itinerary: itinerary.content,
      mock: itinerary.mock,
    });
  } catch (error) {
    console.error('Planner error:', error);
    return NextResponse.json({ error: 'Failed to generate itinerary' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await auth();
    const userId = session?.user?.id ? Number(session.user.id) : null;

    let trips: any[] = [];
    try {
      if (userId) {
        trips = await prisma.trip.findMany({
          where: { userId },
          orderBy: { createdAt: 'desc' },
        });
      } else {
        trips = await prisma.trip.findMany({
          orderBy: { createdAt: 'desc' },
          take: 10,
        });
      }
    } catch (dbErr) {
      console.warn('[Planner] Get trips database warning:', dbErr);
      trips = [];
    }

    return NextResponse.json({ trips: trips || [], isAuthenticated: !!userId });
  } catch (error) {
    console.error('Get trips error:', error);
    return NextResponse.json({ trips: [], isAuthenticated: false });
  }
}
