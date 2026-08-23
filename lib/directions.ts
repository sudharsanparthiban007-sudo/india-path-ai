/**
 * lib/directions.ts
 *
 * Client-side helper that calls our server-side /api/maps/route proxy.
 * GOOGLE_MAPS_API_KEY never touches the browser — all Google REST calls
 * happen in app/api/maps/route/route.ts.
 */

export type TravelMode = 'DRIVE' | 'WALK' | 'BICYCLE' | 'TRANSIT' | 'TWO_WHEELER';

export interface LatLng {
  lat: number;
  lng: number;
}

export interface RouteResult {
  /** Decoded polyline path ready for the map */
  polylinePath: LatLng[];
  /** Total distance in kilometres */
  totalDistanceKm: number;
  /** Total travel time in minutes */
  totalDurationMin: number;
  /** Estimated cost in INR */
  estimatedCostINR: number;
  /** Waypoints reordered (after Route Optimization, if applied) */
  waypointOrder: number[];
  /** Per-leg summary */
  legs: Array<{ from: string; to: string; distanceKm: number; durationMin: number }>;
  travelMode: TravelMode;
}

/**
 * getOptimizedRoute
 * -----------------
 * Sends origin + destinations to our /api/maps/route server route which:
 *   1. Optionally calls Route Optimization API (3+ stops)
 *   2. Calls Routes API to compute the final route + polyline
 *
 * @param origin       Starting LatLng
 * @param destinations Array of stops (last one is the final destination)
 * @param mode         Travel mode (defaults to DRIVE)
 * @param optimize     If true, allow Route Optimization for multi-stop routes
 */
export async function getOptimizedRoute(
  origin: LatLng,
  destinations: LatLng[],
  mode: TravelMode = 'DRIVE',
  optimize = true,
): Promise<RouteResult> {
  if (destinations.length === 0) {
    throw new Error('At least one destination is required.');
  }

  const res = await fetch('/api/maps/route', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ origin, destinations, travelMode: mode, optimize }),
  });

  const data = await res.json();

  if (!res.ok) {
    // data.error is already a sanitised message from the server — no key leakage
    throw new Error(data.error ?? `Route API error (HTTP ${res.status})`);
  }

  return data as RouteResult;
}
