# Google Maps Integration Plan for India Path AI

## Summary
Replacing the existing Leaflet/OSM map with Google Maps using `@vis.gl/react-google-maps` — the official Google-maintained React wrapper. This covers 9 steps across environment setup, core map component, autocomplete, directions/routing, nearby bus stops, complaint location capture, and SOS geocoding.

## Files to create / modify

### NEW files
| File | Purpose |
|---|---|
| `components/TourismMap.tsx` | Core map component with APIProvider, markers, InfoWindow |
| `components/PlacesSearch.tsx` | Places Autocomplete search bar |
| `lib/directions.ts` | Optimized route calculation, polyline, cost estimate |
| `lib/geocoding.ts` | Reverse geocoding for SOS |
| `lib/nearbyBusStops.ts` | Places nearbySearch for bus_station |

### MODIFIED files
| File | Change |
|---|---|
| `.env.local` | Add `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` |
| `.gitignore` | Already ignores `.env*` — no change needed |
| `app/explore/page.tsx` | Replace Leaflet MapClient with TourismMap + PlacesSearch |
| `app/sos/page.tsx` | Add reverse geocoding on SOS trigger |
| `app/complaint/page.tsx` | Add location preview map |
| `components/MapClient.tsx` | Keep for reference but stop using it in explore |
| `app/globals.css` | Remove Leaflet-specific CSS |

## Steps
1. Update `.env.local` with API key placeholder  
2. Install `@vis.gl/react-google-maps`  
3. Create `TourismMap.tsx`  
4. Create `PlacesSearch.tsx`  
5. Create `lib/directions.ts`  
6. Create `lib/geocoding.ts` + `lib/nearbyBusStops.ts`  
7. Update `app/explore/page.tsx`  
8. Update `app/complaint/page.tsx`  
9. Update `app/sos/page.tsx`  
10. Clean up globals.css  
