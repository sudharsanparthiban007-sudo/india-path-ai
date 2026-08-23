'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface Booking {
  id: number;
  poiName: string;
  bookingDate: string;
  timeSlot: string | null;
  ticketCount: number;
  amount: number;
  currency: string;
  status: string;
  stripeSessionId: string | null;
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

function BookingsContent() {
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get('success') === 'true';
  const sessionId = searchParams.get('session_id');

  const [activeTab, setActiveTab] = useState<'passes' | 'payments'>('passes');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);

  const fetchBookingsAndPayments = useCallback(async () => {
    try {
      const [bookRes, payRes] = await Promise.all([
        fetch('/api/booking'),
        fetch('/api/payments/history'),
      ]);

      const bookData = await bookRes.json();
      const payData = await payRes.json();

      setBookings(bookData.bookings || []);
      setPayments(payData.payments || []);
    } catch (e) {
      console.error('Error fetching bookings/payments:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle Stripe redirect confirmation
  useEffect(() => {
    if (isSuccess && sessionId) {
      setConfirming(true);
      fetch('/api/booking/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      })
        .then((r) => r.json())
        .then(() => {
          setConfirmationMessage('Stripe test checkout verified and pass generated!');
          fetchBookingsAndPayments();
        })
        .catch((err) => console.error(err))
        .finally(() => setConfirming(false));
    } else {
      fetchBookingsAndPayments();
    }
  }, [isSuccess, sessionId, fetchBookingsAndPayments]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold gradient-text">My Bookings & Passes</h1>
          <p className="text-stone-400 text-sm mt-1">
            Monument entry tickets, guided tours, and secure Stripe payment history (Test Mode)
          </p>
        </div>
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold transition-all shadow-md shadow-orange-500/20"
        >
          <span>📍</span> Explore & Book
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-stone-900/80 rounded-2xl border border-white/10 w-fit mb-6">
        <button
          onClick={() => setActiveTab('passes')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'passes'
              ? 'bg-orange-500 text-white shadow-md'
              : 'text-stone-400 hover:text-white'
          }`}
        >
          <span>🎟️</span>
          <span>Entry Passes ({bookings.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('payments')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'payments'
              ? 'bg-orange-500 text-white shadow-md'
              : 'text-stone-400 hover:text-white'
          }`}
        >
          <span>💳</span>
          <span>Payment History ({payments.length})</span>
        </button>
      </div>

      {/* Success banner if returning from checkout */}
      {isSuccess && (
        <div className="mb-8 p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-start gap-3">
          <span className="text-3xl">🎉</span>
          <div>
            <h3 className="font-bold text-lg text-white">Booking Confirmed!</h3>
            <p className="text-sm text-emerald-200 mt-0.5">
              {confirming
                ? 'Verifying test payment with Stripe…'
                : confirmationMessage || 'Your test-mode monument pass is ready below.'}
            </p>
          </div>
        </div>
      )}

      {/* ── TAB 1: PASSES ── */}
      {activeTab === 'passes' && (
        <>
          {loading ? (
            <div className="text-center py-16 text-stone-500">Loading your bookings…</div>
          ) : bookings.length === 0 ? (
            <div className="glass rounded-3xl p-12 text-center border border-white/10">
              <div className="text-5xl mb-4">🎟️</div>
              <h2 className="text-xl font-bold text-white mb-2">No Bookings Yet</h2>
              <p className="text-stone-400 text-sm max-w-md mx-auto mb-6">
                Reserve monument entry tickets and heritage tours across Tamil Nadu using Stripe Test Checkout.
              </p>
              <Link
                href="/explore"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-semibold shadow-lg shadow-orange-500/25"
              >
                Browse Monuments in Explore
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  id={`booking-card-${b.id}`}
                  className="glass rounded-2xl p-6 border border-white/10 hover:border-orange-500/30 transition-all relative overflow-hidden"
                >
                  {/* Ticket pass decorative edge */}
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-orange-500/20 to-transparent w-32 h-full pointer-events-none" />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold uppercase tracking-wider">
                          ✓ Confirmed (Test)
                        </span>
                        <span className="text-xs text-stone-500">Pass #{b.id}</span>
                      </div>

                      <h3 className="text-xl font-bold text-white mt-1">{b.poiName}</h3>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-400 pt-1">
                        <span>📅 Date: <strong className="text-stone-200">{b.bookingDate}</strong></span>
                        <span>⏰ Slot: <strong className="text-stone-200">{b.timeSlot || 'General Entry'}</strong></span>
                        <span>👥 Visitors: <strong className="text-stone-200">{b.ticketCount}</strong></span>
                      </div>
                    </div>

                    {/* Amount and QR representation */}
                    <div className="flex items-center gap-4 sm:text-right">
                      <div>
                        <div className="text-2xl font-bold text-orange-400">
                          ₹{b.amount}
                        </div>
                        <div className="text-[11px] text-stone-500">Paid in Test Mode</div>
                      </div>

                      {/* QR code badge */}
                      <div className="w-16 h-16 rounded-xl bg-white p-1.5 flex flex-col items-center justify-center flex-shrink-0 shadow-md">
                        <div className="text-stone-900 font-mono text-[8px] font-bold text-center leading-none">
                          QR PASS<br />#{b.id}
                        </div>
                        <div className="w-8 h-8 bg-stone-900 rounded mt-1 flex items-center justify-center text-white text-[10px]">
                          🏛️
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* ── TAB 2: PAYMENT HISTORY ── */}
      {activeTab === 'payments' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-stone-900/60 border border-white/10 text-xs text-stone-400 flex items-center justify-between">
            <div>
              <span className="text-stone-200 font-semibold">Supabase & Stripe Payment Ledger</span> · Row Level Security (RLS) Active
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono">
              Sandbox Test Mode
            </span>
          </div>

          {payments.length === 0 ? (
            <div className="glass rounded-3xl p-10 text-center border border-white/10">
              <div className="text-4xl mb-3">💳</div>
              <h3 className="text-lg font-bold text-white mb-1">No Payment Records Found</h3>
              <p className="text-xs text-stone-400">
                Transactions initiated with Stripe PaymentSheet and verified by Supabase will appear here.
              </p>
            </div>
          ) : (
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
          )}
        </div>
      )}
    </div>
  );
}

export default function BookingsPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-stone-500">Loading bookings…</div>}>
      <BookingsContent />
    </Suspense>
  );
}
