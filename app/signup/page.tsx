'use client';

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { supabase, supabaseUrl } from '@/lib/supabaseClient';

interface SupabaseErrorDisplay {
  message: string;
  status?: number;
  code?: string;
}

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [supabaseError, setSupabaseError] = useState<SupabaseErrorDisplay | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSupabaseError(null);

    const normalizedEmail = email.toLowerCase().trim();

    if (!normalizedEmail || !password) {
      setSupabaseError({ message: 'Email and password are required', code: 'missing_fields' });
      return;
    }

    if (password.length < 6) {
      setSupabaseError({ message: 'Password must be at least 6 characters', code: 'weak_password' });
      return;
    }

    setLoading(true);

    try {
      // ─── Direct Supabase Auth Signup ───────────────────────────────────────
      console.log(`[Supabase Auth] Calling supabase.auth.signUp() for: ${normalizedEmail}`);
      
      const { data: sbData, error: sbError } = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
        options: {
          data: {
            name: name.trim() || normalizedEmail.split('@')[0],
          },
        },
      });

      if (sbError) {
        // Log unmasked error details to console
        console.error('[Supabase Auth SignUp Error]:', {
          message: sbError.message,
          status: sbError.status,
          code: sbError.code,
          name: sbError.name,
        });

        // If rate limit on email delivery, allow graceful local fallback
        if (sbError.code === 'over_email_send_rate_limit') {
          console.warn('[Supabase Auth] Email send rate limit reached on project. Completing database sync.');
        } else {
          // Display exact Supabase error details on screen
          setSupabaseError({
            message: sbError.message,
            status: sbError.status,
            code: sbError.code || 'auth_error',
          });
          setLoading(false);
          return;
        }
      } else {
        console.log('[Supabase Auth SignUp Success]:', sbData.user?.id);
      }

      // ─── Synchronize User with App Session ─────────────────────────────────
      try {
        await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name.trim(),
            email: normalizedEmail,
            password,
          }),
        });
      } catch (syncErr) {
        console.warn('[Database Sync Notice]:', syncErr);
      }

      // Sign into app session
      const signInRes = await signIn('credentials', {
        email: normalizedEmail,
        password,
        redirect: false,
      });

      if (signInRes?.error) {
        router.push('/login?registered=true');
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err: any) {
      console.error('[Signup Exception]:', err);
      setSupabaseError({
        message: err.message || 'An unexpected error occurred during signup',
        code: err.code || 'unexpected_exception',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md glass rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white font-bold text-xl mx-auto mb-3 shadow-lg shadow-orange-500/30">
              IP
            </div>
            <h1 className="text-2xl font-bold text-white">Create Account</h1>
            <p className="text-stone-400 text-xs mt-1">
              Supabase Auth & PostgreSQL Integration
            </p>
          </div>

          {/* Supabase Connection Status Badge */}
          <div className="mb-6 p-2.5 rounded-xl bg-stone-900/80 border border-emerald-500/20 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5 text-stone-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono truncate max-w-[180px]">
                {supabaseUrl.replace('https://', '')}
              </span>
            </div>
            <span className="text-emerald-400 font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px]">
              Publishable Key
            </span>
          </div>

          {/* Unmasked Supabase Error Banner */}
          {supabaseError && (
            <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs space-y-1.5 animate-fadeIn">
              <div className="flex items-center gap-2 font-bold text-sm text-red-300">
                <span>⚠️</span>
                <span>{supabaseError.message}</span>
              </div>
              <div className="text-[11px] font-mono text-stone-300 pt-1 border-t border-red-500/20 flex items-center justify-between">
                {supabaseError.code && (
                  <span>
                    code: <strong className="text-red-300">{supabaseError.code}</strong>
                  </span>
                )}
                {supabaseError.status && (
                  <span>
                    status: <strong className="text-red-300">{supabaseError.status}</strong>
                  </span>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
                Your Name
              </label>
              <input
                id="signup-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ravi Kumar"
                className="w-full bg-stone-900/90 border border-stone-700 rounded-xl px-4 py-3 text-white placeholder-stone-500 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
                Email Address *
              </label>
              <input
                id="signup-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="traveler@gmail.com"
                className="w-full bg-stone-900/90 border border-stone-700 rounded-xl px-4 py-3 text-white placeholder-stone-500 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
                Password * (min 6 characters)
              </label>
              <input
                id="signup-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-stone-900/90 border border-stone-700 rounded-xl px-4 py-3 text-white placeholder-stone-500 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
              />
            </div>

            <button
              id="signup-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold text-sm hover:from-orange-400 hover:to-amber-400 transition-all disabled:opacity-50 shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Connecting to Supabase…</span>
                </>
              ) : (
                <span>Create Account</span>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-stone-400">
            Already have an account?{' '}
            <Link
              href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
              className="text-orange-400 font-medium hover:underline hover:text-orange-300 transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-[calc(100vh-4rem)] flex items-center justify-center text-stone-500">Loading…</div>}>
      <SignupContent />
    </Suspense>
  );
}
