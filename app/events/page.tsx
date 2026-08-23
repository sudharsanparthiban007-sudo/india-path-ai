'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useLang } from '@/lib/LangContext';

interface CulturalEvent {
  id: number;
  name: string;
  category: string;
  city: string;
  month: string;
  season: string;
  description: string;
  highlight: string | null;
}

const MONTHS = [
  'All',
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const CITIES = [
  'All',
  'Chennai',
  'Madurai',
  'Thanjavur',
  'Mahabalipuram',
  'Chidambaram',
  'Tiruvannamalai',
  'Palani',
  'Velankanni',
];

const CATEGORY_ICONS: Record<string, string> = {
  festival: '🎉',
  dance: '💃',
  music: '🎵',
  temple: '🛕',
};

const CATEGORY_COLORS: Record<string, string> = {
  festival: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  dance: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  music: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  temple: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
};

export default function EventsPage() {
  const { t } = useLang();
  const [events, setEvents] = useState<CulturalEvent[]>([]);
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (selectedMonth !== 'All') params.set('month', selectedMonth);
        if (selectedCity !== 'All') params.set('city', selectedCity);

        const res = await fetch(`/api/events?${params.toString()}`);
        const data = await res.json();
        setEvents(data.events || []);
      } catch (err) {
        console.error('Failed to load events:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, [selectedMonth, selectedCity]);

  return (
    <div className="min-h-screen">
      {/* Seasonal Guidance Banner — Required */}
      <div
        id="events-seasonal-disclaimer"
        className="sticky top-16 z-30 bg-amber-600/90 text-white text-center py-2.5 px-4 text-xs sm:text-sm font-medium backdrop-blur border-b border-amber-500/30 flex items-center justify-center gap-2"
      >
        <span>⚠️</span>
        <span>
          <strong>Seasonal guidance only:</strong> Festival dates are based on traditional lunar/solar cycles and shift annually. Confirm this year&apos;s exact dates before booking travel.
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-orange-400 tracking-wider uppercase">
              Tamil Nadu Heritage & Living Traditions
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold gradient-text mt-1">
              Culture & Events Calendar
            </h1>
            <p className="text-stone-400 text-sm mt-1 max-w-xl">
              Discover recurring classical dance festivals, temple chariot processions, harvest sports, and Carnatic music seasons across Tamil Nadu.
            </p>
          </div>

          <Link
            href="/planner"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-orange-500/30 flex items-center gap-1.5 self-start md:self-auto"
          >
            <span>🗺️</span> Plan Trip Around an Event
          </Link>
        </div>

        {/* Filters */}
        <div className="glass rounded-2xl p-5 mb-8 border border-white/10 space-y-4">
          {/* Month Filter */}
          <div>
            <div className="text-xs font-bold text-stone-300 mb-2 flex items-center justify-between">
              <span>Filter by Typical Month</span>
              {selectedMonth !== 'All' && (
                <button
                  onClick={() => setSelectedMonth('All')}
                  className="text-[11px] text-orange-400 hover:underline"
                >
                  Clear Month
                </button>
              )}
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {MONTHS.map((m) => (
                <button
                  key={m}
                  id={`filter-month-${m.toLowerCase()}`}
                  onClick={() => setSelectedMonth(m)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                    selectedMonth === m
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                      : 'bg-white/5 text-stone-400 hover:text-white hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* City Filter */}
          <div>
            <div className="text-xs font-bold text-stone-300 mb-2 flex items-center justify-between">
              <span>Filter by City / Region</span>
              {selectedCity !== 'All' && (
                <button
                  onClick={() => setSelectedCity('All')}
                  className="text-[11px] text-orange-400 hover:underline"
                >
                  Clear City
                </button>
              )}
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {CITIES.map((c) => (
                <button
                  key={c}
                  id={`filter-city-${c.toLowerCase()}`}
                  onClick={() => setSelectedCity(c)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                    selectedCity === c
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                      : 'bg-white/5 text-stone-400 hover:text-white hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Event Cards Grid */}
        {loading ? (
          <div className="text-center py-20 text-stone-500">Loading cultural calendar…</div>
        ) : events.length === 0 ? (
          <div className="glass rounded-3xl p-12 text-center">
            <div className="text-4xl mb-3">📅</div>
            <h3 className="text-lg font-bold text-white mb-1">No Cultural Events Found</h3>
            <p className="text-stone-400 text-sm max-w-md mx-auto mb-4">
              No recurring festivals matched your filter ({selectedMonth} in {selectedCity}). Try selecting &quot;All&quot; to see all Tamil Nadu heritage events.
            </p>
            <button
              onClick={() => {
                setSelectedMonth('All');
                setSelectedCity('All');
              }}
              className="px-4 py-2 rounded-xl bg-white/10 text-stone-200 text-xs hover:bg-white/20 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((evt) => {
              const icon = CATEGORY_ICONS[evt.category] || '🎉';
              const badgeStyle = CATEGORY_COLORS[evt.category] || 'bg-orange-500/20 text-orange-400 border-orange-500/30';

              return (
                <div
                  key={evt.id}
                  id={`event-card-${evt.id}`}
                  className="glass rounded-3xl p-6 border border-white/10 hover:border-orange-500/40 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Top row */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2.5 py-0.5 rounded-full border text-xs font-semibold uppercase tracking-wider ${badgeStyle}`}>
                          {icon} {evt.category}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-stone-300 text-xs font-medium">
                          📍 {evt.city}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-orange-400 uppercase tracking-wider block">
                          📅 {evt.month}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white group-hover:text-orange-300 transition-colors mb-2">
                      {evt.name}
                    </h3>

                    {/* Season tag */}
                    <div className="text-xs text-amber-300/90 font-medium mb-3 flex items-center gap-1.5">
                      <span>🌤️ Typical Season:</span>
                      <span>{evt.season}</span>
                    </div>

                    {/* Description */}
                    <p className="text-stone-300 text-sm leading-relaxed mb-4">
                      {evt.description}
                    </p>

                    {/* Highlight Box */}
                    {evt.highlight && (
                      <div className="p-3 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-xs text-orange-200/90 mb-4 flex items-start gap-2">
                        <span className="text-sm flex-shrink-0">🌟</span>
                        <div>
                          <strong className="text-orange-300">Highlight:</strong> {evt.highlight}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action row */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 mt-auto">
                    <span className="text-[11px] text-stone-500">
                      Typical annual recurrence
                    </span>
                    <Link
                      href={`/planner?destination=${encodeURIComponent(evt.city)}&month=${encodeURIComponent(evt.month)}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-orange-400 hover:text-orange-300 transition-colors"
                    >
                      Plan Itinerary for {evt.city} →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
