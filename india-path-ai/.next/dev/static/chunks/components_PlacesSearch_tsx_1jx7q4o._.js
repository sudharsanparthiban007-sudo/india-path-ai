(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/PlacesSearch.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PlacesSearch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vis$2e$gl$2f$react$2d$google$2d$maps$2f$dist$2f$index$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@vis.gl/react-google-maps/dist/index.modern.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
// ─── Inner autocomplete (must live inside APIProvider) ────────────────────────
function AutocompleteInner({ onPlaceSelect, placeholder, className }) {
    _s();
    const placesLib = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vis$2e$gl$2f$react$2d$google$2d$maps$2f$dist$2f$index$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMapsLibrary"])('places');
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [suggestions, setSuggestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Session token reduces billing by grouping autocomplete + detail calls
    const sessionToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Ensure we have a session token once the library is loaded
    if (placesLib && !sessionToken.current) {
        sessionToken.current = new placesLib.AutocompleteSessionToken();
    }
    const fetchSuggestions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AutocompleteInner.useCallback[fetchSuggestions]": async (value)=>{
            if (!placesLib || value.length < 2) {
                setSuggestions([]);
                return;
            }
            setLoading(true);
            try {
                const { suggestions: preds } = await google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions({
                    input: value,
                    sessionToken: sessionToken.current ?? undefined,
                    includedRegionCodes: [
                        'in'
                    ]
                });
                setSuggestions(preds ?? []);
                setIsOpen((preds ?? []).length > 0);
            } catch (err) {
                console.error('[PlacesSearch] AutocompleteSuggestion error:', err);
                setSuggestions([]);
            } finally{
                setLoading(false);
            }
        }
    }["AutocompleteInner.useCallback[fetchSuggestions]"], [
        placesLib
    ]);
    const handleChange = (e)=>{
        setQuery(e.target.value);
        fetchSuggestions(e.target.value);
    };
    const handleSelect = async (suggestion)=>{
        if (!suggestion.placePrediction) return;
        const prediction = suggestion.placePrediction;
        setQuery(prediction.text.toString());
        setIsOpen(false);
        setSuggestions([]);
        try {
            // Fetch full place details using the new Place class
            const place = prediction.toPlace();
            await place.fetchFields({
                fields: [
                    'displayName',
                    'formattedAddress',
                    'location'
                ]
            });
            if (!place.location) return;
            onPlaceSelect({
                placeId: place.id ?? prediction.placeId,
                name: place.displayName ?? prediction.text.toString(),
                lat: place.location.lat(),
                lng: place.location.lng(),
                address: place.formattedAddress ?? prediction.text.toString()
            });
            // Rotate session token after a completed selection
            sessionToken.current = new google.maps.places.AutocompleteSessionToken();
        } catch (err) {
            console.error('[PlacesSearch] Place.fetchFields error:', err);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative ${className ?? ''}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative flex items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "absolute left-3 text-stone-400 pointer-events-none",
                        children: "🔍"
                    }, void 0, false, {
                        fileName: "[project]/components/PlacesSearch.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        value: query,
                        onChange: handleChange,
                        onFocus: ()=>suggestions.length > 0 && setIsOpen(true),
                        onBlur: ()=>setTimeout(()=>setIsOpen(false), 150),
                        placeholder: placeholder ?? 'Search for a place in India…',
                        className: "w-full pl-9 pr-4 py-3 rounded-xl bg-stone-900/80 backdrop-blur border border-white/20 text-white placeholder-stone-400 text-sm outline-none focus:ring-2 focus:ring-orange-400/60 transition-all"
                    }, void 0, false, {
                        fileName: "[project]/components/PlacesSearch.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this),
                    loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "absolute right-3 text-stone-400 text-xs animate-pulse",
                        children: "…"
                    }, void 0, false, {
                        fileName: "[project]/components/PlacesSearch.tsx",
                        lineNumber: 127,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/PlacesSearch.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            isOpen && suggestions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "absolute z-50 top-full mt-1 w-full bg-stone-900/95 border border-white/10 rounded-xl overflow-hidden shadow-2xl",
                children: suggestions.map((s, idx)=>{
                    const pred = s.placePrediction;
                    if (!pred) return null;
                    const main = pred.mainText?.toString() ?? pred.text.toString();
                    const secondary = pred.secondaryText?.toString() ?? '';
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        onMouseDown: ()=>handleSelect(s),
                        className: "px-4 py-2.5 text-sm text-stone-200 hover:bg-orange-500/20 cursor-pointer border-b border-white/5 last:border-0 transition-colors",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium",
                                children: main
                            }, void 0, false, {
                                fileName: "[project]/components/PlacesSearch.tsx",
                                lineNumber: 144,
                                columnNumber: 17
                            }, this),
                            secondary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-stone-400 text-xs ml-2",
                                children: secondary
                            }, void 0, false, {
                                fileName: "[project]/components/PlacesSearch.tsx",
                                lineNumber: 146,
                                columnNumber: 19
                            }, this)
                        ]
                    }, pred.placeId ?? idx, true, {
                        fileName: "[project]/components/PlacesSearch.tsx",
                        lineNumber: 139,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/PlacesSearch.tsx",
                lineNumber: 132,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/PlacesSearch.tsx",
        lineNumber: 114,
        columnNumber: 5
    }, this);
}
_s(AutocompleteInner, "+aLnxtxGqfSJC4K/WbJSz8pgKAE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vis$2e$gl$2f$react$2d$google$2d$maps$2f$dist$2f$index$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMapsLibrary"]
    ];
});
_c = AutocompleteInner;
function PlacesSearch(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AutocompleteInner, {
        ...props
    }, void 0, false, {
        fileName: "[project]/components/PlacesSearch.tsx",
        lineNumber: 163,
        columnNumber: 10
    }, this);
}
_c1 = PlacesSearch;
var _c, _c1;
__turbopack_context__.k.register(_c, "AutocompleteInner");
__turbopack_context__.k.register(_c1, "PlacesSearch");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/PlacesSearch.tsx [app-client] (ecmascript, next/dynamic entry)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/components/PlacesSearch.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=components_PlacesSearch_tsx_1jx7q4o._.js.map