/**
 * app/api/maps/transit/route.ts
 *
 * Real transit directions between an origin (GPS or city hub) and a POI.
 * Reads GOOGLE_MAPS_API_KEY on the server.
 * Returns real transit steps and timing if available, or signals fallback.
 */

import { NextRequest, NextResponse } from 'next/server';

interface LatLng {
  lat: number;
  lng: number;
}

export async function POST(req: NextRequest) {
  try {
    const key = process.env.GOOGLE_MAPS_API_KEY;
    if (!key) {
      return NextResponse.json({
        hasRealDirections: false,
        error: 'GOOGLE_MAPS_API_KEY is not configured',
      });
    }

    const body = await req.json();
    const { origin, destination } = body as {
      origin: LatLng | string;
      destination: LatLng;
    };

    if (!origin || !destination) {
      return NextResponse.json(
        { error: 'Origin and destination are required' },
        { status: 400 }
      );
    }

    const originParam =
      typeof origin === 'string'
        ? encodeURIComponent(origin)
        : `${origin.lat},${origin.lng}`;
    const destParam = `${destination.lat},${destination.lng}`;

    // Try Google Maps Directions API with TRANSIT mode
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${originParam}&destination=${destParam}&mode=transit&key=${key}`;

    const res = await fetch(url);
    if (!res.ok) {
      return NextResponse.json({
        hasRealDirections: false,
        error: `Directions API responded with status ${res.status}`,
      });
    }

    const data = await res.json();

    if (data.status !== 'OK' || !data.routes?.length) {
      // If pure transit isn't available, try driving/general route as backup
      const drivingUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${originParam}&destination=${destParam}&mode=driving&key=${key}`;
      const drivingRes = await fetch(drivingUrl);
      const drivingData = await drivingRes.json();

      if (drivingData.status === 'OK' && drivingData.routes?.length) {
        const route = drivingData.routes[0];
        const leg = route.legs?.[0];
        const steps = (leg?.steps || []).map((s: { html_instructions: string }) =>
          s.html_instructions.replace(/<[^>]*>?/gm, '')
        );

        return NextResponse.json({
          hasRealDirections: true,
          mode: 'driving_fallback',
          summary: route.summary || 'Road Route',
          distance: leg?.distance?.text || '',
          duration: leg?.duration?.text || '',
          steps: steps.slice(0, 5),
        });
      }

      return NextResponse.json({
        hasRealDirections: false,
        apiStatus: data.status,
      });
    }

    const route = data.routes[0];
    const leg = route.legs?.[0];

    const steps = (leg?.steps || []).map((s: {
      travel_mode: string;
      html_instructions: string;
      transit_details?: {
        line?: { name?: string; short_name?: string; vehicle?: { name?: string } };
        departure_stop?: { name?: string };
        arrival_stop?: { name?: string };
        num_stops?: number;
      };
    }) => {
      if (s.transit_details) {
        const td = s.transit_details;
        const lineName = td.line?.short_name || td.line?.name || 'Transit';
        const vehicle = td.line?.vehicle?.name || 'Bus/Train';
        return `Take ${vehicle} ${lineName} from ${td.departure_stop?.name ?? 'stop'} to ${td.arrival_stop?.name ?? 'destination'} (${td.num_stops ?? 1} stops)`;
      }
      return s.html_instructions ? s.html_instructions.replace(/<[^>]*>?/gm, '') : 'Proceed to destination';
    });

    return NextResponse.json({
      hasRealDirections: true,
      mode: 'transit',
      summary: route.summary || leg?.duration?.text || 'Transit',
      distance: leg?.distance?.text || '',
      duration: leg?.duration?.text || '',
      departureTime: leg?.departure_time?.text,
      arrivalTime: leg?.arrival_time?.text,
      steps,
    });
  } catch (error) {
    console.error('Transit directions error:', error);
    return NextResponse.json({
      hasRealDirections: false,
      error: 'Failed to fetch live directions',
    });
  }
}
