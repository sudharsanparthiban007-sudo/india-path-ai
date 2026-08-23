'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useLang } from '@/lib/LangContext';
import { reverseGeocode } from '@/lib/geocoding';
import type { MapMarker } from '@/components/TourismMap';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';

const TourismMap = dynamic(() => import('@/components/TourismMap'), { ssr: false });

interface Incident {
  id: number;
  lat: number | null;
  lng: number | null;
  note: string | null;
  createdAt: string;
}

export default function SOSPage() {
  const { t } = useLang();
  const [activated, setActivated] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState('');
  const [address, setAddress] = useState('');
  const [addressLoading, setAddressLoading] = useState(false);
  const [note, setNote] = useState('');
  const [logged, setLogged] = useState(false);
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    fetch('/api/sos')
      .then((r) => r.json())
      .then((d) => setIncidents(d.incidents || []))
      .catch(() => {});
  }, []);

  const handleSOS = async () => {
    setActivated(true);
    setLogged(false);
    setAddress('');

    const onCoordsObtained = async (coords: { latitude: number; longitude: number }) => {
      const loc = { lat: coords.latitude, lng: coords.longitude };
      setLocation(loc);
      setLocationError('');

      // Reverse geocode → human-readable address
      setAddressLoading(true);
      try {
        const result = await reverseGeocode(loc.lat, loc.lng);
        setAddress(result.formattedAddress);
      } catch {
        setAddress('');
      } finally {
        setAddressLoading(false);
      }
    };

    if (Capacitor.isNativePlatform()) {
      try {
        const pos = await Geolocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 10000,
        });
        await onCoordsObtained(pos.coords);
      } catch (err) {
        console.error('Capacitor native geolocation error:', err);
        setLocationError(t('sos_location_denied'));
      }
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          await onCoordsObtained(pos.coords);
        },
        () => {
          setLocationError(t('sos_location_denied'));
        },
      );
    } else {
      setLocationError(t('sos_location_denied'));
    }
  };

  const logIncident = async () => {
    const res = await fetch('/api/sos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lat: location?.lat,
        lng: location?.lng,
        note: `${note}${address ? `\n📍 Address: ${address}` : ''}`,
      }),
    });
    const data = await res.json();
    setLogged(true);
    setIncidents((prev) => [data.incident, ...prev]);
  };

  // SOS marker for the mini map
  const sosMarkers: MapMarker[] = location
    ? [{ id: 'sos-pin', lat: location.lat, lng: location.lng, label: 'Your location', type: 'incident' }]
    : [];

  return (
    <div className="min-h-screen">
      {/* Demo banner */}
      <div
        id="sos-demo-banner"
        className="sticky top-16 z-40 bg-red-600 text-white text-center py-3 px-4 font-bold text-sm tracking-wide shadow-lg"
      >
        🚨 {t('sos_demo_banner')} 🚨
      </div>

      <div className="max-w-lg mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">{t('sos_title')}</h1>

        {/* SOS Button */}
        {!activated ? (
          <div className="text-center mb-10">
            <button
              id="sos-btn"
              onClick={handleSOS}
              className="w-40 h-40 rounded-full bg-red-600 hover:bg-red-500 active:scale-95 text-white font-bold text-xl shadow-2xl shadow-red-600/50 transition-all flex flex-col items-center justify-center mx-auto border-4 border-red-400"
            >
              <span className="text-4xl mb-1">🆘</span>
              <span>{t('sos_button')}</span>
            </button>
            <p className="text-stone-500 text-sm mt-6">
              Tap to capture location and see emergency numbers
            </p>
          </div>
        ) : (
          /* Activated state */
          <div className="space-y-4 mb-8">
            {/* Alert banner */}
            <div
              id="sos-activated-banner"
              className="p-6 bg-red-700 rounded-2xl text-center border-2 border-red-400"
            >
              <div className="text-5xl mb-2">🚨</div>
              <div className="text-2xl font-black text-white mb-1">DEMO MODE</div>
              <div className="text-red-200 text-sm font-medium">{t('sos_demo_banner')}</div>
            </div>

            {/* Location */}
            <div className="glass rounded-2xl p-4 space-y-3">
              {location ? (
                <>
                  <div className="text-green-400 text-sm flex items-center gap-2">
                    <span>📍</span>
                    <span>
                      {t('sos_location_captured')}: {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
                    </span>
                  </div>

                  {/* Reverse-geocoded address */}
                  {addressLoading ? (
                    <div className="text-stone-400 text-xs animate-pulse">Looking up address…</div>
                  ) : address ? (
                    <div className="p-2 bg-green-500/10 border border-green-500/20 rounded-lg text-green-300 text-xs leading-relaxed">
                      🏠 <span className="font-medium">{address}</span>
                    </div>
                  ) : null}

                  {/* Mini map showing the pin */}
                  <div className="rounded-xl overflow-hidden border border-white/10">
                    <TourismMap
                      markers={sosMarkers}
                      center={location}
                      zoom={15}
                      staticPreview={false}
                      heightClass="h-[220px]"
                    />
                  </div>
                </>
              ) : locationError ? (
                <div className="text-amber-400 text-sm flex items-center gap-2">
                  <span>⚠️</span> <span>{locationError}</span>
                </div>
              ) : (
                <div className="text-stone-400 text-sm animate-pulse">Getting location…</div>
              )}
            </div>

            {/* Note + log */}
            <div className="glass rounded-2xl p-4 space-y-3">
              <label className="block text-sm font-medium text-stone-400">{t('sos_note_label')}</label>
              <textarea
                id="sos-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-red-500 resize-none"
                placeholder="Describe your situation…"
              />
              <button
                id="sos-log-btn"
                onClick={logIncident}
                disabled={logged}
                className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold transition-all disabled:opacity-60"
              >
                {logged ? `✅ ${t('sos_logged')}` : t('sos_log_incident')}
              </button>
            </div>
          </div>
        )}

        {/* Emergency numbers */}
        <div className="glass rounded-2xl p-5 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span>📞</span> {t('sos_emergency_numbers')}
          </h2>
          <div className="space-y-3">
            {[
              { key: 'sos_general', color: 'bg-red-500/20 border-red-500/40 text-red-300' },
              { key: 'sos_police', color: 'bg-blue-500/20 border-blue-500/40 text-blue-300' },
              { key: 'sos_fire', color: 'bg-orange-500/20 border-orange-500/40 text-orange-300' },
              { key: 'sos_ambulance', color: 'bg-green-500/20 border-green-500/40 text-green-300' },
            ].map(({ key, color }) => (
              <div key={key} className={`p-3 rounded-xl border ${color} font-semibold text-sm`}>
                {t(key)}
              </div>
            ))}
          </div>
        </div>

        {/* Embassy note */}
        <div className="glass rounded-2xl p-5 mb-8">
          <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <span>🏛️</span> {t('sos_embassy')}
          </h2>
          <p className="text-stone-400 text-sm">{t('sos_embassy_note')}</p>
          <div className="mt-3">
            <label className="block text-xs text-stone-500 mb-1">Your country</label>
            <select
              id="sos-country-select"
              className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500"
            >
              <option value="">Select your country…</option>
              {[
                'United States','United Kingdom','Australia','Canada',
                'Germany','France','Japan','Singapore','Malaysia','Other',
              ].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <p className="text-xs text-stone-600 mt-2">
              ⚠️ Look up your country&apos;s current embassy number in India.
            </p>
          </div>
        </div>

        {/* Incident log */}
        {incidents.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-white mb-4">{t('sos_incident_log')}</h2>
            <div className="space-y-3">
              {incidents.map((inc) => (
                <div key={inc.id} className="glass rounded-xl p-4 text-sm">
                  <div className="text-stone-400 mb-1">
                    {new Date(inc.createdAt).toLocaleString()}
                  </div>
                  {inc.lat && (
                    <div className="text-stone-500">
                      📍 {inc.lat.toFixed(4)}, {inc.lng?.toFixed(4)}
                    </div>
                  )}
                  {inc.note && <div className="text-stone-300 mt-1 whitespace-pre-wrap">{inc.note}</div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
