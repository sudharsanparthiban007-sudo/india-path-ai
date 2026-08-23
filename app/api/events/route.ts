import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { SEEDED_EVENTS } from '@/lib/seedData';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const month = searchParams.get('month');
    const city = searchParams.get('city');

    const whereClause: any = {};

    if (month && month !== 'All') {
      whereClause.month = {
        equals: month,
      };
    }

    if (city && city !== 'All') {
      whereClause.city = {
        contains: city,
      };
    }

    let events: any[] = [];
    try {
      if (prisma.culturalEvent) {
        events = await prisma.culturalEvent.findMany({
          where: whereClause,
          orderBy: { id: 'asc' },
        });
      }
    } catch {
      // Fall through to memory filtering
    }

    // Fallback if DB hasn't been reached or empty
    if (!events || events.length === 0) {
      events = SEEDED_EVENTS.filter((e) => {
        if (month && month !== 'All' && e.month.toLowerCase() !== month.toLowerCase()) {
          return false;
        }
        if (city && city !== 'All' && !e.city.toLowerCase().includes(city.toLowerCase())) {
          return false;
        }
        return true;
      });
    }

    return NextResponse.json({ events });
  } catch (error) {
    console.error('Fetch cultural events error:', error);
    return NextResponse.json({ events: SEEDED_EVENTS });
  }
}
