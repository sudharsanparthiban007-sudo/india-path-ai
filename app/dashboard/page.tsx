'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useLang } from '@/lib/LangContext';
import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';

interface Complaint {
  id: number;
  description: string;
  department: string;
  urgency: string;
  status: string;
  isMock: boolean;
  lat: number | null;
  lng: number | null;
  locationNote: string | null;
  createdAt: string;
}

interface SavedTrip {
  id: number;
  destination: string;
  days: number;
  interests: string;
  itinerary: string;
  createdAt: string;
}

interface Booking {
  id: number;
  poiName: string;
  bookingDate: string;
  timeSlot: string | null;
  ticketCount: number;
  amount: number;
  status: string;
  createdAt: string;
}

interface PaymentRecord {
  id: number;
  stripePaymentIntentId: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const STATUS_ORDER = ['Submitted', 'In Review', 'Resolved'];

const STATUS_COLOR: Record<string, string> = {
  Submitted: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
  'In Review': 'bg-blue-500/20 text-blue-400 border-blue-500/40',
  Resolved: 'bg-green-500/20 text-green-400 border-green-500/40',
};

const URGENCY_COLOR: Record<string, string> = {
  Low: 'text-green-400',
  Medium: 'text-amber-400',
  High: 'text-orange-400',
  Critical: 'text-red-400',
};

interface RecommendationItem {
  poiId: number;
  name: string;
  city: string;
  category: string;
  reason: string;
  transitInfo: string;
}

export default function DashboardPage() {
  const { t, lang } = useLang();
  const { data: session } = useSession();

  const [activeTab, setActiveTab] = useState<'complaints' | 'trips' | 'bookings' | 'payments'>('complaints');

  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [trips, setTrips] = useState<SavedTrip[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [isPersonalized, setIsPersonalized] = useState(false);
  const [recsLoading, setRecsLoading] = useState(false);

  const [loading, setLoading] = useState(true);
  const [advancing, setAdvancing] = useState<number | null>(null);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setRecsLoading(true);
    try {
      const [compRes, tripsRes, bookRes, recsRes, payRes] = await Promise.all([
        fetch('/api/complaint').then((r) => r.json()),
        fetch('/api/planner').then((r) => r.json()),
        fetch('/api/booking').then((r) => r.json()),
        fetch(`/api/recommendations?lang=${lang}`).then((r) => r.json()).catch(() => ({ recommendations: [] })),
        fetch('/api/payments/history').then((r) => r.json()).catch(() => ({ payments: [] })),
      ]);

      setComplaints(compRes.complaints || []);
      setTrips(tripsRes.trips || []);
      setBookings(bookRes.bookings || []);
      setRecommendations(recsRes.recommendations || []);
      setIsPersonalized(recsRes.isPersonalized || false);
      setPayments(payRes.payments || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setRecsLoading(false);
    }
  }, [lang]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const advance = async (id: number) => {
    setAdvancing(id);
    try {
      const res = await fetch(`/api/complaint/${id}`, { method: 'PATCH' });
      const data = await res.json();
      const updatedStatus = data.complaint?.status;

      setComplaints((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: updatedStatus } : c))
      );

      // Trigger local notification on native platform
      if (Capacitor.isNativePlatform() && updatedStatus) {
        try {
          const perm = await LocalNotifications.requestPermissions();
          if (perm.display === 'granted') {
            await LocalNotifications.schedule({
              notifications: [
                {
                  id: Number(id),
                  title: `Complaint #${id} Status: ${updatedStatus}`,
                  body: `Your tourism report has been updated to "${updatedStatus}".`,
                  schedule: { at: new Date(Date.now() + 500) },
                  sound: 'beep.wav',
                },
              ],
            });
          }
        } catch (notifErr) {
          console.warn('Local notification error on native:', notifErr);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setAdvancing(null);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Prototype banner — always visible (Preserved per instructions) */}
      <div
        id="dashboard-proto-banner"
        className="sticky top-16 z-40 bg-amber-600/90 text-white text-center py-3 px-4 text-sm font-medium backdrop-blur"
      >
        ⚠️ {t('dashboard_proto_banner')}
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header with User Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold gradient-text">{t('dashboard_title')}</h1>
            <p className="text-stone-400 text-sm mt-1">
              {session?.user
                ? `Logged in as ${session.user.name || session.user.email} · Account Data Synced`
                : 'Guest Session · Sign in to permanently sync trips and passes'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {!session?.user && (
              <Link
                href="/login"
                className="px-4 py-2 rounded-xl bg-orange-500/20 border border-orange-500/40 text-orange-300 text-sm font-semibold hover:bg-orange-500/30 transition-all"
              >
                Sign in to Sync
              </Link>
            )}
            <button
              id="dashboard-refresh-btn"
              onClick={fetchDashboardData}
              className="px-4 py-2 rounded-xl glass border border-white/20 text-sm text-stone-400 hover:text-white transition-all flex items-center gap-1.5"
            >
              <span>↻</span> Refresh
            </button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex border-b border-white/10 gap-2 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('complaints')}
            className={`pb-3 px-4 font-semibold text-sm transition-all border-b-2 whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'complaints'
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            <span>📋</span> Complaints ({complaints.length})
          </button>

          <button
            onClick={() => setActiveTab('trips')}
            className={`pb-3 px-4 font-semibold text-sm transition-all border-b-2 whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'trips'
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            <span>🗺️</span> My Trips ({trips.length})
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`pb-3 px-4 font-semibold text-sm transition-all border-b-2 whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'bookings'
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            <span>🎟️</span> My Bookings ({bookings.length})
          </button>

          <button
            onClick={() => setActiveTab('payments')}
            className={`pb-3 px-4 font-semibold text-sm transition-all border-b-2 whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'payments'
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            <span>💳</span> Payment History ({payments.length})
          </button>
        </div>

        {/* ── TAB 1: COMPLAINTS ── */}
        {activeTab === 'complaints' && (
          <div>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {STATUS_ORDER.map((status) => (
                <div key={status} className={`glass rounded-xl p-4 border ${STATUS_COLOR[status]}`}>
                  <div className="text-2xl font-bold mb-1">
                    {complaints.filter((c) => c.status === status).length}
                  </div>
                  <div className="text-xs font-medium opacity-70">{status}</div>
                </div>
              ))}
            </div>

            {/* Complaints list */}
            {loading ? (
              <div className="text-center text-stone-500 py-16">{t('loading')}</div>
            ) : complaints.length === 0 ? (
              <div className="text-center text-stone-500 py-16">{t('dashboard_no_complaints')}</div>
            ) : (
              <div className="space-y-4">
                {complaints.map((complaint) => (
                  <div key={complaint.id} id={`complaint-card-${complaint.id}`} className="glass rounded-2xl p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <div className="flex-1 min-w-0">
                        {/* Header row */}
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${STATUS_COLOR[complaint.status]}`}>
                            {complaint.status}
                          </span>
                          <span className={`text-sm font-semibold ${URGENCY_COLOR[complaint.urgency] || 'text-stone-400'}`}>
                            {complaint.urgency} urgency
                          </span>
                          {complaint.isMock && (
                            <span className="text-xs text-amber-500 border border-amber-500/40 px-2 py-0.5 rounded-full">
                              mock AI
                            </span>
                          )}
                        </div>

                        {/* Department */}
                        <div className="text-sm font-medium text-orange-400 mb-1">
                          📂 {complaint.department}
                        </div>

                        {/* Description */}
                        <p className="text-stone-300 text-sm leading-relaxed mb-2">
                          {complaint.description}
                        </p>

                        {/* Location */}
                        {(complaint.lat || complaint.locationNote) && (
                          <div className="text-xs text-stone-500 flex items-center gap-1">
                            <span>📍</span>
                            {complaint.lat
                              ? `${complaint.lat.toFixed(4)}, ${complaint.lng?.toFixed(4)}`
                              : complaint.locationNote}
                          </div>
                        )}

                        {/* Timestamp */}
                        <div className="text-xs text-stone-600 mt-1">
                          #{complaint.id} · {new Date(complaint.createdAt).toLocaleString()}
                        </div>
                      </div>

                      {/* Advance button */}
                      <div className="flex-shrink-0">
                        <button
                          id={`advance-status-${complaint.id}`}
                          onClick={() => advance(complaint.id)}
                          disabled={complaint.status === 'Resolved' || advancing === complaint.id}
                          className="px-4 py-2 rounded-xl glass border border-white/20 text-sm text-stone-300 hover:text-white hover:border-orange-500/50 transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
                        >
                          {advancing === complaint.id ? '…' : t('dashboard_advance')} →
                        </button>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-4 flex gap-1">
                      {STATUS_ORDER.map((s, i) => (
                        <div
                          key={s}
                          className={`h-1 flex-1 rounded-full transition-all ${
                            STATUS_ORDER.indexOf(complaint.status) >= i
                              ? 'bg-orange-500'
                              : 'bg-stone-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── TAB 2: MY TRIPS ── */}
        {activeTab === 'trips' && (
          <div className="space-y-8">
            {/* ── Feature 3: Recommended For You Section ── */}
            <div className="glass rounded-3xl p-6 border border-orange-500/30 bg-gradient-to-b from-orange-950/20 to-stone-950/60">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span>✨</span> Recommended for You
                    {isPersonalized ? (
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 font-medium">
                        Personalized AI
                      </span>
                    ) : (
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-stone-300 font-medium">
                        Popular Curation
                      </span>
                    )}
                  </h2>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {isPersonalized
                      ? 'AI-selected destinations based on your past trips and travel interests'
                      : 'Iconic heritage destinations recommended for first-time Tamil Nadu explorers'}
                  </p>
                </div>
                <Link
                  href="/explore"
                  className="text-xs text-orange-400 hover:text-orange-300 font-semibold self-start sm:self-auto"
                >
                  Explore All Monuments →
                </Link>
              </div>

              {recsLoading ? (
                <div className="text-stone-500 text-xs py-8 text-center animate-pulse">
                  Finding unvisited heritage destinations for your profile…
                </div>
              ) : recommendations.length === 0 ? (
                <div className="text-stone-500 text-xs py-4 text-center">
                  Explore Tamil Nadu monuments to generate personalized recommendations.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recommendations.map((rec) => (
                    <div
                      key={rec.poiId}
                      className="p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-orange-500/40 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-2">
                          <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] text-stone-300 font-medium">
                            📍 {rec.city}
                          </span>
                          <span className="text-[10px] text-orange-400 uppercase font-semibold">
                            {rec.category}
                          </span>
                        </div>

                        <h3 className="font-bold text-white text-sm mb-2">{rec.name}</h3>

                        {/* AI Reason */}
                        <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-xs text-orange-200/90 leading-relaxed mb-3">
                          <span className="text-orange-400 font-semibold">Why you&apos;ll love it:</span>{' '}
                          {rec.reason}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2 mt-auto">
                        <span className="text-[10px] text-stone-500 line-clamp-1">
                          {rec.transitInfo.split('.')[0]}
                        </span>
                        <Link
                          href={`/planner?destination=${encodeURIComponent(rec.city)}`}
                          className="px-2.5 py-1 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 text-[11px] font-bold transition-all whitespace-nowrap"
                        >
                          + Plan Trip
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Saved Trips Section */}
            <div>
              <h2 className="text-lg font-bold text-white mb-4">Saved Itineraries</h2>
              {loading ? (
                <div className="text-center text-stone-500 py-16">Loading saved trips…</div>
              ) : trips.length === 0 ? (
                <div className="glass rounded-3xl p-12 text-center">
                  <div className="text-5xl mb-4">🗺️</div>
                  <h3 className="text-xl font-bold text-white mb-2">No Saved Trips Yet</h3>
                  <p className="text-stone-400 text-sm max-w-sm mx-auto mb-6">
                    Use the AI Trip Planner to create custom multi-day itineraries across Tamil Nadu.
                  </p>
                  <Link
                    href="/planner"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-semibold shadow-md"
                  >
                    Create an Itinerary
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {trips.map((trip) => {
                    let parsedInterests: string[] = [];
                    try {
                      parsedInterests = JSON.parse(trip.interests);
                    } catch {
                      parsedInterests = [];
                    }

                    return (
                      <div
                        key={trip.id}
                        className="glass rounded-2xl p-5 border border-white/10 hover:border-orange-500/30 transition-all"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <span className="text-xs text-orange-400 font-bold uppercase tracking-wider">
                              {trip.days} Days Itinerary
                            </span>
                            <h3 className="text-lg font-bold text-white mt-0.5">{trip.destination}</h3>
                          </div>
                          <span className="text-xs text-stone-500">
                            {new Date(trip.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        {parsedInterests.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {parsedInterests.map((interest) => (
                              <span
                                key={interest}
                                className="px-2.5 py-0.5 rounded-full bg-white/5 text-stone-300 text-xs border border-white/10 capitalize"
                              >
                                {interest}
                              </span>
                            ))}
                          </div>
                        )}

                        <Link
                          href={`/planner`}
                          className="inline-flex items-center gap-1 text-xs text-orange-400 font-semibold hover:text-orange-300"
                        >
                          Open Planner →
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── TAB 3: MY BOOKINGS ── */}
        {activeTab === 'bookings' && (
          <div>
            {loading ? (
              <div className="text-center text-stone-500 py-16">Loading bookings…</div>
            ) : bookings.length === 0 ? (
              <div className="glass rounded-3xl p-12 text-center">
                <div className="text-5xl mb-4">🎟️</div>
                <h3 className="text-xl font-bold text-white mb-2">No Bookings Found</h3>
                <p className="text-stone-400 text-sm max-w-sm mx-auto mb-6">
                  Book entry passes and guided heritage tours in Explore with Stripe Test Checkout.
                </p>
                <Link
                  href="/explore"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-semibold shadow-md"
                >
                  Browse Monuments
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="glass rounded-2xl p-5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold uppercase">
                          ✓ Confirmed (Test)
                        </span>
                        <span className="text-xs text-stone-500">#{booking.id}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mt-1">{booking.poiName}</h3>
                      <div className="text-xs text-stone-400 space-x-3 mt-1">
                        <span>📅 {booking.bookingDate}</span>
                        <span>⏰ {booking.timeSlot || 'General Entry'}</span>
                        <span>👥 {booking.ticketCount} Ticket(s)</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-xl font-bold text-orange-400">₹{booking.amount}</div>
                        <div className="text-[10px] text-stone-500">Paid in Test Mode</div>
                      </div>
                      <Link
                        href="/bookings"
                        className="px-3.5 py-2 rounded-xl glass border border-white/20 text-xs text-stone-200 hover:text-white hover:border-orange-500/40 transition-all"
                      >
                        View Pass 🎟️
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {/* ── TAB 4: PAYMENT HISTORY ── */}
        {activeTab === 'payments' && (
          <div>
            {loading ? (
              <div className="text-center text-stone-500 py-16">Loading payments…</div>
            ) : payments.length === 0 ? (
              <div className="glass rounded-3xl p-12 text-center">
                <div className="text-5xl mb-4">💳</div>
                <h3 className="text-xl font-bold text-white mb-2">No Payment History</h3>
                <p className="text-stone-400 text-sm max-w-sm mx-auto mb-6">
                  Transactions completed with Stripe PaymentSheet and verified by Supabase will be recorded here.
                </p>
                <Link
                  href="/explore"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-semibold shadow-md"
                >
                  Browse Monuments
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-stone-900/60 border border-white/10 text-xs text-stone-400 flex items-center justify-between">
                  <div>
                    <span className="text-stone-200 font-semibold">Supabase & Stripe Payment Ledger</span> · Row Level Security (RLS) Active
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono">
                    Sandbox Test Mode
                  </span>
                </div>

                <div className="overflow-hidden rounded-2xl border border-white/10 glass">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-900/80 text-stone-400 border-b border-white/10 font-semibold">
                      <tr>
                        <th className="p-3.5">Reference ID</th>
                        <th className="p-3.5">Amount</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5">Date & Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-stone-300">
                      {payments.map((p) => (
                        <tr key={p.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-3.5 font-mono text-[11px] text-stone-400 truncate max-w-[140px]">
                            {p.stripePaymentIntentId}
                          </td>
                          <td className="p-3.5 font-bold text-white">
                            ₹{p.amount} {p.currency.toUpperCase()}
                          </td>
                          <td className="p-3.5">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                p.status === 'paid'
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  : p.status === 'pending'
                                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
                              }`}
                            >
                              {p.status}
                            </span>
                          </td>
                          <td className="p-3.5 text-[11px] text-stone-400">
                            {new Date(p.createdAt).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
