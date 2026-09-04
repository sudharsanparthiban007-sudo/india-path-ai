(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/explore/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ExplorePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$LangContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/LangContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$directions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/directions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nearbyBusStops$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/nearbyBusStops.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BookingModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/BookingModal.tsx [app-client] (ecmascript)");
;
;
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
// Dynamic imports (client-only components that use the Maps SDK)
const TourismMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/components/TourismMap.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
    loadableGenerated: {
        modules: [
            "[project]/components/TourismMap.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false,
    loading: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full h-full flex items-center justify-center bg-stone-900 rounded-2xl",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-stone-400 animate-pulse",
                children: "Loading map…"
            }, void 0, false, {
                fileName: "[project]/app/explore/page.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/explore/page.tsx",
            lineNumber: 15,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
});
_c = TourismMap;
const PlacesSearch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(_c1 = ()=>__turbopack_context__.A("[project]/components/PlacesSearch.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
    loadableGenerated: {
        modules: [
            "[project]/components/PlacesSearch.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c2 = PlacesSearch;
const CATEGORIES = [
    'all',
    'heritage',
    'temple',
    'beach',
    'transit',
    'nature'
];
const CATEGORY_ICONS = {
    heritage: '🏛️',
    temple: '⛩️',
    beach: '🏖️',
    transit: '🚉',
    nature: '🌿',
    all: '🗺️'
};
// Map POI category → TourismMap MarkerType
const CATEGORY_TO_MARKER_TYPE = {
    heritage: 'heritage',
    temple: 'heritage',
    beach: 'hotel',
    transit: 'bus_stop',
    nature: 'heritage'
};
function ExplorePage() {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$LangContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const [pois, setPois] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [filter, setFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Route / directions state
    const [routeMarkers, setRouteMarkers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [route, setRoute] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [routeLoading, setRouteLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [routeError, setRouteError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [travelMode, setTravelMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('DRIVE');
    const [wasOptimized, setWasOptimized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Search result marker
    const [searchMarker, setSearchMarker] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [mapCenter, setMapCenter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    // Bus stops
    const [busStops, setBusStops] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [busLoading, setBusLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Booking modal
    const [bookingPoi, setBookingPoi] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Real transit directions state
    const [transitOrigin, setTransitOrigin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Chennai Central');
    const [transitData, setTransitData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [transitLoading, setTransitLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ExplorePage.useEffect": ()=>{
            fetch('/api/pois').then({
                "ExplorePage.useEffect": (r)=>r.json()
            }["ExplorePage.useEffect"]).then({
                "ExplorePage.useEffect": (d)=>setPois(d.pois || [])
            }["ExplorePage.useEffect"]).catch({
                "ExplorePage.useEffect": ()=>{}
            }["ExplorePage.useEffect"]);
        }
    }["ExplorePage.useEffect"], []);
    const filtered = filter === 'all' ? pois : pois.filter((p)=>p.category === filter);
    // Convert POIs to TourismMap markers
    const poiMarkers = filtered.map((p)=>({
            id: p.id,
            lat: p.lat,
            lng: p.lng,
            label: p.name,
            type: CATEGORY_TO_MARKER_TYPE[p.category] ?? 'heritage',
            description: p.description
        }));
    // All markers merged
    const allMarkers = [
        ...poiMarkers,
        ...searchMarker ? [
            searchMarker
        ] : [],
        ...busStops,
        ...routeMarkers
    ];
    // Handle place selected from autocomplete
    const handlePlaceSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ExplorePage.useCallback[handlePlaceSelect]": (place)=>{
            const m = {
                id: `search-${place.placeId}`,
                lat: place.lat,
                lng: place.lng,
                label: place.name,
                type: 'search',
                description: place.address
            };
            setSearchMarker(m);
            setMapCenter({
                lat: place.lat,
                lng: place.lng
            });
        }
    }["ExplorePage.useCallback[handlePlaceSelect]"], []);
    // Add a POI to the route
    const addToRoute = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ExplorePage.useCallback[addToRoute]": (marker)=>{
            setRouteMarkers({
                "ExplorePage.useCallback[addToRoute]": (prev)=>{
                    if (prev.find({
                        "ExplorePage.useCallback[addToRoute]": (m)=>m.id === marker.id
                    }["ExplorePage.useCallback[addToRoute]"])) return prev;
                    return [
                        ...prev,
                        marker
                    ];
                }
            }["ExplorePage.useCallback[addToRoute]"]);
        }
    }["ExplorePage.useCallback[addToRoute]"], []);
    // Compute optimised route
    const computeRoute = async ()=>{
        if (routeMarkers.length < 2) {
            setRouteError('Add at least 2 stops to the route.');
            return;
        }
        setRouteError('');
        setRouteLoading(true);
        setWasOptimized(false);
        try {
            const [origin, ...destinations] = routeMarkers;
            const optimize = destinations.length >= 2;
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$directions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOptimizedRoute"])({
                lat: origin.lat,
                lng: origin.lng
            }, destinations.map((m)=>({
                    lat: m.lat,
                    lng: m.lng
                })), travelMode, optimize);
            setRoute(result);
            setWasOptimized(optimize && result.waypointOrder.length > 0);
        } catch (e) {
            setRouteError(e.message);
        } finally{
            setRouteLoading(false);
        }
    };
    // Find nearby bus stops
    const findBusStops = ()=>{
        const ref = searchMarker ?? (selected ? {
            lat: selected.lat,
            lng: selected.lng
        } : null);
        if (!ref && !navigator.geolocation) {
            alert('Select a location first or allow location access.');
            return;
        }
        setBusLoading(true);
        const doSearch = async (lat, lng)=>{
            try {
                const stops = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nearbyBusStops$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNearbyBusStops"])({
                    lat,
                    lng,
                    radiusMetres: 2000
                });
                setBusStops(stops);
            } catch (e) {
                console.error(e);
            } finally{
                setBusLoading(false);
            }
        };
        if (ref) {
            doSearch(ref.lat, ref.lng);
        } else {
            navigator.geolocation.getCurrentPosition((pos)=>doSearch(pos.coords.latitude, pos.coords.longitude), ()=>setBusLoading(false));
        }
    };
    // Fetch real transit directions
    const fetchTransitDirections = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ExplorePage.useCallback[fetchTransitDirections]": async (poi, customOrigin)=>{
            setTransitLoading(true);
            const origin = customOrigin || transitOrigin;
            try {
                const res = await fetch('/api/maps/transit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        origin,
                        destination: {
                            lat: poi.lat,
                            lng: poi.lng
                        }
                    })
                });
                const data = await res.json();
                setTransitData(data);
            } catch  {
                setTransitData({
                    hasRealDirections: false
                });
            } finally{
                setTransitLoading(false);
            }
        }
    }["ExplorePage.useCallback[fetchTransitDirections]"], [
        transitOrigin
    ]);
    // When selected POI changes, fetch real transit directions automatically
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ExplorePage.useEffect": ()=>{
            if (selected) {
                fetchTransitDirections(selected);
            } else {
                setTransitData(null);
            }
        }
    }["ExplorePage.useEffect"], [
        selected,
        fetchTransitDirections
    ]);
    // Use GPS location as transit origin
    const useGPSForTransit = ()=>{
        if (!navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition((pos)=>{
            const coordStr = `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`;
            setTransitOrigin(coordStr);
            if (selected) {
                fetchTransitDirections(selected, coordStr);
            }
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-7xl mx-auto px-4 py-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-3xl font-bold gradient-text mb-4",
                children: t('explore_title')
            }, void 0, false, {
                fileName: "[project]/app/explore/page.tsx",
                lineNumber: 252,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-2 mb-6",
                children: CATEGORIES.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        id: `filter-${cat}`,
                        onClick: ()=>setFilter(cat),
                        className: `flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all ${filter === cat ? 'bg-orange-500 border-orange-500 text-white' : 'border-stone-700 text-stone-400 hover:border-orange-500/50 hover:text-white'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: CATEGORY_ICONS[cat]
                            }, void 0, false, {
                                fileName: "[project]/app/explore/page.tsx",
                                lineNumber: 267,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "capitalize",
                                children: t(`explore_filter_${cat}`)
                            }, void 0, false, {
                                fileName: "[project]/app/explore/page.tsx",
                                lineNumber: 268,
                                columnNumber: 13
                            }, this)
                        ]
                    }, cat, true, {
                        fileName: "[project]/app/explore/page.tsx",
                        lineNumber: 257,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/explore/page.tsx",
                lineNumber: 255,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-2 space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-[520px] glass rounded-2xl overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TourismMap, {
                                    markers: allMarkers,
                                    center: mapCenter,
                                    route: route,
                                    heightClass: "h-[520px]",
                                    onGetDirections: addToRoute,
                                    searchSlot: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative z-20 p-3 pb-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlacesSearch, {
                                            onPlaceSelect: handlePlaceSelect,
                                            placeholder: "Search any place in India…"
                                        }, void 0, false, {
                                            fileName: "[project]/app/explore/page.tsx",
                                            lineNumber: 286,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/explore/page.tsx",
                                        lineNumber: 285,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/explore/page.tsx",
                                    lineNumber: 278,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/explore/page.tsx",
                                lineNumber: 277,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass rounded-2xl p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between mb-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-white font-semibold flex items-center gap-2",
                                                children: [
                                                    "🗺️ Route Planner",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-stone-500 font-normal",
                                                        children: '(click "Add to route" on any marker)'
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/explore/page.tsx",
                                                        lineNumber: 300,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/explore/page.tsx",
                                                lineNumber: 298,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        id: "find-bus-stops-btn",
                                                        onClick: findBusStops,
                                                        disabled: busLoading,
                                                        className: "px-3 py-1.5 rounded-lg text-xs text-stone-300 glass border border-white/10 hover:bg-white/10 transition-all disabled:opacity-50",
                                                        children: busLoading ? '🔄 Searching…' : '🚌 Nearby bus stops'
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/explore/page.tsx",
                                                        lineNumber: 305,
                                                        columnNumber: 17
                                                    }, this),
                                                    routeMarkers.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        id: "clear-route-btn",
                                                        onClick: ()=>{
                                                            setRouteMarkers([]);
                                                            setRoute(null);
                                                            setRouteError('');
                                                        },
                                                        className: "px-3 py-1.5 rounded-lg text-xs text-stone-400 glass border border-white/10 hover:bg-white/10 transition-all",
                                                        children: "✕ Clear"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/explore/page.tsx",
                                                        lineNumber: 314,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/explore/page.tsx",
                                                lineNumber: 304,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/explore/page.tsx",
                                        lineNumber: 297,
                                        columnNumber: 13
                                    }, this),
                                    routeMarkers.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-stone-500 text-sm",
                                        children: 'Click a marker on the map → "Add to route" to build a multi-stop itinerary.'
                                    }, void 0, false, {
                                        fileName: "[project]/app/explore/page.tsx",
                                        lineNumber: 326,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-1.5 mb-3",
                                                children: [
                                                    'DRIVE',
                                                    'TWO_WHEELER',
                                                    'TRANSIT',
                                                    'WALK'
                                                ].map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setTravelMode(m),
                                                        className: `flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${travelMode === m ? 'bg-orange-500 text-white' : 'bg-white/5 text-stone-400 hover:bg-white/10'}`,
                                                        children: m === 'DRIVE' ? '🚗' : m === 'TWO_WHEELER' ? '🛵' : m === 'TRANSIT' ? '🚌' : '🚶'
                                                    }, m, false, {
                                                        fileName: "[project]/app/explore/page.tsx",
                                                        lineNumber: 334,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/explore/page.tsx",
                                                lineNumber: 332,
                                                columnNumber: 17
                                            }, this),
                                            routeMarkers.map((m, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 text-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold flex-shrink-0",
                                                            children: i + 1
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/explore/page.tsx",
                                                            lineNumber: 350,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-stone-300 truncate",
                                                            children: m.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/explore/page.tsx",
                                                            lineNumber: 353,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setRouteMarkers((prev)=>prev.filter((x)=>x.id !== m.id)),
                                                            className: "ml-auto text-stone-600 hover:text-stone-300 text-xs",
                                                            children: "✕"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/explore/page.tsx",
                                                            lineNumber: 354,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, m.id, true, {
                                                    fileName: "[project]/app/explore/page.tsx",
                                                    lineNumber: 349,
                                                    columnNumber: 19
                                                }, this)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                id: "compute-route-btn",
                                                onClick: computeRoute,
                                                disabled: routeLoading || routeMarkers.length < 2,
                                                className: "mt-3 w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-semibold disabled:opacity-50 hover:from-orange-400 hover:to-amber-400 transition-all",
                                                children: routeLoading ? '⏳ Calculating…' : routeMarkers.length >= 3 ? '✨ Optimise Route' : '🗺️ Get Route'
                                            }, void 0, false, {
                                                fileName: "[project]/app/explore/page.tsx",
                                                lineNumber: 363,
                                                columnNumber: 17
                                            }, this),
                                            routeError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-red-400 text-xs mt-1",
                                                children: routeError
                                            }, void 0, false, {
                                                fileName: "[project]/app/explore/page.tsx",
                                                lineNumber: 377,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/explore/page.tsx",
                                        lineNumber: 330,
                                        columnNumber: 15
                                    }, this),
                                    route && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 space-y-3",
                                        children: [
                                            wasOptimized && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 p-2 bg-green-500/10 border border-green-500/20 rounded-lg",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-green-400 text-xs",
                                                    children: "✨ Route Optimization API reordered your stops for the shortest path."
                                                }, void 0, false, {
                                                    fileName: "[project]/app/explore/page.tsx",
                                                    lineNumber: 387,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/explore/page.tsx",
                                                lineNumber: 386,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-3 gap-3",
                                                children: [
                                                    {
                                                        label: 'Distance',
                                                        value: `${route.totalDistanceKm} km`
                                                    },
                                                    {
                                                        label: 'Duration',
                                                        value: `${route.totalDurationMin} min`
                                                    },
                                                    {
                                                        label: 'Est. Cost',
                                                        value: `₹${route.estimatedCostINR}`
                                                    }
                                                ].map(({ label, value })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-center p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-orange-400 font-bold text-lg",
                                                                children: value
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/explore/page.tsx",
                                                                lineNumber: 397,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-stone-500 text-xs",
                                                                children: label
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/explore/page.tsx",
                                                                lineNumber: 398,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, label, true, {
                                                        fileName: "[project]/app/explore/page.tsx",
                                                        lineNumber: 396,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/explore/page.tsx",
                                                lineNumber: 390,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/explore/page.tsx",
                                        lineNumber: 384,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/explore/page.tsx",
                                lineNumber: 296,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/explore/page.tsx",
                        lineNumber: 276,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: selected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "glass rounded-2xl p-5 space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-2xl",
                                                    children: CATEGORY_ICONS[selected.category]
                                                }, void 0, false, {
                                                    fileName: "[project]/app/explore/page.tsx",
                                                    lineNumber: 413,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-lg font-bold text-white mt-1",
                                                    children: selected.name
                                                }, void 0, false, {
                                                    fileName: "[project]/app/explore/page.tsx",
                                                    lineNumber: 414,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm text-stone-400",
                                                    children: selected.city
                                                }, void 0, false, {
                                                    fileName: "[project]/app/explore/page.tsx",
                                                    lineNumber: 415,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/explore/page.tsx",
                                            lineNumber: 412,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            id: "close-detail",
                                            onClick: ()=>setSelected(null),
                                            className: "text-stone-500 hover:text-white p-1",
                                            children: "✕"
                                        }, void 0, false, {
                                            fileName: "[project]/app/explore/page.tsx",
                                            lineNumber: 417,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/explore/page.tsx",
                                    lineNumber: 411,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-stone-300 text-sm leading-relaxed",
                                    children: selected.description
                                }, void 0, false, {
                                    fileName: "[project]/app/explore/page.tsx",
                                    lineNumber: 426,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 bg-teal-500/10 border border-teal-500/30 rounded-xl space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs font-semibold text-teal-400 uppercase tracking-wide flex items-center gap-1.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "🚍"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/explore/page.tsx",
                                                            lineNumber: 432,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: t('explore_how_to_get')
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/explore/page.tsx",
                                                            lineNumber: 433,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/explore/page.tsx",
                                                    lineNumber: 431,
                                                    columnNumber: 19
                                                }, this),
                                                transitData?.hasRealDirections && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "px-2 py-0.5 rounded-full bg-teal-400/20 text-teal-300 text-[10px] font-bold",
                                                    children: "LIVE GOOGLE TRANSIT"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/explore/page.tsx",
                                                    lineNumber: 436,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/explore/page.tsx",
                                            lineNumber: 430,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: transitOrigin,
                                                    onChange: (e)=>setTransitOrigin(e.target.value),
                                                    onBlur: ()=>fetchTransitDirections(selected, transitOrigin),
                                                    onKeyDown: (e)=>e.key === 'Enter' && fetchTransitDirections(selected, transitOrigin),
                                                    placeholder: "Starting from (e.g. Chennai Central)",
                                                    className: "flex-1 bg-stone-900/80 border border-stone-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-teal-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/explore/page.tsx",
                                                    lineNumber: 444,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: useGPSForTransit,
                                                    title: "Use my location",
                                                    className: "px-2.5 py-1.5 glass border border-teal-500/40 rounded-lg text-xs text-teal-300 hover:bg-teal-500/20",
                                                    children: "📍 GPS"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/explore/page.tsx",
                                                    lineNumber: 453,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/explore/page.tsx",
                                            lineNumber: 443,
                                            columnNumber: 17
                                        }, this),
                                        transitLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-teal-300/70 animate-pulse py-2",
                                            children: "Fetching live transit routes from Google Maps…"
                                        }, void 0, false, {
                                            fileName: "[project]/app/explore/page.tsx",
                                            lineNumber: 464,
                                            columnNumber: 19
                                        }, this) : transitData?.hasRealDirections ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2 text-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between text-teal-200 font-semibold pt-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                "⏱️ ",
                                                                transitData.duration,
                                                                " (",
                                                                transitData.distance,
                                                                ")"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/explore/page.tsx",
                                                            lineNumber: 470,
                                                            columnNumber: 23
                                                        }, this),
                                                        transitData.departureTime && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[11px] text-teal-300/80",
                                                            children: [
                                                                "Departs: ",
                                                                transitData.departureTime
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/explore/page.tsx",
                                                            lineNumber: 472,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/explore/page.tsx",
                                                    lineNumber: 469,
                                                    columnNumber: 21
                                                }, this),
                                                transitData.steps && transitData.steps.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    className: "space-y-1.5 pt-1 text-teal-100/90 pl-3 list-disc",
                                                    children: transitData.steps.map((step, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            className: "leading-relaxed",
                                                            children: step
                                                        }, idx, false, {
                                                            fileName: "[project]/app/explore/page.tsx",
                                                            lineNumber: 478,
                                                            columnNumber: 27
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/explore/page.tsx",
                                                    lineNumber: 476,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/explore/page.tsx",
                                            lineNumber: 468,
                                            columnNumber: 19
                                        }, this) : /* Seeded fallback text when API key is missing or no transit found */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-teal-200 text-xs leading-relaxed",
                                            children: selected.transitInfo
                                        }, void 0, false, {
                                            fileName: "[project]/app/explore/page.tsx",
                                            lineNumber: 485,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/explore/page.tsx",
                                    lineNumber: 429,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-2 pt-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            id: "add-to-route-btn",
                                            onClick: ()=>addToRoute({
                                                    id: selected.id,
                                                    lat: selected.lat,
                                                    lng: selected.lng,
                                                    label: selected.name,
                                                    type: CATEGORY_TO_MARKER_TYPE[selected.category] ?? 'heritage'
                                                }),
                                            className: "py-2.5 px-3 rounded-xl bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs font-semibold hover:bg-orange-500/30 transition-colors flex items-center justify-center gap-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "+"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/explore/page.tsx",
                                                    lineNumber: 506,
                                                    columnNumber: 19
                                                }, this),
                                                " Add to route"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/explore/page.tsx",
                                            lineNumber: 493,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            id: "reserve-ticket-btn",
                                            onClick: ()=>setBookingPoi(selected),
                                            className: "py-2.5 px-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white text-xs font-bold transition-all shadow-md shadow-orange-500/20 flex items-center justify-center gap-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "🎟️"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/explore/page.tsx",
                                                    lineNumber: 514,
                                                    columnNumber: 19
                                                }, this),
                                                " Reserve Pass"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/explore/page.tsx",
                                            lineNumber: 509,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/explore/page.tsx",
                                    lineNumber: 492,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/explore/page.tsx",
                            lineNumber: 410,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "glass rounded-2xl p-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-stone-500 text-sm mb-3",
                                    children: [
                                        filtered.length,
                                        " sites — click a marker or item below"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/explore/page.tsx",
                                    lineNumber: 520,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2 max-h-[420px] overflow-y-auto pr-1",
                                    children: filtered.map((poi)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            id: `poi-item-${poi.id}`,
                                            onClick: ()=>setSelected(poi),
                                            className: "w-full text-left p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xl flex-shrink-0",
                                                    children: CATEGORY_ICONS[poi.category]
                                                }, void 0, false, {
                                                    fileName: "[project]/app/explore/page.tsx",
                                                    lineNumber: 531,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "min-w-0 flex-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm font-medium text-white truncate",
                                                            children: poi.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/explore/page.tsx",
                                                            lineNumber: 533,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-stone-500",
                                                            children: poi.city
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/explore/page.tsx",
                                                            lineNumber: 534,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/explore/page.tsx",
                                                    lineNumber: 532,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-orange-400 opacity-0 group-hover:opacity-100",
                                                    children: "→"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/explore/page.tsx",
                                                    lineNumber: 536,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, poi.id, true, {
                                            fileName: "[project]/app/explore/page.tsx",
                                            lineNumber: 525,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/explore/page.tsx",
                                    lineNumber: 523,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/explore/page.tsx",
                            lineNumber: 519,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/explore/page.tsx",
                        lineNumber: 408,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/explore/page.tsx",
                lineNumber: 274,
                columnNumber: 7
            }, this),
            bookingPoi && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BookingModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                poi: bookingPoi,
                onClose: ()=>setBookingPoi(null)
            }, void 0, false, {
                fileName: "[project]/app/explore/page.tsx",
                lineNumber: 549,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/explore/page.tsx",
        lineNumber: 251,
        columnNumber: 5
    }, this);
}
_s(ExplorePage, "XgOqsR71Bq1zrpi2/7sqhUJE3uM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$LangContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"]
    ];
});
_c3 = ExplorePage;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "TourismMap");
__turbopack_context__.k.register(_c1, "PlacesSearch$dynamic");
__turbopack_context__.k.register(_c2, "PlacesSearch");
__turbopack_context__.k.register(_c3, "ExplorePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/BookingModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BookingModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$StripePaymentModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/StripePaymentModal.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function BookingModal({ poi, onClose }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    // Tomorrow's date as default
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const defaultDate = tomorrow.toISOString().split('T')[0];
    const [date, setDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultDate);
    const [timeSlot, setTimeSlot] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('09:00 AM - 12:00 PM (Morning Entry)');
    const [tickets, setTickets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(2);
    const [showStripeModal, setShowStripeModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const ticketPrice = poi.category === 'temple' ? 50 : 150;
    const totalAmount = ticketPrice * tickets;
    const handleOpenPayment = ()=>{
        if (!date) {
            setError('Please select a visit date');
            return;
        }
        setShowStripeModal(true);
    };
    const handlePaymentSuccess = ()=>{
        router.push('/bookings');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: showStripeModal ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$StripePaymentModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            poi: poi,
            bookingDate: date,
            timeSlot: timeSlot,
            ticketCount: tickets,
            onClose: ()=>{
                setShowStripeModal(false);
                onClose();
            },
            onSuccess: handlePaymentSuccess
        }, void 0, false, {
            fileName: "[project]/components/BookingModal.tsx",
            lineNumber: 50,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-lg glass rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onClose,
                        id: "close-booking-modal-btn",
                        className: "absolute top-5 right-5 text-stone-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors",
                        children: "✕"
                    }, void 0, false, {
                        fileName: "[project]/components/BookingModal.tsx",
                        lineNumber: 65,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "🔒"
                                    }, void 0, false, {
                                        fileName: "[project]/components/BookingModal.tsx",
                                        lineNumber: 76,
                                        columnNumber: 17
                                    }, this),
                                    " Stripe Sandbox & Supabase"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/BookingModal.tsx",
                                lineNumber: 75,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl sm:text-2xl font-bold text-white leading-tight",
                                children: "Reserve Entry & Tour Pass"
                            }, void 0, false, {
                                fileName: "[project]/components/BookingModal.tsx",
                                lineNumber: 78,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-stone-400 text-sm mt-1",
                                children: [
                                    poi.name,
                                    " · ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-stone-300",
                                        children: poi.city
                                    }, void 0, false, {
                                        fileName: "[project]/components/BookingModal.tsx",
                                        lineNumber: 82,
                                        columnNumber: 30
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/BookingModal.tsx",
                                lineNumber: 81,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/BookingModal.tsx",
                        lineNumber: 74,
                        columnNumber: 13
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/components/BookingModal.tsx",
                        lineNumber: 87,
                        columnNumber: 15
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4 text-left mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1.5",
                                        children: "Visit Date"
                                    }, void 0, false, {
                                        fileName: "[project]/components/BookingModal.tsx",
                                        lineNumber: 96,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "date",
                                        id: "booking-date-input",
                                        value: date,
                                        min: new Date().toISOString().split('T')[0],
                                        onChange: (e)=>setDate(e.target.value),
                                        className: "w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-orange-500"
                                    }, void 0, false, {
                                        fileName: "[project]/components/BookingModal.tsx",
                                        lineNumber: 99,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/BookingModal.tsx",
                                lineNumber: 95,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1.5",
                                        children: "Time Slot"
                                    }, void 0, false, {
                                        fileName: "[project]/components/BookingModal.tsx",
                                        lineNumber: 111,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        id: "booking-timeslot-select",
                                        value: timeSlot,
                                        onChange: (e)=>setTimeSlot(e.target.value),
                                        className: "w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-orange-500",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "09:00 AM - 12:00 PM (Morning Entry)",
                                                children: "09:00 AM - 12:00 PM (Morning Slot)"
                                            }, void 0, false, {
                                                fileName: "[project]/components/BookingModal.tsx",
                                                lineNumber: 120,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "02:00 PM - 05:00 PM (Afternoon Entry)",
                                                children: "02:00 PM - 05:00 PM (Afternoon Slot)"
                                            }, void 0, false, {
                                                fileName: "[project]/components/BookingModal.tsx",
                                                lineNumber: 121,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "05:00 PM - 07:00 PM (Sunset / Sound & Light)",
                                                children: "05:00 PM - 07:00 PM (Sunset / Special)"
                                            }, void 0, false, {
                                                fileName: "[project]/components/BookingModal.tsx",
                                                lineNumber: 122,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/BookingModal.tsx",
                                        lineNumber: 114,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/BookingModal.tsx",
                                lineNumber: 110,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1.5",
                                        children: "Visitors / Tickets"
                                    }, void 0, false, {
                                        fileName: "[project]/components/BookingModal.tsx",
                                        lineNumber: 128,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setTickets(Math.max(1, tickets - 1)),
                                                className: "w-10 h-10 rounded-xl glass border border-white/10 text-white font-bold hover:bg-white/10 transition-colors flex items-center justify-center text-lg",
                                                children: "-"
                                            }, void 0, false, {
                                                fileName: "[project]/components/BookingModal.tsx",
                                                lineNumber: 132,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-12 text-center text-lg font-bold text-white",
                                                id: "booking-tickets-count",
                                                children: tickets
                                            }, void 0, false, {
                                                fileName: "[project]/components/BookingModal.tsx",
                                                lineNumber: 139,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setTickets(Math.min(10, tickets + 1)),
                                                className: "w-10 h-10 rounded-xl glass border border-white/10 text-white font-bold hover:bg-white/10 transition-colors flex items-center justify-center text-lg",
                                                children: "+"
                                            }, void 0, false, {
                                                fileName: "[project]/components/BookingModal.tsx",
                                                lineNumber: 142,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-stone-500 ml-auto",
                                                children: [
                                                    "₹",
                                                    ticketPrice,
                                                    " per visitor"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/BookingModal.tsx",
                                                lineNumber: 149,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/BookingModal.tsx",
                                        lineNumber: 131,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/BookingModal.tsx",
                                lineNumber: 127,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-orange-300 font-medium",
                                                children: "Validated Amount"
                                            }, void 0, false, {
                                                fileName: "[project]/components/BookingModal.tsx",
                                                lineNumber: 158,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-stone-400",
                                                children: [
                                                    tickets,
                                                    " × ₹",
                                                    ticketPrice,
                                                    " (Verified server-side)"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/BookingModal.tsx",
                                                lineNumber: 159,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/BookingModal.tsx",
                                        lineNumber: 157,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-2xl font-bold text-orange-400",
                                        id: "booking-total-amount",
                                        children: [
                                            "₹",
                                            totalAmount
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/BookingModal.tsx",
                                        lineNumber: 161,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/BookingModal.tsx",
                                lineNumber: 156,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/BookingModal.tsx",
                        lineNumber: 93,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                id: "proceed-stripe-checkout-btn",
                                onClick: handleOpenPayment,
                                disabled: loading,
                                className: "w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold text-sm transition-all shadow-lg shadow-orange-500/25 disabled:opacity-50 flex items-center justify-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "💳"
                                    }, void 0, false, {
                                        fileName: "[project]/components/BookingModal.tsx",
                                        lineNumber: 176,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "Proceed to Pay ₹",
                                            totalAmount,
                                            " (Stripe Sandbox)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/BookingModal.tsx",
                                        lineNumber: 177,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/BookingModal.tsx",
                                lineNumber: 169,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] text-stone-500 text-center",
                                children: "Stripe PaymentSheet (Test Mode) · Encrypted · No real charge"
                            }, void 0, false, {
                                fileName: "[project]/components/BookingModal.tsx",
                                lineNumber: 179,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/BookingModal.tsx",
                        lineNumber: 168,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/BookingModal.tsx",
                lineNumber: 63,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/BookingModal.tsx",
            lineNumber: 62,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/BookingModal.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
_s(BookingModal, "TkHDFKZI7WIpyG+5cBxi8G9fyFE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = BookingModal;
var _c;
__turbopack_context__.k.register(_c, "BookingModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/StripePaymentModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StripePaymentModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function StripePaymentModal({ poi, bookingDate, timeSlot, ticketCount, onClose, onSuccess }) {
    _s();
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('review');
    const [cardNumber, setCardNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('4242 4242 4242 4242');
    const [expDate, setExpDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('12/28');
    const [cvc, setCvc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('123');
    const [cardHolder, setCardHolder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Tamil Nadu Traveler');
    const [errorMsg, setErrorMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [paymentRef, setPaymentRef] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isSimulatedMode, setIsSimulatedMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Server validated calculation
    const ticketPrice = poi.category === 'temple' ? 50 : 150;
    const totalAmount = ticketPrice * ticketCount;
    const handlePay = async ()=>{
        setStep('processing');
        setErrorMsg('');
        try {
            // 1. Call Create Payment (Server-side price validation + Stripe PaymentIntent creation)
            const createRes = await fetch('/api/payments/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    poiId: poi.id,
                    poiName: poi.name,
                    category: poi.category,
                    bookingDate,
                    timeSlot,
                    ticketCount
                })
            });
            const createData = await createRes.json();
            if (!createRes.ok && !createData.isPlaceholder) {
                throw new Error(createData.error || 'Failed to initialize Stripe PaymentIntent');
            }
            const paymentIntentId = createData.paymentIntentId || `pi_test_${Date.now()}`;
            setPaymentRef(paymentIntentId);
            setIsSimulatedMode(createData.isPlaceholder || false);
            // 2. Confirm Payment with Stripe API
            const confirmRes = await fetch('/api/payments/confirm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    paymentIntentId,
                    paymentMethod: 'pm_card_visa',
                    metadata: {
                        poiId: poi.id,
                        poiName: poi.name,
                        category: poi.category,
                        bookingDate,
                        timeSlot,
                        ticketCount,
                        amount: totalAmount
                    }
                })
            });
            const confirmData = await confirmRes.json();
            if (!confirmRes.ok) {
                throw new Error(confirmData.error || 'Failed to confirm payment with Stripe');
            }
            // If simulated mode, wait 1.2s for UX
            if (confirmData.isSimulated) {
                await new Promise((resolve)=>setTimeout(resolve, 1200));
            }
            setPaymentRef(confirmData.paymentIntentId || paymentIntentId);
            setStep('success');
            onSuccess();
        } catch (err) {
            console.error('Payment failure:', err);
            setErrorMsg(err.message || 'Payment processing failed. Please try again.');
            setStep('failed');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-md glass rounded-3xl p-6 sm:p-7 border border-white/20 shadow-2xl relative text-left",
            children: [
                step !== 'processing' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onClose,
                    className: "absolute top-5 right-5 text-stone-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors",
                    children: "✕"
                }, void 0, false, {
                    fileName: "[project]/components/StripePaymentModal.tsx",
                    lineNumber: 115,
                    columnNumber: 11
                }, this),
                step === 'review' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 mb-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold uppercase tracking-wider",
                                    children: "🔒 Stripe Sandbox"
                                }, void 0, false, {
                                    fileName: "[project]/components/StripePaymentModal.tsx",
                                    lineNumber: 128,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-stone-400",
                                    children: "PaymentSheet"
                                }, void 0, false, {
                                    fileName: "[project]/components/StripePaymentModal.tsx",
                                    lineNumber: 131,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/StripePaymentModal.tsx",
                            lineNumber: 127,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-bold text-white mb-1",
                            children: poi.name
                        }, void 0, false, {
                            fileName: "[project]/components/StripePaymentModal.tsx",
                            lineNumber: 134,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-stone-400 mb-4",
                            children: [
                                "📅 ",
                                bookingDate,
                                " · ⏰ ",
                                timeSlot.split('(')[0],
                                " · 👥 ",
                                ticketCount,
                                " Ticket(s)"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/StripePaymentModal.tsx",
                            lineNumber: 135,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-3.5 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-between mb-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-orange-300 font-medium",
                                            children: "Validated Amount"
                                        }, void 0, false, {
                                            fileName: "[project]/components/StripePaymentModal.tsx",
                                            lineNumber: 142,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-[11px] text-stone-400",
                                            children: [
                                                ticketCount,
                                                " × ₹",
                                                ticketPrice,
                                                " (Server verified)"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/StripePaymentModal.tsx",
                                            lineNumber: 143,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/StripePaymentModal.tsx",
                                    lineNumber: 141,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-2xl font-bold text-orange-400",
                                    children: [
                                        "₹",
                                        totalAmount
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/StripePaymentModal.tsx",
                                    lineNumber: 145,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/StripePaymentModal.tsx",
                            lineNumber: 140,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3 mb-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs font-semibold text-stone-300 flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Test Card Information"
                                        }, void 0, false, {
                                            fileName: "[project]/components/StripePaymentModal.tsx",
                                            lineNumber: 151,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] text-amber-400",
                                            children: "Stripe Test Card"
                                        }, void 0, false, {
                                            fileName: "[project]/components/StripePaymentModal.tsx",
                                            lineNumber: 152,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/StripePaymentModal.tsx",
                                    lineNumber: 150,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: cardNumber,
                                        onChange: (e)=>setCardNumber(e.target.value),
                                        placeholder: "4242 4242 4242 4242",
                                        className: "w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500 font-mono tracking-wider"
                                    }, void 0, false, {
                                        fileName: "[project]/components/StripePaymentModal.tsx",
                                        lineNumber: 156,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/StripePaymentModal.tsx",
                                    lineNumber: 155,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: expDate,
                                            onChange: (e)=>setExpDate(e.target.value),
                                            placeholder: "MM/YY",
                                            className: "bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
                                        }, void 0, false, {
                                            fileName: "[project]/components/StripePaymentModal.tsx",
                                            lineNumber: 166,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: cvc,
                                            onChange: (e)=>setCvc(e.target.value),
                                            placeholder: "CVC",
                                            className: "bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
                                        }, void 0, false, {
                                            fileName: "[project]/components/StripePaymentModal.tsx",
                                            lineNumber: 173,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/StripePaymentModal.tsx",
                                    lineNumber: 165,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: cardHolder,
                                    onChange: (e)=>setCardHolder(e.target.value),
                                    placeholder: "Cardholder Name",
                                    className: "w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                                }, void 0, false, {
                                    fileName: "[project]/components/StripePaymentModal.tsx",
                                    lineNumber: 182,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/StripePaymentModal.tsx",
                            lineNumber: 149,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            id: "confirm-stripe-payment-btn",
                            onClick: handlePay,
                            className: "w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold text-sm transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "💳"
                                }, void 0, false, {
                                    fileName: "[project]/components/StripePaymentModal.tsx",
                                    lineNumber: 196,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        "Pay ₹",
                                        totalAmount,
                                        " (Stripe Sandbox)"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/StripePaymentModal.tsx",
                                    lineNumber: 197,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/StripePaymentModal.tsx",
                            lineNumber: 191,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[10px] text-stone-500 text-center mt-2.5",
                            children: "Strict Sandbox Test Mode · No real currency charged"
                        }, void 0, false, {
                            fileName: "[project]/components/StripePaymentModal.tsx",
                            lineNumber: 200,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/StripePaymentModal.tsx",
                    lineNumber: 125,
                    columnNumber: 11
                }, this),
                step === 'processing' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "py-12 text-center space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-14 h-14 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"
                        }, void 0, false, {
                            fileName: "[project]/components/StripePaymentModal.tsx",
                            lineNumber: 209,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-bold text-white",
                                    children: "Processing Payment with Stripe…"
                                }, void 0, false, {
                                    fileName: "[project]/components/StripePaymentModal.tsx",
                                    lineNumber: 211,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-stone-400 mt-1",
                                    children: "Creating PaymentIntent and confirming card with Stripe Sandbox…"
                                }, void 0, false, {
                                    fileName: "[project]/components/StripePaymentModal.tsx",
                                    lineNumber: 212,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/StripePaymentModal.tsx",
                            lineNumber: 210,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/StripePaymentModal.tsx",
                    lineNumber: 208,
                    columnNumber: 11
                }, this),
                step === 'success' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "py-4 text-center space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-2xl mx-auto shadow-lg shadow-emerald-500/20",
                            children: "✓"
                        }, void 0, false, {
                            fileName: "[project]/components/StripePaymentModal.tsx",
                            lineNumber: 222,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider",
                                    children: "Payment Successful"
                                }, void 0, false, {
                                    fileName: "[project]/components/StripePaymentModal.tsx",
                                    lineNumber: 227,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-bold text-white mt-2",
                                    children: "Pass Confirmed!"
                                }, void 0, false, {
                                    fileName: "[project]/components/StripePaymentModal.tsx",
                                    lineNumber: 230,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-stone-400 mt-1",
                                    children: [
                                        "Your entry pass for ",
                                        poi.name,
                                        " has been confirmed and saved to Supabase."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/StripePaymentModal.tsx",
                                    lineNumber: 231,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/StripePaymentModal.tsx",
                            lineNumber: 226,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-3.5 rounded-2xl bg-black/40 border border-white/10 text-left space-y-1 text-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between text-stone-300",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Amount Paid:"
                                        }, void 0, false, {
                                            fileName: "[project]/components/StripePaymentModal.tsx",
                                            lineNumber: 238,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            className: "text-orange-400 font-bold",
                                            children: [
                                                "₹",
                                                totalAmount,
                                                " INR"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/StripePaymentModal.tsx",
                                            lineNumber: 239,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/StripePaymentModal.tsx",
                                    lineNumber: 237,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between text-stone-400 text-[11px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Status:"
                                        }, void 0, false, {
                                            fileName: "[project]/components/StripePaymentModal.tsx",
                                            lineNumber: 242,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-emerald-400 font-semibold",
                                            children: "PAID (Verified)"
                                        }, void 0, false, {
                                            fileName: "[project]/components/StripePaymentModal.tsx",
                                            lineNumber: 243,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/StripePaymentModal.tsx",
                                    lineNumber: 241,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between text-stone-400 text-[10px] pt-1 border-t border-white/5 truncate",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Stripe Reference:"
                                        }, void 0, false, {
                                            fileName: "[project]/components/StripePaymentModal.tsx",
                                            lineNumber: 246,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-stone-300",
                                            children: paymentRef
                                        }, void 0, false, {
                                            fileName: "[project]/components/StripePaymentModal.tsx",
                                            lineNumber: 247,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/StripePaymentModal.tsx",
                                    lineNumber: 245,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/StripePaymentModal.tsx",
                            lineNumber: 236,
                            columnNumber: 13
                        }, this),
                        isSimulatedMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300/90 text-left",
                            children: [
                                "💡 ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                    children: "Note:"
                                }, void 0, false, {
                                    fileName: "[project]/components/StripePaymentModal.tsx",
                                    lineNumber: 253,
                                    columnNumber: 20
                                }, this),
                                " Set ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                    children: "STRIPE_SECRET_KEY=sk_test_..."
                                }, void 0, false, {
                                    fileName: "[project]/components/StripePaymentModal.tsx",
                                    lineNumber: 253,
                                    columnNumber: 39
                                }, this),
                                " in ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                    children: ".env.local"
                                }, void 0, false, {
                                    fileName: "[project]/components/StripePaymentModal.tsx",
                                    lineNumber: 253,
                                    columnNumber: 85
                                }, this),
                                " to see live transactions in your Stripe Sandbox dashboard."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/StripePaymentModal.tsx",
                            lineNumber: 252,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2 pt-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onClose,
                                    className: "flex-1 py-3 rounded-xl glass border border-white/20 text-xs text-stone-300 hover:text-white transition-all",
                                    children: "Close"
                                }, void 0, false, {
                                    fileName: "[project]/components/StripePaymentModal.tsx",
                                    lineNumber: 258,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/bookings",
                                    onClick: onClose,
                                    className: "flex-1 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-1 shadow-md",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "🎟️"
                                        }, void 0, false, {
                                            fileName: "[project]/components/StripePaymentModal.tsx",
                                            lineNumber: 269,
                                            columnNumber: 17
                                        }, this),
                                        " View Pass"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/StripePaymentModal.tsx",
                                    lineNumber: 264,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/StripePaymentModal.tsx",
                            lineNumber: 257,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/StripePaymentModal.tsx",
                    lineNumber: 221,
                    columnNumber: 11
                }, this),
                step === 'failed' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "py-6 text-center space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-14 h-14 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 flex items-center justify-center text-2xl mx-auto",
                            children: "✕"
                        }, void 0, false, {
                            fileName: "[project]/components/StripePaymentModal.tsx",
                            lineNumber: 278,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-bold text-white",
                                    children: "Payment Failed"
                                }, void 0, false, {
                                    fileName: "[project]/components/StripePaymentModal.tsx",
                                    lineNumber: 283,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-red-300/90 mt-1",
                                    children: errorMsg || 'Stripe test payment could not be processed.'
                                }, void 0, false, {
                                    fileName: "[project]/components/StripePaymentModal.tsx",
                                    lineNumber: 284,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/StripePaymentModal.tsx",
                            lineNumber: 282,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2 pt-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onClose,
                                    className: "flex-1 py-3 rounded-xl glass border border-white/20 text-xs text-stone-300",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/components/StripePaymentModal.tsx",
                                    lineNumber: 290,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setStep('review'),
                                    className: "flex-1 py-3 rounded-xl bg-orange-500 text-white text-xs font-bold",
                                    children: "Try Again"
                                }, void 0, false, {
                                    fileName: "[project]/components/StripePaymentModal.tsx",
                                    lineNumber: 296,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/StripePaymentModal.tsx",
                            lineNumber: 289,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/StripePaymentModal.tsx",
                    lineNumber: 277,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/StripePaymentModal.tsx",
            lineNumber: 112,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/StripePaymentModal.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
_s(StripePaymentModal, "tq/qAF41zgoRwBG12C1lxUTBrdk=");
_c = StripePaymentModal;
var _c;
__turbopack_context__.k.register(_c, "StripePaymentModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/directions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * lib/directions.ts
 *
 * Client-side helper that calls our server-side /api/maps/route proxy.
 * GOOGLE_MAPS_API_KEY never touches the browser — all Google REST calls
 * happen in app/api/maps/route/route.ts.
 */ __turbopack_context__.s([
    "getOptimizedRoute",
    ()=>getOptimizedRoute
]);
async function getOptimizedRoute(origin, destinations, mode = 'DRIVE', optimize = true) {
    if (destinations.length === 0) {
        throw new Error('At least one destination is required.');
    }
    const res = await fetch('/api/maps/route', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            origin,
            destinations,
            travelMode: mode,
            optimize
        })
    });
    const data = await res.json();
    if (!res.ok) {
        // data.error is already a sanitised message from the server — no key leakage
        throw new Error(data.error ?? `Route API error (HTTP ${res.status})`);
    }
    return data;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/nearbyBusStops.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * lib/nearbyBusStops.ts
 *
 * Client-side helper that calls our server-side /api/maps/nearby proxy.
 * GOOGLE_MAPS_API_KEY never reaches the browser — all Places REST calls
 * happen in app/api/maps/nearby/route.ts.
 */ __turbopack_context__.s([
    "getNearbyBusStops",
    ()=>getNearbyBusStops
]);
async function getNearbyBusStops(options) {
    const { lat, lng, radiusMetres = 2000, maxResults = 10 } = options;
    const params = new URLSearchParams({
        lat: String(lat),
        lng: String(lng),
        radius: String(radiusMetres),
        maxResults: String(maxResults)
    });
    const res = await fetch(`/api/maps/nearby?${params}`);
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.error ?? `Nearby search error (HTTP ${res.status})`);
    }
    return (data.places ?? []).map((p)=>({
            id: p.id,
            lat: p.lat,
            lng: p.lng,
            label: p.name,
            type: 'bus_stop',
            description: p.address || undefined
        }));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_06sal0z._.js.map