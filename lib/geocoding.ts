/**
 * lib/geocoding.ts
 *
 * Client-side helper that calls our server-side /api/maps/geocode proxy.
 * GOOGLE_MAPS_API_KEY never touches the browser — all Geocoding REST calls
 * happen in app/api/maps/geocode/route.ts.
 */

export interface ReverseGeocodeResult {
  formattedAddress: string;
  lat: number;
  lng: number;
  locality: string;
  state: string;
  pincode: string;
  country: string;
}

/**
 * reverseGeocode
 * Calls our server route to convert {lat, lng} → structured address.
 */
export async function reverseGeocode(
  lat: number,
  lng: number,
): Promise<ReverseGeocodeResult> {
  const res = await fetch(`/api/maps/geocode?lat=${lat}&lng=${lng}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? `Geocoding error (HTTP ${res.status})`);
  return data as ReverseGeocodeResult;
}

/**
 * forwardGeocode
 * Calls our server route to convert an address string → {lat, lng}.
 */
export async function forwardGeocode(
  address: string,
): Promise<ReverseGeocodeResult> {
  const res = await fetch(`/api/maps/geocode?address=${encodeURIComponent(address)}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? `Geocoding error (HTTP ${res.status})`);
  return data as ReverseGeocodeResult;
}
