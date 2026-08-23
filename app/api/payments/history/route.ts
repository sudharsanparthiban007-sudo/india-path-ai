import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    const session = await auth();
    const userId = session?.user?.id ? Number(session.user.id) : null;

    if (!userId) {
      // If not logged in, return latest sample test records or empty
      try {
        const demoPayments = await prisma.payment.findMany({
          orderBy: { createdAt: 'desc' },
          take: 5,
        });
        return NextResponse.json({
          payments: demoPayments || [],
          isAuthenticated: false,
        });
      } catch {
        return NextResponse.json({
          payments: [],
          isAuthenticated: false,
        });
      }
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
      return NextResponse.json({
        payments: [],
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
