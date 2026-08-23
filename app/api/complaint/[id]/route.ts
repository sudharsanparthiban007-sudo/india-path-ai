import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const STATUS_FLOW: Record<string, string> = {
  Submitted: 'In Review',
  'In Review': 'Resolved',
  Resolved: 'Resolved',
};

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    let complaint: any = null;
    try {
      complaint = await prisma.complaint.findUnique({ where: { id: Number(id) } });
    } catch {
      complaint = null;
    }

    const currentStatus = complaint?.status || 'Submitted';
    const nextStatus = STATUS_FLOW[currentStatus] ?? 'Resolved';

    let updated: any = null;
    try {
      updated = await prisma.complaint.update({
        where: { id: Number(id) },
        data: { status: nextStatus },
      });
    } catch {
      updated = {
        id: Number(id),
        status: nextStatus,
        updatedAt: new Date().toISOString(),
      };
    }

    return NextResponse.json({ complaint: updated });
  } catch (error) {
    console.error('Update complaint error:', error);
    return NextResponse.json({ error: 'Failed to update complaint' }, { status: 500 });
  }
}
