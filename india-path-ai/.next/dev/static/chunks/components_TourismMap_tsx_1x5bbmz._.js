(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/TourismMap.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TourismMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vis$2e$gl$2f$react$2d$google$2d$maps$2f$dist$2f$index$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@vis.gl/react-google-maps/dist/index.modern.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
// ─── Icon colours per type ────────────────────────────────────────────────────
const PIN_CONFIG = {
    heritage: {
        bg: '#f97316',
        glyph: '🏛️'
    },
    bus_stop: {
        bg: '#22c55e',
        glyph: '🚌'
    },
    hotel: {
        bg: '#3b82f6',
        glyph: '🏨'
    },
    hospital: {
        bg: '#ef4444',
        glyph: '🏥'
    },
    search: {
        bg: '#a855f7',
        glyph: '📍'
    },
    incident: {
        bg: '#f43f5e',
        glyph: '🆘'
    }
};
// ─── API key guard ────────────────────────────────────────────────────────────
const API_KEY = ("TURBOPACK compile-time value", "AIzaSyBXnvaPnR8-DlYQ_KllZlZiX_KKevDoB0U") ?? '';
function MissingKeyBanner() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full h-full flex items-center justify-center bg-red-950/60 border border-red-500/50 rounded-2xl p-8 text-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-4xl mb-3",
                    children: "🗺️"
                }, void 0, false, {
                    fileName: "[project]/components/TourismMap.tsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-red-400 font-bold text-lg mb-2",
                    children: "Google Maps API key missing"
                }, void 0, false, {
                    fileName: "[project]/components/TourismMap.tsx",
                    lineNumber: 76,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-red-300 text-sm max-w-sm",
                    children: [
                        "Add ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                            className: "bg-red-900/60 px-1 rounded",
                            children: "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY"
                        }, void 0, false, {
                            fileName: "[project]/components/TourismMap.tsx",
                            lineNumber: 78,
                            columnNumber: 15
                        }, this),
                        " to your ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                            className: "bg-red-900/60 px-1 rounded",
                            children: ".env.local"
                        }, void 0, false, {
                            fileName: "[project]/components/TourismMap.tsx",
                            lineNumber: 79,
                            columnNumber: 16
                        }, this),
                        " file and restart the dev server."
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/TourismMap.tsx",
                    lineNumber: 77,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/TourismMap.tsx",
            lineNumber: 74,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/TourismMap.tsx",
        lineNumber: 73,
        columnNumber: 5
    }, this);
}
_c = MissingKeyBanner;
// ─── Route polyline rendered inside the map context ──────────────────────────
function RoutePolyline({ path }) {
    _s();
    const map = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vis$2e$gl$2f$react$2d$google$2d$maps$2f$dist$2f$index$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RoutePolyline.useEffect": ()=>{
            if (!map || !path.length) return;
            // Draw using the Maps JS SDK Polyline directly
            const poly = new google.maps.Polyline({
                path,
                geodesic: true,
                strokeColor: '#f97316',
                strokeOpacity: 0.9,
                strokeWeight: 4,
                map
            });
            return ({
                "RoutePolyline.useEffect": ()=>poly.setMap(null)
            })["RoutePolyline.useEffect"];
        }
    }["RoutePolyline.useEffect"], [
        map,
        path
    ]);
    return null;
}
_s(RoutePolyline, "IoceErwr5KVGS9kN4RQ1bOkYMAg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vis$2e$gl$2f$react$2d$google$2d$maps$2f$dist$2f$index$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"]
    ];
});
_c1 = RoutePolyline;
// ─── Inner map content (needs to be inside APIProvider) ──────────────────────
function MapContent({ markers = [], center, zoom, staticPreview, route, onGetDirections }) {
    _s1();
    const [activeMarker, setActiveMarker] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const defaultCenter = center ?? {
        lat: 28.6139,
        lng: 77.209
    };
    const defaultZoom = zoom ?? 5;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vis$2e$gl$2f$react$2d$google$2d$maps$2f$dist$2f$index$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Map"], {
        defaultCenter: defaultCenter,
        defaultZoom: defaultZoom,
        mapId: "india-path-ai-map",
        gestureHandling: staticPreview ? 'none' : 'greedy',
        disableDefaultUI: staticPreview,
        style: {
            width: '100%',
            height: '100%'
        },
        children: [
            route && route.polylinePath.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RoutePolyline, {
                path: route.polylinePath
            }, void 0, false, {
                fileName: "[project]/components/TourismMap.tsx",
                lineNumber: 135,
                columnNumber: 9
            }, this),
            markers.map((m)=>{
                const cfg = PIN_CONFIG[m.type] ?? PIN_CONFIG.heritage;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vis$2e$gl$2f$react$2d$google$2d$maps$2f$dist$2f$index$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdvancedMarker"], {
                    position: {
                        lat: m.lat,
                        lng: m.lng
                    },
                    onClick: ()=>setActiveMarker(m),
                    title: m.label,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vis$2e$gl$2f$react$2d$google$2d$maps$2f$dist$2f$index$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pin"], {
                        background: cfg.bg,
                        borderColor: cfg.bg,
                        glyphColor: "#ffffff",
                        glyph: cfg.glyph,
                        scale: activeMarker?.id === m.id ? 1.3 : 1
                    }, void 0, false, {
                        fileName: "[project]/components/TourismMap.tsx",
                        lineNumber: 148,
                        columnNumber: 13
                    }, this)
                }, m.id, false, {
                    fileName: "[project]/components/TourismMap.tsx",
                    lineNumber: 142,
                    columnNumber: 11
                }, this);
            }),
            activeMarker && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vis$2e$gl$2f$react$2d$google$2d$maps$2f$dist$2f$index$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InfoWindow"], {
                position: {
                    lat: activeMarker.lat,
                    lng: activeMarker.lng
                },
                onCloseClick: ()=>setActiveMarker(null),
                headerContent: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "font-bold text-sm text-stone-900",
                    children: activeMarker.label
                }, void 0, false, {
                    fileName: "[project]/components/TourismMap.tsx",
                    lineNumber: 165,
                    columnNumber: 13
                }, this),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "min-w-[180px] max-w-[240px] p-1",
                    children: [
                        activeMarker.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-stone-600 text-xs mb-3 leading-relaxed",
                            children: activeMarker.description
                        }, void 0, false, {
                            fileName: "[project]/components/TourismMap.tsx",
                            lineNumber: 170,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: `https://www.google.com/maps/dir/?api=1&destination=${activeMarker.lat},${activeMarker.lng}`,
                                    target: "_blank",
                                    rel: "noreferrer",
                                    className: "flex-1 text-center px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-500 transition-colors",
                                    children: "🗺️ Get directions"
                                }, void 0, false, {
                                    fileName: "[project]/components/TourismMap.tsx",
                                    lineNumber: 175,
                                    columnNumber: 15
                                }, this),
                                onGetDirections && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        onGetDirections(activeMarker);
                                        setActiveMarker(null);
                                    },
                                    className: "flex-1 px-3 py-1.5 bg-orange-500 text-white text-xs font-semibold rounded-lg hover:bg-orange-400 transition-colors",
                                    children: "Add to route"
                                }, void 0, false, {
                                    fileName: "[project]/components/TourismMap.tsx",
                                    lineNumber: 184,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/TourismMap.tsx",
                            lineNumber: 174,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/TourismMap.tsx",
                    lineNumber: 168,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/TourismMap.tsx",
                lineNumber: 161,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/TourismMap.tsx",
        lineNumber: 125,
        columnNumber: 5
    }, this);
}
_s1(MapContent, "asO/RTU+815HqBfy3jKKoWM2Okg=");
_c2 = MapContent;
function TourismMap(props) {
    const { heightClass = 'h-[500px]', searchSlot, ...rest } = props;
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return(// Single <APIProvider> for the entire map area.
    // Always uses NEXT_PUBLIC_GOOGLE_MAPS_API_KEY (Maps JavaScript API key).
    // Any child that calls useMapsLibrary() (e.g. PlacesSearch) must be
    // rendered inside this provider — pass it via the searchSlot prop.
    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vis$2e$gl$2f$react$2d$google$2d$maps$2f$dist$2f$index$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APIProvider"], {
        apiKey: API_KEY,
        libraries: [
            'places',
            'geocoding'
        ],
        onLoad: ()=>console.log('[TourismMap] Google Maps SDK loaded with Maps JS API key'),
        children: [
            searchSlot,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `w-full ${heightClass} rounded-2xl overflow-hidden`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MapContent, {
                    ...rest
                }, void 0, false, {
                    fileName: "[project]/components/TourismMap.tsx",
                    lineNumber: 227,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/TourismMap.tsx",
                lineNumber: 226,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/TourismMap.tsx",
        lineNumber: 220,
        columnNumber: 5
    }, this));
}
_c3 = TourismMap;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "MissingKeyBanner");
__turbopack_context__.k.register(_c1, "RoutePolyline");
__turbopack_context__.k.register(_c2, "MapContent");
__turbopack_context__.k.register(_c3, "TourismMap");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/TourismMap.tsx [app-client] (ecmascript, next/dynamic entry)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/components/TourismMap.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=components_TourismMap_tsx_1x5bbmz._.js.map