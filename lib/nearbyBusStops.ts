/**
 * lib/nearbyBusStops.ts
 *
 * Client-side helper that calls our server-side /api/maps/nearby proxy.
 * GOOGLE_MAPS_API_KEY never reaches the browser — all Places REST calls
 * happen in app/api/maps/nearby/route.ts.
 */

import type { MapMarker } from '@/components/TourismMap';

export interface NearbySearchOptions {
  lat: number;
  lng: number;
  radiusMetres?: number;
  maxResults?: number;
}

export async function getNearbyBusStops(
  options: NearbySearchOptions,
): Promise<MapMarker[]> {
  const { lat, lng, radiusMetres = 2000, maxResults = 10 } = options;

  const params = new URLSearchParams({
    lat: String(lat),
    lng: String(lng),
    radius: String(radiusMetres),
    maxResults: String(maxResults),
  });

  const res = await fetch(`/api/maps/nearby?${params}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error ?? `Nearby search error (HTTP ${res.status})`);
  }

  return (data.places ?? []).map(
    (p: { id: string; name: string; lat: number; lng: number; address: string }) => ({
      id: p.id,
      lat: p.lat,
      lng: p.lng,
      label: p.name,
      type: 'bus_stop' as const,
      description: p.address || undefined,
    }),
  );
}
