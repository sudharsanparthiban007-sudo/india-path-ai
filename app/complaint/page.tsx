'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useLang } from '@/lib/LangContext';
import type { MapMarker } from '@/components/TourismMap';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';

const TourismMap = dynamic(() => import('@/components/TourismMap'), { ssr: false });

export default function ComplaintPage() {
  const { t, lang } = useLang();
  const [description, setDescription] = useState('');
  const [photoData, setPhotoData] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [locationNote, setLocationNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    department: string;
    urgency: string;
    id: number;
    mock: boolean;
  } | null>(null);
  const [gpsLoading, setGpsLoading] = useState(false);

  const handlePhoto = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setPhotoPreview(dataUrl);
      setPhotoData(dataUrl.split(',')[1]);
    };
    reader.readAsDataURL(file);
  };

  const getGPS = async () => {
    setGpsLoading(true);
    if (Capacitor.isNativePlatform()) {
      try {
        const pos = await Geolocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 10000,
        });
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
      } catch (err) {
        console.error('Capacitor native geolocation error:', err);
      } finally {
        setGpsLoading(false);
      }
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLat(pos.coords.latitude);
          setLng(pos.coords.longitude);
          setGpsLoading(false);
        },
        () => setGpsLoading(false),
      );
    } else {
      setGpsLoading(false);
    }
  };

  const submit = async () => {
    if (!description.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/complaint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, photoData, lat, lng, locationNote, language: lang }),
      });
      const data = await res.json();
      setResult({
        department: data.complaint.department,
        urgency: data.complaint.urgency,
        id: data.complaint.id,
        mock: data.mock,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const URGENCY_COLOR: Record<string, string> = {
    Low: 'text-green-400 bg-green-500/10 border-green-500/30',
    Medium: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    High: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
    Critical: 'text-red-400 bg-red-500/10 border-red-500/30',
  };

  // Preview marker for the map
  const previewMarkers: MapMarker[] =
    lat && lng
      ? [{ id: 'complaint-pin', lat, lng, label: 'Complaint location', type: 'incident' }]
      : [];

  return (
    <div className="min-h-screen">
      {/* Prototype banner */}
      <div
        id="complaint-proto-banner"
        className="sticky top-16 z-40 bg-amber-600/90 text-white text-center py-3 px-4 text-sm font-medium backdrop-blur"
      >
        ⚠️ {t('complaint_proto_banner')}
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold gradient-text mb-8">{t('complaint_title')}</h1>

        {result ? (
          /* Success state */
          <div className="glass rounded-2xl p-6 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-xl font-bold text-white mb-2">{t('complaint_success')}</h2>
            <p className="text-stone-400 text-sm mb-6">Complaint ID: #{result.id}</p>

            {result.mock && (
              <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-400 text-sm text-left">
                ⚠️ Mock AI classification — add GEMINI_API_KEY for real routing.
              </div>
            )}

            <div className="space-y-3 text-left">
              <div className="p-4 glass rounded-xl">
                <div className="text-xs text-stone-500 uppercase tracking-wide mb-1">
                  {t('complaint_department')}
                </div>
                <div className="text-white font-semibold">{result.department}</div>
              </div>
              <div className={`p-4 rounded-xl border ${URGENCY_COLOR[result.urgency] || 'text-stone-300'}`}>
                <div className="text-xs uppercase tracking-wide mb-1 opacity-70">
                  {t('complaint_urgency')}
                </div>
                <div className="font-bold">{result.urgency}</div>
              </div>
            </div>

            <button
              id="complaint-new-btn"
              onClick={() => {
                setResult(null);
                setDescription('');
                setPhotoData(null);
                setPhotoPreview(null);
                setLat(null);
                setLng(null);
                setLocationNote('');
              }}
              className="mt-6 px-6 py-3 rounded-xl glass border border-white/20 text-white hover:bg-white/10 transition-all"
            >
              Submit another
            </button>
          </div>
        ) : (
          <div className="glass rounded-2xl p-6 space-y-5">
            {/* Photo upload */}
            <div>
              <label className="block text-sm font-medium text-stone-400 mb-2">
                {t('complaint_photo')}
              </label>
              <div
                onClick={() => document.getElementById('complaint-photo-input')?.click()}
                className="border-2 border-dashed border-stone-700 rounded-xl p-4 cursor-pointer hover:border-orange-500/50 transition-colors text-center"
              >
                {photoPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="max-h-40 mx-auto rounded-lg object-contain"
                  />
                ) : (
                  <div className="text-stone-500 text-sm py-4">
                    <span className="text-2xl block mb-2">📷</span>
                    Click to add a photo
                  </div>
                )}
              </div>
              <input
                id="complaint-photo-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) handlePhoto(e.target.files[0]);
                }}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-stone-400 mb-2">
                {t('complaint_description')} *
              </label>
              <textarea
                id="complaint-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500 resize-none"
                placeholder="Describe the issue…"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-stone-400 mb-2">
                {t('complaint_location')}
              </label>
              <div className="flex gap-2 mb-2">
                <button
                  id="complaint-gps-btn"
                  onClick={getGPS}
                  disabled={gpsLoading}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-white/20 text-sm text-stone-300 hover:text-white transition-all disabled:opacity-50"
                >
                  <span>📍</span>{gpsLoading ? 'Getting…' : t('complaint_use_gps')}
                </button>
                {lat && (
                  <span className="flex items-center text-green-400 text-sm">
                    ✓ {lat.toFixed(4)}, {lng?.toFixed(4)}
                  </span>
                )}
              </div>

              {/* ── Location preview map (non-interactive) ── */}
              {lat && lng && (
                <div className="mb-3 rounded-xl overflow-hidden border border-white/10">
                  <p className="text-xs text-stone-500 px-3 pt-2 pb-1">
                    📌 Confirm your pin location before submitting
                  </p>
                  <TourismMap
                    markers={previewMarkers}
                    center={{ lat, lng }}
                    zoom={15}
                    staticPreview={true}
                    heightClass="h-[200px]"
                  />
                </div>
              )}

              <input
                id="complaint-location-note"
                type="text"
                value={locationNote}
                onChange={(e) => setLocationNote(e.target.value)}
                className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500"
                placeholder="Or describe the location (e.g. 'Near Meenakshi Temple east gate')"
              />
            </div>

            {/* Submit */}
            <button
              id="complaint-submit-btn"
              onClick={submit}
              disabled={loading || !description.trim()}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-500 hover:to-indigo-500 transition-all"
            >
              {loading ? t('complaint_submitting') : t('complaint_submit')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
