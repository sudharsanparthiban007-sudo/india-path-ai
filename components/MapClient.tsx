'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface POI {
  id: number;
  name: string;
  category: string;
  city: string;
  lat: number;
  lng: number;
  description: string;
  transitInfo: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  heritage: '#f97316',
  temple: '#a855f7',
  beach: '#06b6d4',
  transit: '#22c55e',
  nature: '#84cc16',
};

interface Props {
  pois: POI[];
  onSelect: (poi: POI) => void;
  selected: POI | null;
}

export default function MapClient({ pois, onSelect, selected }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  // Initialize map once
  useEffect(() => {
    if (!containerRef.current) return;
    if (mapRef.current) return;

    const container = containerRef.current;
    // Prevent duplicate initialization in React StrictMode
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((container as any)._leaflet_id) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (container as any)._leaflet_id = null;
    }

    const map = L.map(container, {
      center: [10.8505, 78.65],
      zoom: 7,
      zoomControl: true,
      scrollWheelZoom: true,
    });

    // Dark Matter / OpenStreetMap tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank" rel="noreferrer">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    const markersGroup = L.layerGroup().addTo(map);
    markersLayerRef.current = markersGroup;
    mapRef.current = map;

    // Trigger map resize check
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      clearTimeout(timer);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markersLayerRef.current = null;
      }
    };
  }, []);

  // Update markers whenever pois or selected item changes
  useEffect(() => {
    const map = mapRef.current;
    const markersGroup = markersLayerRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    pois.forEach((poi) => {
      const isSelected = selected?.id === poi.id;
      const color = CATEGORY_COLORS[poi.category] || '#f97316';

      const circle = L.circleMarker([poi.lat, poi.lng], {
        radius: isSelected ? 12 : 8,
        fillColor: color,
        color: isSelected ? '#ffffff' : color,
        weight: isSelected ? 3 : 1.5,
        opacity: 1,
        fillOpacity: 0.9,
      });

      circle.bindTooltip(
        `<div style="font-weight:bold; font-size:12px; color:#0f172a;">${poi.name}</div><div style="font-size:11px; color:#64748b;">${poi.city} · ${poi.category}</div>`,
        { permanent: false, direction: 'top' }
      );

      circle.on('click', () => {
        onSelect(poi);
      });

      circle.addTo(markersGroup);
    });

    map.invalidateSize();
  }, [pois, selected, onSelect]);

  // Pan to selected POI when changed
  useEffect(() => {
    if (!mapRef.current || !selected) return;
    mapRef.current.flyTo([selected.lat, selected.lng], 11, {
      duration: 1.0,
    });
  }, [selected]);

  return <div ref={containerRef} id="leaflet-map" className="w-full h-full min-h-[500px] rounded-2xl" />;
}
