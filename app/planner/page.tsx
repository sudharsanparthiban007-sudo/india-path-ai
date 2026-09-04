'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLang } from '@/lib/LangContext';

const DESTINATIONS = ['Chennai', 'Mahabalipuram', 'Madurai', 'Thanjavur', 'Kanyakumari'];
const INTERESTS = ['heritage', 'temples', 'food', 'nature', 'beaches'];
const MONTHS = [
  'Any Month',
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

interface DayPlan {
  day: number;
  title: string;
  places: string[];
  transport: string;
  timeBlocks: string[];
  foodSuggestion: string;
  estimatedCost: string;
}

interface SavedTrip {
  id: number;
  destination: string;
  days: number;
  createdAt: string;
}

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

function PlannerContent() {
  const { t, lang } = useLang();
  const searchParams = useSearchParams();

  const initialDestination = searchParams.get('destination') || 'Chennai';
  const initialMonth = searchParams.get('month') || 'Any Month';

  const [destination, setDestination] = useState(
    DESTINATIONS.includes(initialDestination) ? initialDestination : 'Chennai'
  );
  const [travelMonth, setTravelMonth] = useState(
    MONTHS.includes(initialMonth) ? initialMonth : 'Any Month'
  );
  const [days, setDays] = useState(2);
  const [interests, setInterests] = useState<string[]>(['heritage']);
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<DayPlan[] | null>(null);
  const [activeDay, setActiveDay] = useState(0);
  const [isMock, setIsMock] = useState(false);
  const [savedTrips, setSavedTrips] = useState<SavedTrip[]>([]);
  const [matchingEvents, setMatchingEvents] = useState<CulturalEvent[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/planner')
      .then((r) => r.json())
      .then((d) => setSavedTrips(d.trips || []))
      .catch(() => {});
  }, []);

  // Fetch cultural events matching the chosen destination and/or travel month
  useEffect(() => {
    async function checkEvents() {
      try {
        const params = new URLSearchParams();
        if (travelMonth !== 'Any Month') params.set('month', travelMonth);
        if (destination) params.set('city', destination);

        const res = await fetch(`/api/events?${params.toString()}`);
        const data = await res.json();
        setMatchingEvents(data.events || []);
      } catch (err) {
        console.error('Failed to fetch events for planner:', err);
      }
    }
    checkEvents();
  }, [destination, travelMonth]);

  const toggleInterest = (i: string) =>
    setInterests((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );

  const generate = async () => {
    if (!destination) {
      setError('Please select a destination.');
      return;
    }
    if (interests.length === 0) {
      setError('Please select at least one interest.');
      return;
    }

    setLoading(true);
    setItinerary(null);
    setError(null);

    try {
      const res = await fetch('/api/planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination,
          travelMonth,
          days,
          interests,
          language: lang,
        }),
      });

      const data = await res.json();

      let parsedItinerary = data.itinerary;
      if (typeof parsedItinerary === 'string') {
        try {
          parsedItinerary = JSON.parse(parsedItinerary);
        } catch (parseErr) {
          console.warn('Failed to parse itinerary JSON string:', parseErr);
        }
      }

      if (parsedItinerary?.days && Array.isArray(parsedItinerary.days)) {
        setItinerary(parsedItinerary.days);
        setActiveDay(0);
        setIsMock(Boolean(data.mock));
        if (data.trip) {
          setSavedTrips((prev) => [data.trip, ...prev.filter((t) => t.id !== data.trip.id)]);
        }
      } else if (data.error) {
        setError(data.error);
      } else {
        setError('Could not generate an itinerary. Please try again.');
      }
    } catch (e: any) {
      console.error('Planner error:', e);
      setError('Network or server error while generating itinerary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold gradient-text">{t('planner_title')}</h1>
          <p className="text-stone-400 text-sm mt-1">
            Personalized day-by-day itineraries aligned with Tamil Nadu cultural events & heritage
          </p>
        </div>
        <Link
          href="/events"
          className="px-4 py-2 rounded-xl glass border border-white/20 text-xs text-stone-300 hover:text-white hover:border-orange-500/40 transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span>📅</span> View Cultural Calendar
        </Link>
      </div>

      {/* Form */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
          {/* Destination */}
          <div>
            <label className="block text-sm font-medium text-stone-400 mb-2">
              {t('planner_destination')}
            </label>
            <select
              id="planner-destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 text-sm"
            >
              {DESTINATIONS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Travel Month (Feature 2) */}
          <div>
            <label className="block text-sm font-medium text-stone-400 mb-2">
              Travel Month <span className="text-xs text-stone-500">(Optional)</span>
            </label>
            <select
              id="planner-travel-month"
              value={travelMonth}
              onChange={(e) => setTravelMonth(e.target.value)}
              className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 text-sm"
            >
              {MONTHS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Days */}
          <div>
            <label className="block text-sm font-medium text-stone-400 mb-2">
              {t('planner_days')}: <span className="text-orange-400 font-bold">{days}</span>
            </label>
            <input
              id="planner-days"
              type="range"
              min={1}
              max={5}
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full accent-orange-500 mt-2"
            />
            <div className="flex justify-between text-xs text-stone-600 mt-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <span key={n}>{n}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Interests */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-stone-400 mb-3">
            {t('planner_interests')}
          </label>
          <div className="flex flex-wrap gap-2">
            {INTERESTS.map((i) => (
              <button
                key={i}
                id={`interest-${i}`}
                onClick={() => toggleInterest(i)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  interests.includes(i)
                    ? 'bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-500/20'
                    : 'border-stone-700 text-stone-400 hover:border-orange-500/50 hover:text-white'
                }`}
              >
                {t(`planner_interest_${i}`)}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <button
          id="planner-generate-btn"
          onClick={generate}
          disabled={loading || interests.length === 0}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-orange-400 hover:to-amber-400 transition-all shadow-lg shadow-orange-500/20"
        >
          {loading ? t('planner_generating') : t('planner_generate')}
        </button>
      </div>

      {/* Surfaced Cultural Events Banner if matches exist */}
      {matchingEvents.length > 0 && (
        <div className="mb-8 glass rounded-2xl p-5 border border-amber-500/30 bg-amber-950/20">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <span className="text-lg">🎉</span>
              <span>
                Cultural Events in {destination} {travelMonth !== 'Any Month' ? `during ${travelMonth}` : ''}
              </span>
            </div>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-medium">
              Seasonal Guidance
            </span>
          </div>

          <div className="space-y-3">
            {matchingEvents.map((evt) => (
              <div
                key={evt.id}
                className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{evt.name}</span>
                    <span className="text-xs text-orange-400 font-medium">({evt.month})</span>
                  </div>
                  <p className="text-stone-300 text-xs mt-1">{evt.description}</p>
                  <div className="text-[11px] text-amber-300/80 mt-1">
                    🌤️ Typical Season: {evt.season} (Confirm exact dates before booking)
                  </div>
                </div>
                <Link
                  href="/events"
                  className="text-xs font-semibold text-orange-400 hover:text-orange-300 whitespace-nowrap flex-shrink-0"
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mock note */}
      {isMock && itinerary && (
        <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400 text-sm">
          {t('planner_mock_note')}
        </div>
      )}

      {/* Itinerary */}
      {itinerary && (
        <div className="glass rounded-2xl overflow-hidden mb-8">
          {/* Day tabs */}
          <div className="flex overflow-x-auto border-b border-white/10">
            {itinerary.map((day, idx) => (
              <button
                key={idx}
                id={`day-tab-${idx}`}
                onClick={() => setActiveDay(idx)}
                className={`flex-shrink-0 px-6 py-4 text-sm font-medium transition-all border-b-2 ${
                  activeDay === idx
                    ? 'border-orange-500 text-orange-400 bg-orange-500/10'
                    : 'border-transparent text-stone-400 hover:text-white'
                }`}
              >
                {t('planner_day')} {day.day}
              </button>
            ))}
          </div>

          {/* Day content */}
          {itinerary[activeDay] && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-5">
                {itinerary[activeDay].title}
              </h2>

              {/* Places */}
              <div className="mb-5">
                <div className="flex items-center gap-2 text-orange-400 font-medium mb-2 text-sm">
                  <span>📍</span> Places
                </div>
                <div className="flex flex-wrap gap-2">
                  {itinerary[activeDay].places.map((p, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full text-sm text-orange-300"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* Time blocks */}
              <div className="mb-5 space-y-2">
                {itinerary[activeDay].timeBlocks.map((block, i) => (
                  <div
                    key={i}
                    className="flex gap-3 p-3 bg-white/5 rounded-lg text-sm text-stone-300"
                  >
                    <span className="text-amber-400 flex-shrink-0">⏰</span>
                    {block}
                  </div>
                ))}
              </div>

              {/* Transport */}
              <div className="mb-4 p-3 bg-teal-500/10 border border-teal-500/30 rounded-lg text-sm text-teal-300 flex gap-2">
                <span>🚌</span>
                <span>{itinerary[activeDay].transport}</span>
              </div>

              {/* Food */}
              <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg text-sm text-rose-300 flex gap-2">
                <span>🍽️</span>
                <span>{itinerary[activeDay].foodSuggestion}</span>
              </div>

              {/* Cost */}
              <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-sm text-green-300 flex gap-2">
                <span>💰</span>
                <span>{itinerary[activeDay].estimatedCost}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Saved trips */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">{t('planner_my_trips')}</h2>
        {savedTrips.length === 0 ? (
          <p className="text-stone-500 text-sm">{t('planner_no_trips')}</p>
        ) : (
          <div className="space-y-3">
            {savedTrips.map((trip) => (
              <div
                key={trip.id}
                className="glass p-4 rounded-xl flex items-center justify-between"
              >
                <div>
                  <div className="font-medium text-white">{trip.destination}</div>
                  <div className="text-sm text-stone-500">
                    {trip.days} {trip.days === 1 ? 'day' : 'days'} ·{' '}
                    {new Date(trip.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <span className="px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full text-xs font-semibold">
                  Saved
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function PlannerPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto px-4 py-16 text-center text-stone-500">
          Loading Planner…
        </div>
      }
    >
      <PlannerContent />
    </Suspense>
  );
}
