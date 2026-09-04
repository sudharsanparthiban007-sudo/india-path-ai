import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateItinerary } from '@/lib/ai';
import { auth } from '@/lib/auth';
import type { Language } from '@/lib/i18n';

// In-memory fallback trip store by userId/guest
const inMemoryTrips: any[] = [];

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.user?.id ? Number(session.user.id) : null;

    const body = await req.json();
    const { destination, days, interests, language = 'en', travelMonth } = body;

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
      language as Language,
      travelMonth
    );

    let savedTrip: any = null;
    try {
      savedTrip = await prisma.trip.create({
        data: {
          destination,
          days: Number(days),
          interests: Array.isArray(interests) ? interests.join(', ') : String(interests),
          itinerary: typeof itinerary.content === 'string' ? itinerary.content : JSON.stringify(itinerary.content),
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
        itinerary: typeof itinerary.content === 'string' ? itinerary.content : JSON.stringify(itinerary.content),
        userId: userId ?? 1,
        createdAt: new Date().toISOString(),
      };
      inMemoryTrips.unshift(savedTrip);
    }

    let parsedContent = itinerary.content;
    if (typeof parsedContent === 'string') {
      try {
        parsedContent = JSON.parse(parsedContent);
      } catch {
        // keep as is
      }
    }

    return NextResponse.json({
      trip: savedTrip,
      itinerary: parsedContent,
      mock: itinerary.mock,
    });
  } catch (error: any) {
    console.error('Planner error:', error);

    // Surface AI key / quota errors clearly
    const msg = error?.message || String(error);
    if (msg.includes('API_KEY') || msg.includes('PERMISSION_DENIED') || msg.includes('401') || msg.includes('403')) {
      return NextResponse.json(
        { error: 'Gemini API key is invalid or missing quota. Check GEMINI_API_KEY in .env.local.' },
        { status: 401 }
      );
    }
    if (msg.includes('quota') || msg.includes('RESOURCE_EXHAUSTED') || msg.includes('429')) {
      return NextResponse.json(
        { error: 'Gemini API quota exceeded. Please try again later or check your billing.' },
        { status: 429 }
      );
    }
    return NextResponse.json({ error: `Failed to generate itinerary: ${msg}` }, { status: 500 });
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
      if (userId) {
        trips = inMemoryTrips.filter((t) => t.userId === userId);
      } else {
        trips = inMemoryTrips.slice(0, 10);
      }
    }

    return NextResponse.json({ trips: trips || [], isAuthenticated: !!userId });
  } catch (error) {
    console.error('Get trips error:', error);
    return NextResponse.json({ trips: [], isAuthenticated: false });
  }
}
