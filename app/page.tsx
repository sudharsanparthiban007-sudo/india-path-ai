'use client';

import Link from 'next/link';
import { useLang } from '@/lib/LangContext';

const FEATURES = [
  {
    key: 'planner',
    href: '/planner',
    icon: '🗺️',
    titleKey: 'home_feature_planner_title',
    descKey: 'home_feature_planner_desc',
    color: 'from-orange-500/20 to-amber-500/10 border-orange-500/30',
  },
  {
    key: 'events',
    href: '/events',
    icon: '📅',
    titleKey: 'home_feature_events_title',
    descKey: 'home_feature_events_desc',
    color: 'from-amber-500/20 to-yellow-500/10 border-amber-500/30',
  },
  {
    key: 'ask',
    href: '/ask',
    icon: '✨',
    titleKey: 'home_feature_ask_title',
    descKey: 'home_feature_ask_desc',
    color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30',
  },
  {
    key: 'map',
    href: '/explore',
    icon: '📍',
    titleKey: 'home_feature_map_title',
    descKey: 'home_feature_map_desc',
    color: 'from-teal-500/20 to-cyan-500/10 border-teal-500/30',
  },
  {
    key: 'lens',
    href: '/lens',
    icon: '🔍',
    titleKey: 'home_feature_lens_title',
    descKey: 'home_feature_lens_desc',
    color: 'from-violet-500/20 to-purple-500/10 border-violet-500/30',
  },
  {
    key: 'sos',
    href: '/sos',
    icon: '🆘',
    titleKey: 'home_feature_sos_title',
    descKey: 'home_feature_sos_desc',
    color: 'from-red-500/20 to-rose-500/10 border-red-500/30',
  },
  {
    key: 'complaint',
    href: '/complaint',
    icon: '📋',
    titleKey: 'home_feature_complaint_title',
    descKey: 'home_feature_complaint_desc',
    color: 'from-blue-500/20 to-indigo-500/10 border-blue-500/30',
  },
];

export default function HomePage() {
  const { t } = useLang();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-16 pb-24 text-center">
        {/* Background gradient blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute top-16 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            Tamil Nadu Heritage Travel
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4 leading-tight">
            {t('home_hero_title')}
          </h1>

          <p className="text-lg text-stone-400 mb-10 max-w-xl mx-auto">
            {t('home_hero_subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              id="cta-planner"
              href="/planner"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold text-lg hover:from-orange-400 hover:to-amber-400 transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5"
            >
              {t('home_cta_planner')}
            </Link>
            <Link
              id="cta-explore"
              href="/explore"
              className="px-8 py-4 rounded-xl glass text-white font-semibold text-lg hover:bg-white/10 transition-all border border-white/20 hover:-translate-y-0.5"
            >
              {t('home_cta_explore')}
            </Link>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <Link
              key={f.key}
              href={f.href}
              id={`feature-card-${f.key}`}
              className={`block p-6 rounded-2xl bg-gradient-to-br ${f.color} border glass hover:-translate-y-1 hover:shadow-lg transition-all group`}
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-300 transition-colors">
                {t(f.titleKey)}
              </h3>
              <p className="text-stone-400 text-sm leading-relaxed">{t(f.descKey)}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer note */}
      <footer className="text-center text-stone-600 text-xs pb-8 px-4">
        India Path AI v1 MVP · Tamil Nadu Heritage Travel Prototype · Built with Next.js + Gemini AI
      </footer>
    </div>
  );
}
