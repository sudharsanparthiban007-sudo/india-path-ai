import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

// In-memory fallback payment store
export const inMemoryPayments: any[] = [];

export async function GET() {
  try {
    const session = await auth();
    const userId = session?.user?.id ? Number(session.user.id) : null;

    if (!userId) {
      return NextResponse.json({
        payments: [],
        isAuthenticated: false,
      });
    }

    // Security: Only return payments belonging to the authenticated user
    try {
      const payments = await prisma.payment.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });

      return NextResponse.json({
        payments: payments || [],
        isAuthenticated: true,
      });
    } catch {
      const userPayments = inMemoryPayments.filter((p) => p.userId === userId);
      return NextResponse.json({
        payments: userPayments,
        isAuthenticated: true,
      });
    }
  } catch (error: any) {
    console.error('Fetch payments history error:', error);
    return NextResponse.json({
      payments: [],
      isAuthenticated: false,
    });
  }
}
