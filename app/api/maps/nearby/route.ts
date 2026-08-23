/**
 * app/api/maps/nearby/route.ts
 *
 * Server-side proxy for Places API (New) - Nearby Search.
 * GOOGLE_MAPS_API_KEY stays on the server.
 *
 * GET /api/maps/nearby?lat=28.61&lng=77.20&radius=2000&maxResults=10
 */

import { NextRequest, NextResponse } from 'next/server';

export interface NearbyPlace {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
  type: 'bus_stop';
}

export async function GET(req: NextRequest) {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (!key) {
    return NextResponse.json({ error: 'GOOGLE_MAPS_API_KEY is not configured on the server.' }, { status: 500 });
  }

  const { searchParams } = req.nextUrl;
  const lat = parseFloat(searchParams.get('lat') ?? '');
  const lng = parseFloat(searchParams.get('lng') ?? '');
  const radius = parseInt(searchParams.get('radius') ?? '2000', 10);
  const maxResults = Math.min(parseInt(searchParams.get('maxResults') ?? '10', 10), 20);

  if (isNaN(lat) || isNaN(lng)) {
    return NextResponse.json({ error: 'lat and lng are required numeric parameters.' }, { status: 400 });
  }

  let res: Response;
  try {
    res = await fetch('https://places.googleapis.com/v1/places:searchNearby', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.location,places.formattedAddress',
      },
      body: JSON.stringify({
        includedTypes: ['bus_station', 'transit_station'],
        maxResultCount: maxResults,
        locationRestriction: {
          circle: {
            center: { latitude: lat, longitude: lng },
            radius,
          },
        },
      }),
    });
  } catch {
    return NextResponse.json({ error: 'Network error contacting Google Places API.' }, { status: 502 });
  }

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    const status = (errBody as { status?: string }).status ?? `HTTP_${res.status}`;
    if (status === 'REQUEST_DENIED' || res.status === 403) {
      return NextResponse.json({ error: 'Places API: Request denied. Ensure the Places API (New) is enabled and billing is active.' }, { status: 403 });
    }
    return NextResponse.json({ error: `Places API error: ${status}` }, { status: res.status });
  }

  const data = await res.json();
  const places: NearbyPlace[] = (data.places ?? []).map(
    (p: { name?: string; id?: string; displayName?: { text?: string }; location?: { latitude?: number; longitude?: number }; formattedAddress?: string }, idx: number) => ({
      id: p.name ?? `bus-${idx}`,
      name: p.displayName?.text ?? 'Bus Stop',
      lat: p.location?.latitude ?? lat,
      lng: p.location?.longitude ?? lng,
      address: p.formattedAddress ?? '',
      type: 'bus_stop' as const,
    }),
  );

  return NextResponse.json({ places });
}
