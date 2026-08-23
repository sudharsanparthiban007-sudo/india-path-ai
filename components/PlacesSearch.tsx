'use client';

import { useState, useCallback, useRef } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';

// ─── NOTE ─────────────────────────────────────────────────────────────────────
// This component must be rendered inside TourismMap's <APIProvider> via the
// searchSlot prop. Never wrap it in its own <APIProvider> — that would load
// the Maps JS SDK with the wrong key and cause ApiTargetBlockedMapError.
//
// Uses the NEW Places API (AutocompleteSuggestion + Place) required for
// keys created after March 2025. Legacy AutocompleteService is not available
// to new customers.
// ─────────────────────────────────────────────────────────────────────────────

interface PlaceResult {
  placeId: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
}

interface PlacesSearchProps {
  onPlaceSelect: (place: PlaceResult) => void;
  placeholder?: string;
  className?: string;
}

// ─── Inner autocomplete (must live inside APIProvider) ────────────────────────

function AutocompleteInner({ onPlaceSelect, placeholder, className }: PlacesSearchProps) {
  const placesLib = useMapsLibrary('places');
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<
    google.maps.places.AutocompleteSuggestion[]
  >([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // Session token reduces billing by grouping autocomplete + detail calls
  const sessionToken = useRef<google.maps.places.AutocompleteSessionToken | null>(null);

  // Ensure we have a session token once the library is loaded
  if (placesLib && !sessionToken.current) {
    sessionToken.current = new placesLib.AutocompleteSessionToken();
  }

  const fetchSuggestions = useCallback(
    async (value: string) => {
      if (!placesLib || value.length < 2) {
        setSuggestions([]);
        return;
      }
      setLoading(true);
      try {
        const { suggestions: preds } =
          await google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions({
            input: value,
            sessionToken: sessionToken.current ?? undefined,
            includedRegionCodes: ['in'], // India only
          });
        setSuggestions(preds ?? []);
        setIsOpen((preds ?? []).length > 0);
      } catch (err) {
        console.error('[PlacesSearch] AutocompleteSuggestion error:', err);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    },
    [placesLib],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    fetchSuggestions(e.target.value);
  };

  const handleSelect = async (
    suggestion: google.maps.places.AutocompleteSuggestion,
  ) => {
    if (!suggestion.placePrediction) return;

    const prediction = suggestion.placePrediction;
    setQuery(prediction.text.toString());
    setIsOpen(false);
    setSuggestions([]);

    try {
      // Fetch full place details using the new Place class
      const place = prediction.toPlace();
      await place.fetchFields({
        fields: ['displayName', 'formattedAddress', 'location'],
      });

      if (!place.location) return;

      onPlaceSelect({
        placeId: place.id ?? prediction.placeId,
        name: place.displayName ?? prediction.text.toString(),
        lat: place.location.lat(),
        lng: place.location.lng(),
        address: place.formattedAddress ?? prediction.text.toString(),
      });

      // Rotate session token after a completed selection
      sessionToken.current = new google.maps.places.AutocompleteSessionToken();
    } catch (err) {
      console.error('[PlacesSearch] Place.fetchFields error:', err);
    }
  };

  return (
    <div className={`relative ${className ?? ''}`}>
      <div className="relative flex items-center">
        <span className="absolute left-3 text-stone-400 pointer-events-none">🔍</span>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => suggestions.length > 0 && setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 150)}
          placeholder={placeholder ?? 'Search for a place in India…'}
          className="w-full pl-9 pr-4 py-3 rounded-xl bg-stone-900/80 backdrop-blur border border-white/20 text-white placeholder-stone-400 text-sm outline-none focus:ring-2 focus:ring-orange-400/60 transition-all"
        />
        {loading && (
          <span className="absolute right-3 text-stone-400 text-xs animate-pulse">…</span>
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-50 top-full mt-1 w-full bg-stone-900/95 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
          {suggestions.map((s, idx) => {
            const pred = s.placePrediction;
            if (!pred) return null;
            const main = pred.mainText?.toString() ?? pred.text.toString();
            const secondary = pred.secondaryText?.toString() ?? '';
            return (
              <li
                key={pred.placeId ?? idx}
                onMouseDown={() => handleSelect(s)}
                className="px-4 py-2.5 text-sm text-stone-200 hover:bg-orange-500/20 cursor-pointer border-b border-white/5 last:border-0 transition-colors"
              >
                <span className="font-medium">{main}</span>
                {secondary && (
                  <span className="text-stone-400 text-xs ml-2">{secondary}</span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

// ─── Public component ─────────────────────────────────────────────────────────
// Must be rendered inside a page-level <APIProvider apiKey={NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>.
// Do NOT wrap this in its own <APIProvider> — that would load the SDK with the
// wrong key and trigger ApiTargetBlockedMapError.

export default function PlacesSearch(props: PlacesSearchProps) {
  return <AutocompleteInner {...props} />;
}
