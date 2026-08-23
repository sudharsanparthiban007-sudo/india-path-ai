import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required', code: 'missing_credentials' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters', code: 'weak_password' },
        { status: 400 }
      );
    }

    const normalizedEmail = String(email).toLowerCase().trim();

    // ─── 1. Supabase Auth Integration ──────────────────────────────────────────
    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.SUPABASE_URL ||
      'https://jkxytidzcxnoekuxfywf.supabase.co';
    const supabaseAnonKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.SUPABASE_ANON_KEY ||
      '';

    let supabaseAuthUser: any = null;

    if (supabaseUrl && supabaseAnonKey) {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      const { data: sbData, error: sbError } = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
        options: {
          data: {
            name: name ? String(name).trim() : normalizedEmail.split('@')[0],
          },
        },
      });

      if (sbError) {
        // Log the complete Supabase error without obscuring details
        console.error('[Supabase Auth SignUp Error]:', {
          message: sbError.message,
          status: sbError.status,
          code: sbError.code,
          name: sbError.name,
        });

        // If rate limit on email sending, fallback gracefully to database signup
        if (sbError.code !== 'over_email_send_rate_limit') {
          return NextResponse.json(
            {
              error: sbError.message,
              status: sbError.status || 400,
              code: sbError.code || 'supabase_auth_error',
              details: {
                name: sbError.name,
                message: sbError.message,
                status: sbError.status,
                code: sbError.code,
              },
            },
            { status: sbError.status || 400 }
          );
        } else {
          console.warn('[Supabase Notice] Email rate limit reached on free tier. Continuing local registration.');
        }
      } else {
        supabaseAuthUser = sbData?.user;
        console.log('[Supabase Auth] Registered user successfully:', supabaseAuthUser?.id);
      }
    }

    // ─── 2. Database Record Sync ───────────────────────────────────────────────
    let localUser: any = null;
    try {
      const existing = await prisma.user.findUnique({
        where: { email: normalizedEmail },
      });

      if (existing) {
        localUser = existing;
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        localUser = await prisma.user.create({
          data: {
            name: name ? String(name).trim() : normalizedEmail.split('@')[0],
            email: normalizedEmail,
            password: hashedPassword,
          },
        });
      }
    } catch (dbErr: any) {
      console.warn('[Database Sync Notice during registration]:', dbErr.message || dbErr);
    }

    return NextResponse.json({
      user: {
        id: localUser?.id || supabaseAuthUser?.id || 1,
        supabaseId: supabaseAuthUser?.id || null,
        name: name || normalizedEmail.split('@')[0],
        email: normalizedEmail,
      },
      message: 'Account created successfully',
      supabaseAuth: !!supabaseAuthUser,
    });
  } catch (error: any) {
    console.error('Registration processing error:', error);
    return NextResponse.json(
      {
        error: error.message || 'Failed to create user account',
        code: error.code || 'internal_error',
        details: error,
      },
      { status: 500 }
    );
  }
}
