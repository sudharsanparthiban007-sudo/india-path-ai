import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { classifyComplaint } from '@/lib/ai';
import { auth } from '@/lib/auth';
import type { Language } from '@/lib/i18n';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.user?.id ? Number(session.user.id) : null;

    const body = await req.json();
    const { description, photoData, lat, lng, locationNote, language = 'en' } = body;

    if (!description) {
      return NextResponse.json({ error: 'Description is required' }, { status: 400 });
    }

    const classification = await classifyComplaint(description, language as Language);

    let complaint: any = null;
    try {
      complaint = await prisma.complaint.create({
        data: {
          description,
          photoData: photoData ?? null,
          lat: lat ?? null,
          lng: lng ?? null,
          locationNote: locationNote ?? null,
          department: classification.department,
          urgency: classification.urgency,
          status: 'Submitted',
          isMock: classification.mock,
          userId: userId ?? undefined,
        },
      });
    } catch (dbErr) {
      console.warn('[Complaint] Database save warning:', dbErr);
      complaint = {
        id: Date.now(),
        description,
        department: classification.department,
        urgency: classification.urgency,
        status: 'Submitted',
        isMock: classification.mock,
        createdAt: new Date(),
      };
    }

    return NextResponse.json({ complaint, mock: classification.mock });
  } catch (error) {
    console.error('Complaint error:', error);
    return NextResponse.json({ error: 'Failed to submit complaint' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await auth();
    const userId = session?.user?.id ? Number(session.user.id) : null;

    let complaints: any[] = [];
    try {
      if (userId) {
        complaints = await prisma.complaint.findMany({
          where: { userId },
          orderBy: { createdAt: 'desc' },
        });
        if (complaints.length === 0) {
          complaints = await prisma.complaint.findMany({
            orderBy: { createdAt: 'desc' },
            take: 10,
          });
        }
      } else {
        complaints = await prisma.complaint.findMany({
          orderBy: { createdAt: 'desc' },
          take: 20,
        });
      }
    } catch (dbErr) {
      console.warn('[Complaint] Get complaints DB warning:', dbErr);
      complaints = [];
    }

    return NextResponse.json({ complaints: complaints || [], isAuthenticated: !!userId });
  } catch (error) {
    console.error('Get complaints error:', error);
    return NextResponse.json({ complaints: [], isAuthenticated: false });
  }
}
