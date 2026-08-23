/**
 * app/api/maps/route/route.ts
 *
 * Server-side proxy for the Google Routes API.
 * The GOOGLE_MAPS_API_KEY never reaches the browser.
 *
 * POST /api/maps/route
 * Body: { origin, destinations[], travelMode, optimize }
 */

import { NextRequest, NextResponse } from 'next/server';

export type TravelMode = 'DRIVE' | 'WALK' | 'BICYCLE' | 'TRANSIT' | 'TWO_WHEELER';

interface LatLng { lat: number; lng: number }

interface RouteRequestBody {
  origin: LatLng;
  destinations: LatLng[];
  travelMode?: TravelMode;
  /** If true and destinations > 2, use Route Optimization API first */
  optimize?: boolean;
}

export interface RouteResult {
  polylinePath: LatLng[];
  totalDistanceKm: number;
  totalDurationMin: number;
  estimatedCostINR: number;
  waypointOrder: number[];
  legs: Array<{ from: string; to: string; distanceKm: number; durationMin: number }>;
  travelMode: TravelMode;
}

const COST_PER_MODE: Record<TravelMode, number> = {
  DRIVE: 12,
  TWO_WHEELER: 5,
  TRANSIT: 1.5,
  WALK: 0,
  BICYCLE: 0,
};

/** Decode Google encoded polyline → LatLng[] */
function decodePolyline(encoded: string): LatLng[] {
  const pts: LatLng[] = [];
  let idx = 0, lat = 0, lng = 0;
  while (idx < encoded.length) {
    let b: number, shift = 0, res = 0;
    do { b = encoded.charCodeAt(idx++) - 63; res |= (b & 0x1f) << shift; shift += 5; } while (b >= 0x20);
    lat += res & 1 ? ~(res >> 1) : res >> 1;
    shift = 0; res = 0;
    do { b = encoded.charCodeAt(idx++) - 63; res |= (b & 0x1f) << shift; shift += 5; } while (b >= 0x20);
    lng += res & 1 ? ~(res >> 1) : res >> 1;
    pts.push({ lat: lat / 1e5, lng: lng / 1e5 });
  }
  return pts;
}

function apiError(status: string, msg: string): string {
  // Never include the API key in error messages
  if (status === 'REQUEST_DENIED') return 'Google Maps API: Request denied. Check that the Routes API is enabled for this key and billing is active.';
  if (status === 'OVER_DAILY_LIMIT' || status === 'OVER_QUERY_LIMIT') return 'Google Maps API: Quota exceeded. Check your Google Cloud billing/quota settings.';
  if (status === 'INVALID_REQUEST') return 'Google Maps API: Invalid request parameters.';
  if (status === 'NOT_FOUND') return 'Google Maps API: Route not found between the given locations.';
  return `Google Maps API error: ${status}. ${msg ?? ''}`;
}

export async function POST(req: NextRequest) {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (!key) {
    return NextResponse.json({ error: 'GOOGLE_MAPS_API_KEY is not configured on the server.' }, { status: 500 });
  }

  let body: RouteRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { origin, destinations, travelMode = 'DRIVE', optimize = false } = body;
  if (!origin || !destinations?.length) {
    return NextResponse.json({ error: 'origin and at least one destination are required' }, { status: 400 });
  }

  // ── Determine waypoint order ─────────────────────────────────────────────
  let waypointOrder: number[] = destinations.map((_, i) => i);

  if (optimize && destinations.length > 1) {
    // Use Route Optimization API for 3+ stops (no-op for ≤2 — already optimal)
    try {
      const optimizeRes = await fetch(
        'https://routeoptimization.googleapis.com/v1/projects/-:optimizeTours',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': key },
          body: JSON.stringify({
            model: {
              shipments: destinations.map((dest, i) => ({
                deliveries: [{
                  arrivalLocation: { latLng: { latitude: dest.lat, longitude: dest.lng } },
                }],
                label: `stop-${i}`,
              })),
              vehicles: [{
                startLocation: { latLng: { latitude: origin.lat, longitude: origin.lng } },
                endLocation: { latLng: { latitude: origin.lat, longitude: origin.lng } },
                label: 'vehicle-0',
              }],
            },
          }),
        },
      );

      if (optimizeRes.ok) {
        const optData = await optimizeRes.json();
        const visits: Array<{ shipmentIndex: number }> =
          optData?.routes?.[0]?.visits ?? [];
        if (visits.length === destinations.length) {
          waypointOrder = visits.map((v) => v.shipmentIndex);
        }
      }
      // If optimization fails, fall through with original order
    } catch {
      // Non-fatal — continue with unoptimized order
    }
  }

  // ── Build Routes API request ─────────────────────────────────────────────
  const orderedDests = waypointOrder.map((i) => destinations[i]);
  const allStops = [origin, ...orderedDests];

  const routesBody = {
    origin: { location: { latLng: { latitude: allStops[0].lat, longitude: allStops[0].lng } } },
    destination: {
      location: { latLng: { latitude: allStops[allStops.length - 1].lat, longitude: allStops[allStops.length - 1].lng } },
    },
    intermediates: allStops.slice(1, -1).map((s) => ({
      location: { latLng: { latitude: s.lat, longitude: s.lng } },
    })),
    travelMode,
    routingPreference: travelMode === 'DRIVE' ? 'TRAFFIC_AWARE' : undefined,
    computeAlternativeRoutes: false,
    routeModifiers: { avoidTolls: false, avoidHighways: false, avoidFerries: false },
    languageCode: 'en-US',
    units: 'METRIC',
  };

  let routeRes: Response;
  try {
    routeRes = await fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask':
          'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline,routes.legs',
      },
      body: JSON.stringify(routesBody),
    });
  } catch (e) {
    return NextResponse.json({ error: 'Network error contacting Google Routes API.' }, { status: 502 });
  }

  if (!routeRes.ok) {
    const errBody = await routeRes.json().catch(() => ({}));
    const status = (errBody as { status?: string }).status ?? `HTTP_${routeRes.status}`;
    const msg = (errBody as { message?: string }).message ?? '';
    return NextResponse.json({ error: apiError(status, msg) }, { status: routeRes.status });
  }

  const routeData = await routeRes.json();
  const route = routeData?.routes?.[0];
  if (!route) {
    return NextResponse.json({ error: 'No route found between the given locations.' }, { status: 404 });
  }

  const totalDistanceKm = +((route.distanceMeters ?? 0) / 1000).toFixed(2);
  const totalDurationMin = Math.round(parseInt(route.duration ?? '0') / 60);
  const estimatedCostINR = Math.round(totalDistanceKm * (COST_PER_MODE[travelMode] ?? 0));
  const polylinePath = decodePolyline(route.polyline?.encodedPolyline ?? '');

  const legs: RouteResult['legs'] = (route.legs ?? []).map(
    (leg: { distanceMeters?: number; duration?: string; startLocation?: { latLng?: { latitude?: number; longitude?: number } }; endLocation?: { latLng?: { latitude?: number; longitude?: number } } }) => ({
      from: `${leg.startLocation?.latLng?.latitude?.toFixed(4) ?? '?'}, ${leg.startLocation?.latLng?.longitude?.toFixed(4) ?? '?'}`,
      to: `${leg.endLocation?.latLng?.latitude?.toFixed(4) ?? '?'}, ${leg.endLocation?.latLng?.longitude?.toFixed(4) ?? '?'}`,
      distanceKm: +((leg.distanceMeters ?? 0) / 1000).toFixed(2),
      durationMin: Math.round(parseInt(leg.duration ?? '0') / 60),
    }),
  );

  const result: RouteResult = {
    polylinePath,
    totalDistanceKm,
    totalDurationMin,
    estimatedCostINR,
    waypointOrder,
    legs,
    travelMode,
  };

  return NextResponse.json(result);
}
