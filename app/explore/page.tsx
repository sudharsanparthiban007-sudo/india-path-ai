'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect, useCallback } from 'react';
import { useLang } from '@/lib/LangContext';
import type { MapMarker, RouteInfo } from '@/components/TourismMap';
import { getOptimizedRoute, type TravelMode } from '@/lib/directions';
import { getNearbyBusStops } from '@/lib/nearbyBusStops';
import BookingModal from '@/components/BookingModal';

// Dynamic imports (client-only components that use the Maps SDK)
const TourismMap = dynamic(() => import('@/components/TourismMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-stone-900 rounded-2xl">
      <div className="text-stone-400 animate-pulse">Loading map…</div>
    </div>
  ),
});

const PlacesSearch = dynamic(() => import('@/components/PlacesSearch'), { ssr: false });

interface POI {
  id: number;
  name: string;
  category: string;
  city: string;
  lat: number;
  lng: number;
  description: string;
  transitInfo: string;
}

interface TransitDirectionResult {
  hasRealDirections: boolean;
  mode?: string;
  summary?: string;
  distance?: string;
  duration?: string;
  departureTime?: string;
  arrivalTime?: string;
  steps?: string[];
  error?: string;
}

const CATEGORIES = ['all', 'heritage', 'temple', 'beach', 'transit', 'nature'];
const CATEGORY_ICONS: Record<string, string> = {
  heritage: '🏛️',
  temple: '⛩️',
  beach: '🏖️',
  transit: '🚉',
  nature: '🌿',
  all: '🗺️',
};

// Map POI category → TourismMap MarkerType
const CATEGORY_TO_MARKER_TYPE: Record<string, MapMarker['type']> = {
  heritage: 'heritage',
  temple: 'heritage',
  beach: 'hotel',
  transit: 'bus_stop',
  nature: 'heritage',
};

export default function ExplorePage() {
  const { t } = useLang();
  const [pois, setPois] = useState<POI[]>([]);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<POI | null>(null);

  // Route / directions state
  const [routeMarkers, setRouteMarkers] = useState<MapMarker[]>([]);
  const [route, setRoute] = useState<RouteInfo | null>(null);
  const [routeLoading, setRouteLoading] = useState(false);
  const [routeError, setRouteError] = useState('');
  const [travelMode, setTravelMode] = useState<TravelMode>('DRIVE');
  const [wasOptimized, setWasOptimized] = useState(false);

  // Search result marker
  const [searchMarker, setSearchMarker] = useState<MapMarker | null>(null);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | undefined>();

  // Bus stops
  const [busStops, setBusStops] = useState<MapMarker[]>([]);
  const [busLoading, setBusLoading] = useState(false);

  // Booking modal
  const [bookingPoi, setBookingPoi] = useState<POI | null>(null);

  // Real transit directions state
  const [transitOrigin, setTransitOrigin] = useState('Chennai Central');
  const [transitData, setTransitData] = useState<TransitDirectionResult | null>(null);
  const [transitLoading, setTransitLoading] = useState(false);

  useEffect(() => {
    fetch('/api/pois')
      .then((r) => r.json())
      .then((d) => setPois(d.pois || []))
      .catch(() => {});
  }, []);

  const filtered = filter === 'all' ? pois : pois.filter((p) => p.category === filter);

  // Convert POIs to TourismMap markers
  const poiMarkers: MapMarker[] = filtered.map((p) => ({
    id: p.id,
    lat: p.lat,
    lng: p.lng,
    label: p.name,
    type: CATEGORY_TO_MARKER_TYPE[p.category] ?? 'heritage',
    description: p.description,
  }));

  // All markers merged
  const allMarkers: MapMarker[] = [
    ...poiMarkers,
    ...(searchMarker ? [searchMarker] : []),
    ...busStops,
    ...routeMarkers,
  ];

  // Handle place selected from autocomplete
  const handlePlaceSelect = useCallback(
    (place: { placeId: string; name: string; lat: number; lng: number; address: string }) => {
      const m: MapMarker = {
        id: `search-${place.placeId}`,
        lat: place.lat,
        lng: place.lng,
        label: place.name,
        type: 'search',
        description: place.address,
      };
      setSearchMarker(m);
      setMapCenter({ lat: place.lat, lng: place.lng });
    },
    [],
  );

  // Add a POI to the route
  const addToRoute = useCallback((marker: MapMarker) => {
    setRouteMarkers((prev) => {
      if (prev.find((m) => m.id === marker.id)) return prev;
      return [...prev, marker];
    });
  }, []);

  // Compute optimised route
  const computeRoute = async () => {
    if (routeMarkers.length < 2) {
      setRouteError('Add at least 2 stops to the route.');
      return;
    }
    setRouteError('');
    setRouteLoading(true);
    setWasOptimized(false);
    try {
      const [origin, ...destinations] = routeMarkers;
      const optimize = destinations.length >= 2;
      const result = await getOptimizedRoute(
        { lat: origin.lat, lng: origin.lng },
        destinations.map((m) => ({ lat: m.lat, lng: m.lng })),
        travelMode,
        optimize,
      );
      setRoute(result);
      setWasOptimized(optimize && result.waypointOrder.length > 0);
    } catch (e: unknown) {
      setRouteError((e as Error).message);
    } finally {
      setRouteLoading(false);
    }
  };

  // Find nearby bus stops
  const findBusStops = () => {
    const ref = searchMarker ?? (selected ? { lat: selected.lat, lng: selected.lng } : null);
    if (!ref && !navigator.geolocation) {
      alert('Select a location first or allow location access.');
      return;
    }

    setBusLoading(true);
    const doSearch = async (lat: number, lng: number) => {
      try {
        const stops = await getNearbyBusStops({ lat, lng, radiusMetres: 2000 });
        setBusStops(stops);
      } catch (e) {
        console.error(e);
      } finally {
        setBusLoading(false);
      }
    };

    if (ref) {
      doSearch(ref.lat, ref.lng);
    } else {
      navigator.geolocation.getCurrentPosition(
        (pos) => doSearch(pos.coords.latitude, pos.coords.longitude),
        () => setBusLoading(false),
      );
    }
  };

  // Fetch real transit directions
  const fetchTransitDirections = useCallback(
    async (poi: POI, customOrigin?: string) => {
      setTransitLoading(true);
      const origin = customOrigin || transitOrigin;
      try {
        const res = await fetch('/api/maps/transit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            origin,
            destination: { lat: poi.lat, lng: poi.lng },
          }),
        });
        const data = await res.json();
        setTransitData(data);
      } catch {
        setTransitData({ hasRealDirections: false });
      } finally {
        setTransitLoading(false);
      }
    },
    [transitOrigin]
  );

  // When selected POI changes, fetch real transit directions automatically
  useEffect(() => {
    if (selected) {
      fetchTransitDirections(selected);
    } else {
      setTransitData(null);
    }
  }, [selected, fetchTransitDirections]);

  // Use GPS location as transit origin
  const useGPSForTransit = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      const coordStr = `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`;
      setTransitOrigin(coordStr);
      if (selected) {
        fetchTransitDirections(selected, coordStr);
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold gradient-text mb-4">{t('explore_title')}</h1>

      {/* ── Filters ── */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            id={`filter-${cat}`}
            onClick={() => setFilter(cat)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
              filter === cat
                ? 'bg-orange-500 border-orange-500 text-white'
                : 'border-stone-700 text-stone-400 hover:border-orange-500/50 hover:text-white'
            }`}
          >
            <span>{CATEGORY_ICONS[cat]}</span>
            <span className="capitalize">{t(`explore_filter_${cat}`)}</span>
          </button>
        ))}
      </div>

      {/* ── Map + detail layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="h-[520px] glass rounded-2xl overflow-hidden">
            <TourismMap
              markers={allMarkers}
              center={mapCenter}
              route={route}
              heightClass="h-[520px]"
              onGetDirections={addToRoute}
              searchSlot={
                <div className="relative z-20 p-3 pb-0">
                  <PlacesSearch
                    onPlaceSelect={handlePlaceSelect}
                    placeholder="Search any place in India…"
                  />
                </div>
              }
            />
          </div>

          {/* Route builder */}
          <div className="glass rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-white font-semibold flex items-center gap-2">
                🗺️ Route Planner
                <span className="text-xs text-stone-500 font-normal">
                  (click &quot;Add to route&quot; on any marker)
                </span>
              </h2>
              <div className="flex gap-2">
                <button
                  id="find-bus-stops-btn"
                  onClick={findBusStops}
                  disabled={busLoading}
                  className="px-3 py-1.5 rounded-lg text-xs text-stone-300 glass border border-white/10 hover:bg-white/10 transition-all disabled:opacity-50"
                >
                  {busLoading ? '🔄 Searching…' : '🚌 Nearby bus stops'}
                </button>
                {routeMarkers.length > 0 && (
                  <button
                    id="clear-route-btn"
                    onClick={() => { setRouteMarkers([]); setRoute(null); setRouteError(''); }}
                    className="px-3 py-1.5 rounded-lg text-xs text-stone-400 glass border border-white/10 hover:bg-white/10 transition-all"
                  >
                    ✕ Clear
                  </button>
                )}
              </div>
            </div>

            {routeMarkers.length === 0 ? (
              <p className="text-stone-500 text-sm">
                Click a marker on the map → &quot;Add to route&quot; to build a multi-stop itinerary.
              </p>
            ) : (
              <div className="space-y-2">
                {/* Travel mode selector */}
                <div className="flex gap-1.5 mb-3">
                  {(['DRIVE', 'TWO_WHEELER', 'TRANSIT', 'WALK'] as TravelMode[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => setTravelMode(m)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        travelMode === m
                          ? 'bg-orange-500 text-white'
                          : 'bg-white/5 text-stone-400 hover:bg-white/10'
                      }`}
                    >
                      {m === 'DRIVE' ? '🚗' : m === 'TWO_WHEELER' ? '🛵' : m === 'TRANSIT' ? '🚌' : '🚶'}
                    </button>
                  ))}
                </div>

                {routeMarkers.map((m, i) => (
                  <div key={m.id} className="flex items-center gap-2 text-sm">
                    <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-stone-300 truncate">{m.label}</span>
                    <button
                      onClick={() => setRouteMarkers((prev) => prev.filter((x) => x.id !== m.id))}
                      className="ml-auto text-stone-600 hover:text-stone-300 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ))}

                <button
                  id="compute-route-btn"
                  onClick={computeRoute}
                  disabled={routeLoading || routeMarkers.length < 2}
                  className="mt-3 w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-semibold disabled:opacity-50 hover:from-orange-400 hover:to-amber-400 transition-all"
                >
                  {routeLoading
                    ? '⏳ Calculating…'
                    : routeMarkers.length >= 3
                    ? '✨ Optimise Route'
                    : '🗺️ Get Route'}
                </button>

                {routeError && (
                  <p className="text-red-400 text-xs mt-1">{routeError}</p>
                )}
              </div>
            )}

            {/* Route result */}
            {route && (
              <div className="mt-4 space-y-3">
                {wasOptimized && (
                  <div className="flex items-center gap-2 p-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <span className="text-green-400 text-xs">✨ Route Optimization API reordered your stops for the shortest path.</span>
                  </div>
                )}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Distance', value: `${route.totalDistanceKm} km` },
                    { label: 'Duration', value: `${route.totalDurationMin} min` },
                    { label: 'Est. Cost', value: `₹${route.estimatedCostINR}` },
                  ].map(({ label, value }) => (
                    <div key={label} className="text-center p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                      <div className="text-orange-400 font-bold text-lg">{value}</div>
                      <div className="text-stone-500 text-xs">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Detail card / POI list */}
        <div className="space-y-3">
          {selected ? (
            <div className="glass rounded-2xl p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-2xl">{CATEGORY_ICONS[selected.category]}</span>
                  <h2 className="text-lg font-bold text-white mt-1">{selected.name}</h2>
                  <span className="text-sm text-stone-400">{selected.city}</span>
                </div>
                <button
                  id="close-detail"
                  onClick={() => setSelected(null)}
                  className="text-stone-500 hover:text-white p-1"
                >
                  ✕
                </button>
              </div>

              <p className="text-stone-300 text-sm leading-relaxed">{selected.description}</p>

              {/* ── Transit Directions Section with Live Google Directions + Seed Fallback ── */}
              <div className="p-4 bg-teal-500/10 border border-teal-500/30 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-teal-400 uppercase tracking-wide flex items-center gap-1.5">
                    <span>🚍</span>
                    <span>{t('explore_how_to_get')}</span>
                  </div>
                  {transitData?.hasRealDirections && (
                    <span className="px-2 py-0.5 rounded-full bg-teal-400/20 text-teal-300 text-[10px] font-bold">
                      LIVE GOOGLE TRANSIT
                    </span>
                  )}
                </div>

                {/* Origin Selector */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={transitOrigin}
                    onChange={(e) => setTransitOrigin(e.target.value)}
                    onBlur={() => fetchTransitDirections(selected, transitOrigin)}
                    onKeyDown={(e) => e.key === 'Enter' && fetchTransitDirections(selected, transitOrigin)}
                    placeholder="Starting from (e.g. Chennai Central)"
                    className="flex-1 bg-stone-900/80 border border-stone-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-teal-400"
                  />
                  <button
                    onClick={useGPSForTransit}
                    title="Use my location"
                    className="px-2.5 py-1.5 glass border border-teal-500/40 rounded-lg text-xs text-teal-300 hover:bg-teal-500/20"
                  >
                    📍 GPS
                  </button>
                </div>

                {/* Directions Content */}
                {transitLoading ? (
                  <div className="text-xs text-teal-300/70 animate-pulse py-2">
                    Fetching live transit routes from Google Maps…
                  </div>
                ) : transitData?.hasRealDirections ? (
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between text-teal-200 font-semibold pt-1">
                      <span>⏱️ {transitData.duration} ({transitData.distance})</span>
                      {transitData.departureTime && (
                        <span className="text-[11px] text-teal-300/80">Departs: {transitData.departureTime}</span>
                      )}
                    </div>
                    {transitData.steps && transitData.steps.length > 0 && (
                      <ul className="space-y-1.5 pt-1 text-teal-100/90 pl-3 list-disc">
                        {transitData.steps.map((step, idx) => (
                          <li key={idx} className="leading-relaxed">{step}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  /* Seeded fallback text when API key is missing or no transit found */
                  <p className="text-teal-200 text-xs leading-relaxed">
                    {selected.transitInfo}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  id="add-to-route-btn"
                  onClick={() =>
                    addToRoute({
                      id: selected.id,
                      lat: selected.lat,
                      lng: selected.lng,
                      label: selected.name,
                      type: CATEGORY_TO_MARKER_TYPE[selected.category] ?? 'heritage',
                    })
                  }
                  className="py-2.5 px-3 rounded-xl bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs font-semibold hover:bg-orange-500/30 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>+</span> Add to route
                </button>

                <button
                  id="reserve-ticket-btn"
                  onClick={() => setBookingPoi(selected)}
                  className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white text-xs font-bold transition-all shadow-md shadow-orange-500/20 flex items-center justify-center gap-1.5"
                >
                  <span>🎟️</span> Reserve Pass
                </button>
              </div>
            </div>
          ) : (
            <div className="glass rounded-2xl p-4">
              <p className="text-stone-500 text-sm mb-3">
                {filtered.length} sites — click a marker or item below
              </p>
              <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                {filtered.map((poi) => (
                  <button
                    key={poi.id}
                    id={`poi-item-${poi.id}`}
                    onClick={() => setSelected(poi)}
                    className="w-full text-left p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 flex items-center gap-3"
                  >
                    <span className="text-xl flex-shrink-0">{CATEGORY_ICONS[poi.category]}</span>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-white truncate">{poi.name}</div>
                      <div className="text-xs text-stone-500">{poi.city}</div>
                    </div>
                    <span className="text-xs text-orange-400 opacity-0 group-hover:opacity-100">
                      →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Booking Reservation Modal ── */}
      {bookingPoi && (
        <BookingModal
          poi={bookingPoi}
          onClose={() => setBookingPoi(null)}
        />
      )}
    </div>
  );
}
