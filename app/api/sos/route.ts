import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { lat, lng, note } = body;

    let incident: any = null;
    try {
      incident = await prisma.sosIncident.create({
        data: {
          lat: lat ?? null,
          lng: lng ?? null,
          note: note ?? null,
        },
      });
    } catch (dbErr) {
      console.warn('[SOS] Database write failed, using local response:', dbErr);
      incident = {
        id: Date.now(),
        lat: lat ?? null,
        lng: lng ?? null,
        note: note ?? null,
        createdAt: new Date().toISOString(),
      };
    }

    return NextResponse.json({ incident });
  } catch (error) {
    console.error('SOS error:', error);
    return NextResponse.json({ error: 'Failed to log incident' }, { status: 500 });
  }
}

export async function GET() {
  try {
    let incidents: any[] = [];
    try {
      incidents = await prisma.sosIncident.findMany({
        orderBy: { createdAt: 'desc' },
      });
    } catch {
      incidents = [];
    }
    return NextResponse.json({ incidents });
  } catch (error) {
    console.error('Get incidents error:', error);
    return NextResponse.json({ error: 'Failed to fetch incidents' }, { status: 500 });
  }
}
