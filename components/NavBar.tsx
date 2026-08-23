'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useLang } from '@/lib/LangContext';
import type { Language } from '@/lib/i18n';

const LANGS: { code: Language; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'hi', label: 'हिंदी' },
];

export default function NavBar() {
  const { t, lang, setLang } = useLang();
  const { data: session } = useSession();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: '/', key: 'nav_home' },
    { href: '/planner', key: 'nav_planner' },
    { href: '/events', key: 'nav_events' },
    { href: '/ask', key: 'nav_ask' },
    { href: '/explore', key: 'nav_explore' },
    { href: '/bookings', key: 'Bookings' },
    { href: '/lens', key: 'nav_lens' },
    { href: '/sos', key: 'nav_sos' },
    { href: '/complaint', key: 'nav_complaint' },
    { href: '/dashboard', key: 'nav_dashboard' },
  ];

  return (
    <nav className="fixed top-0 inset-x-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-orange-500/20">
            IP
          </div>
          <span className="font-bold text-white hidden sm:block">{t('nav_brand')}</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map(({ href, key }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                pathname === href
                  ? 'bg-orange-500/20 text-orange-400'
                  : 'text-stone-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {key === 'Bookings' ? '🎟️ Bookings' : t(key)}
            </Link>
          ))}
        </div>

        {/* User profile / Auth + Language toggle + mobile menu */}
        <div className="flex items-center gap-3">
          {/* Language toggle */}
          <div className="flex items-center bg-white/5 rounded-lg p-1 gap-1">
            {LANGS.map(({ code, label }) => (
              <button
                key={code}
                id={`lang-${code}`}
                onClick={() => setLang(code)}
                className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                  lang === code
                    ? 'bg-orange-500 text-white'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* User Account Controls */}
          {session?.user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                id="nav-user-profile"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass border border-orange-500/30 text-xs text-orange-300 hover:bg-orange-500/10 transition-all"
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 text-white font-bold text-[10px] flex items-center justify-center">
                  {(session.user.name || session.user.email || 'U')[0].toUpperCase()}
                </div>
                <span className="max-w-[100px] truncate hidden sm:inline">
                  {session.user.name || session.user.email?.split('@')[0]}
                </span>
              </Link>
              <button
                id="nav-logout-btn"
                onClick={() => signOut({ callbackUrl: '/' })}
                className="px-2.5 py-1.5 rounded-lg text-xs text-stone-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all"
                title="Sign out"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <Link
                id="nav-login-btn"
                href="/login"
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-stone-300 hover:text-white hover:bg-white/5 transition-all"
              >
                Sign in
              </Link>
              <Link
                id="nav-signup-btn"
                href="/signup"
                className="px-3 py-1.5 rounded-lg bg-orange-500 text-white text-xs font-medium hover:bg-orange-400 transition-all shadow-sm"
              >
                Sign up
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-toggle"
            className="lg:hidden p-2 rounded-lg text-stone-400 hover:text-white hover:bg-white/5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="lg:hidden glass border-t border-white/10 px-4 pb-4 space-y-1">
          {links.map(({ href, key }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                pathname === href
                  ? 'bg-orange-500/20 text-orange-400'
                  : 'text-stone-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {key === 'Bookings' ? '🎟️ Bookings' : t(key)}
            </Link>
          ))}
          {!session?.user && (
            <div className="pt-2 border-t border-white/10 flex gap-2">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="flex-1 py-2 text-center text-sm font-medium glass rounded-xl text-stone-300"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                onClick={() => setMenuOpen(false)}
                className="flex-1 py-2 text-center text-sm font-medium bg-orange-500 rounded-xl text-white"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
