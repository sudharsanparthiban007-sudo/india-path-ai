/**
 * app/api/maps/geocode/route.ts
 *
 * Server-side Geocoding API proxy (reverse + forward geocoding).
 * GOOGLE_MAPS_API_KEY stays on the server — never sent to the browser.
 *
 * GET  /api/maps/geocode?lat=28.61&lng=77.20        → reverse geocode
 * GET  /api/maps/geocode?address=Taj+Mahal+Agra     → forward geocode
 */

import { NextRequest, NextResponse } from 'next/server';

export interface GeocodeResult {
  formattedAddress: string;
  lat: number;
  lng: number;
  locality: string;
  state: string;
  pincode: string;
  country: string;
}

function extract(
  components: Array<{ types: string[]; long_name: string }>,
  type: string,
): string {
  return components.find((c) => c.types.includes(type))?.long_name ?? '';
}

function safeError(status: string): string {
  if (status === 'REQUEST_DENIED') return 'Geocoding API: Request denied. Ensure the Geocoding API is enabled and billing is active.';
  if (status === 'OVER_QUERY_LIMIT') return 'Geocoding API: Quota exceeded.';
  if (status === 'ZERO_RESULTS') return 'Geocoding API: No results found for the given location.';
  if (status === 'INVALID_REQUEST') return 'Geocoding API: Invalid request.';
  return `Geocoding API error: ${status}`;
}

export async function GET(req: NextRequest) {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (!key) {
    return NextResponse.json({ error: 'GOOGLE_MAPS_API_KEY is not configured on the server.' }, { status: 500 });
  }

  const { searchParams } = req.nextUrl;
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const address = searchParams.get('address');

  if (!lat && !lng && !address) {
    return NextResponse.json({ error: 'Provide either lat+lng (reverse) or address (forward) parameters.' }, { status: 400 });
  }

  let geocodeUrl: string;
  if (lat && lng) {
    geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`;
  } else {
    geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address!)}&key=${key}`;
  }

  let res: Response;
  try {
    res = await fetch(geocodeUrl);
  } catch {
    return NextResponse.json({ error: 'Network error contacting Google Geocoding API.' }, { status: 502 });
  }

  if (!res.ok) {
    return NextResponse.json({ error: `Geocoding API HTTP error: ${res.status}` }, { status: res.status });
  }

  const data = await res.json();

  if (data.status !== 'OK' || !data.results?.length) {
    return NextResponse.json({ error: safeError(data.status) }, { status: 422 });
  }

  const first = data.results[0];
  const comps = first.address_components;

  const result: GeocodeResult = {
    formattedAddress: first.formatted_address,
    lat: first.geometry.location.lat,
    lng: first.geometry.location.lng,
    locality: extract(comps, 'locality') || extract(comps, 'administrative_area_level_2'),
    state: extract(comps, 'administrative_area_level_1'),
    pincode: extract(comps, 'postal_code'),
    country: extract(comps, 'country'),
  };

  return NextResponse.json(result);
}
