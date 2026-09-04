'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StripePaymentModal from './StripePaymentModal';

interface BookingModalProps {
  poi: {
    id: number;
    name: string;
    city: string;
    category: string;
  };
  onClose: () => void;
}

export default function BookingModal({ poi, onClose }: BookingModalProps) {
  const router = useRouter();

  // Tomorrow's date as default
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDate = tomorrow.toISOString().split('T')[0];

  const [date, setDate] = useState(defaultDate);
  const [timeSlot, setTimeSlot] = useState('09:00 AM - 12:00 PM (Morning Entry)');
  const [tickets, setTickets] = useState(2);
  const [showStripeModal, setShowStripeModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const ticketPrice = poi.category === 'temple' ? 50 : 150;
  const totalAmount = ticketPrice * tickets;

  const handleOpenPayment = () => {
    if (!date) {
      setError('Please select a visit date');
      return;
    }
    setShowStripeModal(true);
  };

  const handlePaymentSuccess = () => {
    router.push('/bookings');
  };

  return (
    <>
      {showStripeModal ? (
        <StripePaymentModal
          poi={poi}
          bookingDate={date}
          timeSlot={timeSlot}
          ticketCount={tickets}
          onClose={() => {
            setShowStripeModal(false);
            onClose();
          }}
          onSuccess={handlePaymentSuccess}
        />
      ) : (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-lg glass rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl relative">
            {/* Close button */}
            <button
              onClick={onClose}
              id="close-booking-modal-btn"
              className="absolute top-5 right-5 text-stone-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              ✕
            </button>

            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <span>🔒</span> Stripe Sandbox & Supabase
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                Reserve Entry & Tour Pass
              </h2>
              <p className="text-stone-400 text-sm mt-1">
                {poi.name} · <span className="text-stone-300">{poi.city}</span>
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Form fields */}
            <div className="space-y-4 text-left mb-6">
              {/* Date */}
              <div>
                <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1.5">
                  Visit Date
                </label>
                <input
                  type="date"
                  id="booking-date-input"
                  value={date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* Time slot */}
              <div>
                <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1.5">
                  Time Slot
                </label>
                <select
                  id="booking-timeslot-select"
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-orange-500"
                >
                  <option value="09:00 AM - 12:00 PM (Morning Entry)">09:00 AM - 12:00 PM (Morning Slot)</option>
                  <option value="02:00 PM - 05:00 PM (Afternoon Entry)">02:00 PM - 05:00 PM (Afternoon Slot)</option>
                  <option value="05:00 PM - 07:00 PM (Sunset / Sound & Light)">05:00 PM - 07:00 PM (Sunset / Special)</option>
                </select>
              </div>

              {/* Ticket quantity */}
              <div>
                <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1.5">
                  Visitors / Tickets
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setTickets(Math.max(1, tickets - 1))}
                    className="w-10 h-10 rounded-xl glass border border-white/10 text-white font-bold hover:bg-white/10 transition-colors flex items-center justify-center text-lg"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-lg font-bold text-white" id="booking-tickets-count">
                    {tickets}
                  </span>
                  <button
                    type="button"
                    onClick={() => setTickets(Math.min(10, tickets + 1))}
                    className="w-10 h-10 rounded-xl glass border border-white/10 text-white font-bold hover:bg-white/10 transition-colors flex items-center justify-center text-lg"
                  >
                    +
                  </button>
                  <span className="text-xs text-stone-500 ml-auto">
                    ₹{ticketPrice} per visitor
                  </span>
                </div>
              </div>

              {/* Price summary */}
              <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-between">
                <div>
                  <div className="text-xs text-orange-300 font-medium">Validated Amount</div>
                  <div className="text-xs text-stone-400">{tickets} × ₹{ticketPrice} (Verified server-side)</div>
                </div>
                <div className="text-2xl font-bold text-orange-400" id="booking-total-amount">
                  ₹{totalAmount}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-2">
              <button
                type="button"
                id="proceed-stripe-checkout-btn"
                onClick={handleOpenPayment}
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold text-sm transition-all shadow-lg shadow-orange-500/25 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <span>💳</span>
                <span>Proceed to Pay ₹{totalAmount} (Stripe Sandbox)</span>
              </button>
              <p className="text-[11px] text-stone-500 text-center">
                Stripe PaymentSheet (Test Mode) · Encrypted · No real charge
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
