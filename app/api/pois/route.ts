import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { SEEDED_POIS } from '@/lib/seedData';

export async function GET() {
  try {
    const pois = await prisma.pointOfInterest.findMany({
      orderBy: { city: 'asc' },
    });
    if (pois && pois.length > 0) {
      return NextResponse.json({ pois });
    }
    return NextResponse.json({ pois: SEEDED_POIS });
  } catch (error) {
    console.warn('Database not yet reached, returning seeded POIs:', error);
    return NextResponse.json({ pois: SEEDED_POIS });
  }
}
