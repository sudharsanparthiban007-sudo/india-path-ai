'use client';

import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  Pin,
  useMap,
} from '@vis.gl/react-google-maps';
import { useState, useEffect } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type MarkerType = 'heritage' | 'bus_stop' | 'hotel' | 'hospital' | 'search' | 'incident';

export interface MapMarker {
  id: string | number;
  lat: number;
  lng: number;
  label: string;
  type: MarkerType;
  description?: string;
}

export interface RouteInfo {
  polylinePath: Array<{ lat: number; lng: number }>;
  totalDistanceKm: number;
  totalDurationMin: number;
  estimatedCostINR: number;
}

interface TourismMapProps {
  /** Markers to plot on the map */
  markers?: MapMarker[];
  /** Initial center; defaults to New Delhi */
  center?: { lat: number; lng: number };
  /** Initial zoom; defaults to 5 */
  zoom?: number;
  /** If true the map is non-interactive (preview / confirmation mode) */
  staticPreview?: boolean;
  /** Route polyline returned from getOptimizedRoute */
  route?: RouteInfo | null;
  /** Height class for the map container, e.g. "h-[500px]" */
  heightClass?: string;
  /** Called when "Get directions" is clicked inside an InfoWindow */
  onGetDirections?: (marker: MapMarker) => void;
  /**
   * Optional React node rendered INSIDE the APIProvider but ABOVE the map.
   * Use this to embed <PlacesSearch> so it shares the same SDK bootstrap
   * (NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) and avoids ApiTargetBlockedMapError.
   */
  searchSlot?: React.ReactNode;
}

// ─── Icon colours per type ────────────────────────────────────────────────────

const PIN_CONFIG: Record<MarkerType, { bg: string; glyph: string }> = {
  heritage: { bg: '#f97316', glyph: '🏛️' },
  bus_stop: { bg: '#22c55e', glyph: '🚌' },
  hotel: { bg: '#3b82f6', glyph: '🏨' },
  hospital: { bg: '#ef4444', glyph: '🏥' },
  search: { bg: '#a855f7', glyph: '📍' },
  incident: { bg: '#f43f5e', glyph: '🆘' },
};

// ─── API key guard ────────────────────────────────────────────────────────────

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';

function MissingKeyBanner() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-red-950/60 border border-red-500/50 rounded-2xl p-8 text-center">
      <div>
        <div className="text-4xl mb-3">🗺️</div>
        <h3 className="text-red-400 font-bold text-lg mb-2">Google Maps API key missing</h3>
        <p className="text-red-300 text-sm max-w-sm">
          Add <code className="bg-red-900/60 px-1 rounded">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to
          your <code className="bg-red-900/60 px-1 rounded">.env.local</code> file and restart the
          dev server.
        </p>
      </div>
    </div>
  );
}

// ─── Route polyline rendered inside the map context ──────────────────────────

function RoutePolyline({ path }: { path: Array<{ lat: number; lng: number }> }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !path.length) return;
    // Draw using the Maps JS SDK Polyline directly
    const poly = new google.maps.Polyline({
      path,
      geodesic: true,
      strokeColor: '#f97316',
      strokeOpacity: 0.9,
      strokeWeight: 4,
      map,
    });
    return () => poly.setMap(null);
  }, [map, path]);

  return null;
}

// ─── Inner map content (needs to be inside APIProvider) ──────────────────────

function MapContent({
  markers = [],
  center,
  zoom,
  staticPreview,
  route,
  onGetDirections,
}: Omit<TourismMapProps, 'heightClass'>) {
  const [activeMarker, setActiveMarker] = useState<MapMarker | null>(null);

  const defaultCenter = center ?? { lat: 28.6139, lng: 77.209 };
  const defaultZoom = zoom ?? 5;

  return (
    <Map
      defaultCenter={defaultCenter}
      defaultZoom={defaultZoom}
      mapId="india-path-ai-map"
      gestureHandling={staticPreview ? 'none' : 'greedy'}
      disableDefaultUI={staticPreview}
      style={{ width: '100%', height: '100%' }}
    >
      {/* Optimised route polyline */}
      {route && route.polylinePath.length > 0 && (
        <RoutePolyline path={route.polylinePath} />
      )}

      {/* Markers */}
      {markers.map((m) => {
        const cfg = PIN_CONFIG[m.type] ?? PIN_CONFIG.heritage;
        return (
          <AdvancedMarker
            key={m.id}
            position={{ lat: m.lat, lng: m.lng }}
            onClick={() => setActiveMarker(m)}
            title={m.label}
          >
            <Pin
              background={cfg.bg}
              borderColor={cfg.bg}
              glyphColor="#ffffff"
              glyph={cfg.glyph}
              scale={activeMarker?.id === m.id ? 1.3 : 1}
            />
          </AdvancedMarker>
        );
      })}

      {/* InfoWindow for selected marker */}
      {activeMarker && (
        <InfoWindow
          position={{ lat: activeMarker.lat, lng: activeMarker.lng }}
          onCloseClick={() => setActiveMarker(null)}
          headerContent={
            <span className="font-bold text-sm text-stone-900">{activeMarker.label}</span>
          }
        >
          <div className="min-w-[180px] max-w-[240px] p-1">
            {activeMarker.description && (
              <p className="text-stone-600 text-xs mb-3 leading-relaxed">
                {activeMarker.description}
              </p>
            )}
            <div className="flex gap-2">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${activeMarker.lat},${activeMarker.lng}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 text-center px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-500 transition-colors"
              >
                🗺️ Get directions
              </a>
              {onGetDirections && (
                <button
                  onClick={() => {
                    onGetDirections(activeMarker);
                    setActiveMarker(null);
                  }}
                  className="flex-1 px-3 py-1.5 bg-orange-500 text-white text-xs font-semibold rounded-lg hover:bg-orange-400 transition-colors"
                >
                  Add to route
                </button>
              )}
            </div>
          </div>
        </InfoWindow>
      )}
    </Map>
  );
}

// ─── Public component ─────────────────────────────────────────────────────────

export default function TourismMap(props: TourismMapProps) {
  const { heightClass = 'h-[500px]', searchSlot, ...rest } = props;

  if (!API_KEY || API_KEY === 'REPLACE_ME') {
    return (
      <div className={`w-full ${heightClass}`}>
        <MissingKeyBanner />
      </div>
    );
  }

  return (
    // Single <APIProvider> for the entire map area.
    // Always uses NEXT_PUBLIC_GOOGLE_MAPS_API_KEY (Maps JavaScript API key).
    // Any child that calls useMapsLibrary() (e.g. PlacesSearch) must be
    // rendered inside this provider — pass it via the searchSlot prop.
    <APIProvider
      apiKey={API_KEY}
      libraries={['places', 'geocoding']}
      onLoad={() => console.log('[TourismMap] Google Maps SDK loaded with Maps JS API key')}
    >
      {searchSlot}
      <div className={`w-full ${heightClass} rounded-2xl overflow-hidden`}>
        <MapContent {...rest} />
      </div>
    </APIProvider>
  );
}
