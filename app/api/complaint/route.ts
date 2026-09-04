import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { classifyComplaint } from '@/lib/ai';
import { auth } from '@/lib/auth';
import type { Language } from '@/lib/i18n';

const inMemoryComplaints: any[] = [];

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.user?.id ? Number(session.user.id) : null;

    const body = await req.json();
    const { description, photoData, lat, lng, locationNote, language = 'en' } = body;

    if (!description || !description.trim()) {
      return NextResponse.json({ error: 'Description is required' }, { status: 400 });
    }

    const classification = await classifyComplaint(description.trim(), language as Language);

    let complaint: any = null;
    try {
      complaint = await prisma.complaint.create({
        data: {
          description: description.trim(),
          photoData: photoData ?? null,
          lat: lat !== null && lat !== undefined ? Number(lat) : null,
          lng: lng !== null && lng !== undefined ? Number(lng) : null,
          locationNote: locationNote ?? null,
          department: classification.department,
          urgency: classification.urgency,
          status: 'Submitted',
          isMock: classification.mock,
          userId: userId ?? undefined,
        },
      });
    } catch (dbErr) {
      console.warn('[Complaint] Database save warning, using fallback store:', dbErr);
      complaint = {
        id: Date.now(),
        description: description.trim(),
        department: classification.department,
        urgency: classification.urgency,
        status: 'Submitted',
        isMock: classification.mock,
        lat: lat ? Number(lat) : null,
        lng: lng ? Number(lng) : null,
        locationNote: locationNote ?? null,
        photoData: photoData ?? null,
        userId: userId ?? 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      inMemoryComplaints.unshift(complaint);
    }

    return NextResponse.json({ complaint, mock: classification.mock });
  } catch (error: any) {
    console.error('Complaint error:', error);
    return NextResponse.json({ error: error?.message || 'Failed to submit complaint' }, { status: 500 });
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
      console.warn('[Complaint] Get complaints DB warning, using memory fallback:', dbErr);
      complaints = inMemoryComplaints.slice(0, 20);
    }

    return NextResponse.json({ complaints: complaints || [], isAuthenticated: !!userId });
  } catch (error) {
    console.error('Get complaints error:', error);
    return NextResponse.json({ complaints: inMemoryComplaints.slice(0, 20), isAuthenticated: false });
  }
}
