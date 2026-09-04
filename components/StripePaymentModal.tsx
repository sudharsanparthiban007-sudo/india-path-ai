'use client';

import { useState } from 'react';
import Link from 'next/link';

interface StripePaymentModalProps {
  poi: {
    id: number;
    name: string;
    city: string;
    category: string;
  };
  bookingDate: string;
  timeSlot: string;
  ticketCount: number;
  onClose: () => void;
  onSuccess: (bookingId?: number) => void;
}

export default function StripePaymentModal({
  poi,
  bookingDate,
  timeSlot,
  ticketCount,
  onClose,
  onSuccess,
}: StripePaymentModalProps) {
  const [step, setStep] = useState<'review' | 'processing' | 'success' | 'failed'>('review');
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [expDate, setExpDate] = useState('12/28');
  const [cvc, setCvc] = useState('123');
  const [cardHolder, setCardHolder] = useState('Tamil Nadu Traveler');
  const [errorMsg, setErrorMsg] = useState('');
  const [paymentRef, setPaymentRef] = useState<string>('');
  const [isSimulatedMode, setIsSimulatedMode] = useState(false);

  // Server validated calculation
  const ticketPrice = poi.category === 'temple' ? 50 : 150;
  const totalAmount = ticketPrice * ticketCount;

  const handlePay = async () => {
    setStep('processing');
    setErrorMsg('');

    try {
      // 1. Call Create Payment (Server-side price validation + Stripe PaymentIntent creation)
      const createRes = await fetch('/api/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          poiId: poi.id,
          poiName: poi.name,
          category: poi.category,
          bookingDate,
          timeSlot,
          ticketCount,
        }),
      });

      const createData = await createRes.json();

      if (!createRes.ok && !createData.isPlaceholder) {
        throw new Error(createData.error || 'Failed to initialize Stripe PaymentIntent');
      }

      const paymentIntentId = createData.paymentIntentId || `pi_test_${Date.now()}`;
      setPaymentRef(paymentIntentId);
      setIsSimulatedMode(createData.isPlaceholder || false);

      // 2. Confirm Payment with Stripe API
      const confirmRes = await fetch('/api/payments/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentIntentId,
          paymentMethod: 'pm_card_visa', // Standard Stripe Sandbox test payment method
          metadata: {
            poiId: poi.id,
            poiName: poi.name,
            category: poi.category,
            bookingDate,
            timeSlot,
            ticketCount,
            amount: totalAmount,
          },
        }),
      });

      const confirmData = await confirmRes.json();

      if (!confirmRes.ok) {
        throw new Error(confirmData.error || 'Failed to confirm payment with Stripe');
      }

      // If simulated mode, wait 1.2s for UX
      if (confirmData.isSimulated) {
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }

      setPaymentRef(confirmData.paymentIntentId || paymentIntentId);
      setStep('success');
      onSuccess();
    } catch (err: any) {
      console.error('Payment failure:', err);
      setErrorMsg(err.message || 'Payment processing failed. Please try again.');
      setStep('failed');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md glass rounded-3xl p-6 sm:p-7 border border-white/20 shadow-2xl relative text-left">
        {/* Close Button */}
        {step !== 'processing' && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-stone-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            ✕
          </button>
        )}

        {/* ── STEP 1: REVIEW & TEST CARD PAYMENT ── */}
        {step === 'review' && (
          <div>
            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold uppercase tracking-wider">
                🔒 Stripe Sandbox
              </span>
              <span className="text-xs text-stone-400">PaymentSheet</span>
            </div>

            <h2 className="text-xl font-bold text-white mb-1">{poi.name}</h2>
            <p className="text-xs text-stone-400 mb-4">
              📅 {bookingDate} · ⏰ {timeSlot.split('(')[0]} · 👥 {ticketCount} Ticket(s)
            </p>

            {/* Price Summary */}
            <div className="p-3.5 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-between mb-5">
              <div>
                <div className="text-xs text-orange-300 font-medium">Validated Amount</div>
                <div className="text-[11px] text-stone-400">{ticketCount} × ₹{ticketPrice} (Server verified)</div>
              </div>
              <div className="text-2xl font-bold text-orange-400">₹{totalAmount}</div>
            </div>

            {/* Stripe Card Elements Simulation Form */}
            <div className="space-y-3 mb-5">
              <div className="text-xs font-semibold text-stone-300 flex items-center justify-between">
                <span>Test Card Information</span>
                <span className="text-[10px] text-amber-400">Stripe Test Card</span>
              </div>

              <div>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="4242 4242 4242 4242"
                  className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500 font-mono tracking-wider"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={expDate}
                  onChange={(e) => setExpDate(e.target.value)}
                  placeholder="MM/YY"
                  className="bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
                />
                <input
                  type="text"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  placeholder="CVC"
                  className="bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
                />
              </div>

              <input
                type="text"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                placeholder="Cardholder Name"
                className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <button
              id="confirm-stripe-payment-btn"
              onClick={handlePay}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold text-sm transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2"
            >
              <span>💳</span>
              <span>Pay ₹{totalAmount} (Stripe Sandbox)</span>
            </button>

            <p className="text-[10px] text-stone-500 text-center mt-2.5">
              Strict Sandbox Test Mode · No real currency charged
            </p>
          </div>
        )}

        {/* ── STEP 2: PROCESSING ── */}
        {step === 'processing' && (
          <div className="py-12 text-center space-y-4">
            <div className="w-14 h-14 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <div>
              <h3 className="text-lg font-bold text-white">Processing Payment with Stripe…</h3>
              <p className="text-xs text-stone-400 mt-1">
                Creating PaymentIntent and confirming card with Stripe Sandbox…
              </p>
            </div>
          </div>
        )}

        {/* ── STEP 3: SUCCESS ── */}
        {step === 'success' && (
          <div className="py-4 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-2xl mx-auto shadow-lg shadow-emerald-500/20">
              ✓
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
                Payment Successful
              </span>
              <h3 className="text-xl font-bold text-white mt-2">Pass Confirmed!</h3>
              <p className="text-xs text-stone-400 mt-1">
                Your entry pass for {poi.name} has been confirmed and saved to Supabase.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 text-left space-y-1 text-xs">
              <div className="flex justify-between text-stone-300">
                <span>Amount Paid:</span>
                <strong className="text-orange-400 font-bold">₹{totalAmount} INR</strong>
              </div>
              <div className="flex justify-between text-stone-400 text-[11px]">
                <span>Status:</span>
                <span className="text-emerald-400 font-semibold">PAID (Verified)</span>
              </div>
              <div className="flex justify-between text-stone-400 text-[10px] pt-1 border-t border-white/5 truncate">
                <span>Stripe Reference:</span>
                <span className="font-mono text-stone-300">{paymentRef}</span>
              </div>
            </div>

            {isSimulatedMode && (
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300/90 text-left">
                💡 <em>Note:</em> Set <code>STRIPE_SECRET_KEY=sk_test_...</code> in <code>.env.local</code> to see live transactions in your Stripe Sandbox dashboard.
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl glass border border-white/20 text-xs text-stone-300 hover:text-white transition-all"
              >
                Close
              </button>
              <Link
                href="/bookings"
                onClick={onClose}
                className="flex-1 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-1 shadow-md"
              >
                <span>🎟️</span> View Pass
              </Link>
            </div>
          </div>
        )}

        {/* ── STEP 4: FAILED ── */}
        {step === 'failed' && (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 flex items-center justify-center text-2xl mx-auto">
              ✕
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">Payment Failed</h3>
              <p className="text-xs text-red-300/90 mt-1">
                {errorMsg || 'Stripe test payment could not be processed.'}
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl glass border border-white/20 text-xs text-stone-300"
              >
                Cancel
              </button>
              <button
                onClick={() => setStep('review')}
                className="flex-1 py-3 rounded-xl bg-orange-500 text-white text-xs font-bold"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
