(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/lens/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LensPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$LangContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/LangContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@capacitor/core/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$camera$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@capacitor/camera/dist/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$camera$2f$dist$2f$esm$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@capacitor/camera/dist/esm/definitions.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function LensPage() {
    _s();
    const { t, lang } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$LangContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const [image, setImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [result, setResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isMock, setIsMock] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [dragging, setDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isNative, setIsNative] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const fileRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LensPage.useEffect": ()=>{
            setIsNative(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Capacitor"].isNativePlatform());
        }
    }["LensPage.useEffect"], []);
    const handleFile = (file)=>{
        const reader = new FileReader();
        reader.onload = (e)=>{
            const dataUrl = e.target?.result;
            const [header, base64] = dataUrl.split(',');
            const mime = header.match(/:(.*?);/)?.[1] || 'image/jpeg';
            setImage({
                base64,
                mime,
                url: dataUrl
            });
            setResult(null);
        };
        reader.readAsDataURL(file);
    };
    const handleDrop = (e)=>{
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) handleFile(file);
    };
    // Branch on native vs web
    const triggerPhotoInput = async ()=>{
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Capacitor"].isNativePlatform()) {
            try {
                const photo = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$camera$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Camera"].getPhoto({
                    quality: 90,
                    allowEditing: false,
                    resultType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$camera$2f$dist$2f$esm$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CameraResultType"].Base64,
                    source: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$camera$2f$dist$2f$esm$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CameraSource"].Prompt
                });
                if (photo.base64String) {
                    const mime = photo.format ? `image/${photo.format}` : 'image/jpeg';
                    const dataUrl = `data:${mime};base64,${photo.base64String}`;
                    setImage({
                        base64: photo.base64String,
                        mime,
                        url: dataUrl
                    });
                    setResult(null);
                }
            } catch (err) {
                // User cancelled or permission denied
                console.warn('Native camera capture cancelled or failed:', err);
            }
        } else {
            fileRef.current?.click();
        }
    };
    const analyze = async ()=>{
        if (!image) return;
        setLoading(true);
        setResult(null);
        try {
            const res = await fetch('/api/lens', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    imageBase64: image.base64,
                    mimeType: image.mime,
                    language: lang
                })
            });
            const data = await res.json();
            setResult(data.content);
            setIsMock(data.mock);
        } catch (e) {
            console.error(e);
            setResult('Failed to analyse image. Please try again.');
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-2xl mx-auto px-4 py-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-3xl font-bold gradient-text mb-2",
                children: t('lens_title')
            }, void 0, false, {
                fileName: "[project]/app/lens/page.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-stone-400 mb-8 text-sm",
                children: isNative ? 'Take or select a photo of a monument or inscription using your device camera.' : 'Upload a photo of a monument, inscription, or sign for AI-powered heritage context.'
            }, void 0, false, {
                fileName: "[project]/app/lens/page.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "lens-upload-area",
                onDragOver: (e)=>{
                    e.preventDefault();
                    setDragging(true);
                },
                onDragLeave: ()=>setDragging(false),
                onDrop: handleDrop,
                onClick: triggerPhotoInput,
                className: `relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all mb-6 ${dragging ? 'border-orange-400 bg-orange-500/10' : 'border-stone-700 hover:border-orange-500/50 hover:bg-white/3'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ref: fileRef,
                        id: "lens-file-input",
                        type: "file",
                        accept: "image/*",
                        className: "hidden",
                        onChange: (e)=>{
                            if (e.target.files?.[0]) handleFile(e.target.files[0]);
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/lens/page.tsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this),
                    image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: image.url,
                                alt: "Uploaded",
                                className: "max-h-64 mx-auto rounded-xl object-contain mb-3 shadow-lg"
                            }, void 0, false, {
                                fileName: "[project]/app/lens/page.tsx",
                                lineNumber: 120,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-stone-400 text-sm",
                                children: isNative ? 'Tap to retake / change photo' : 'Click or drag to replace'
                            }, void 0, false, {
                                fileName: "[project]/app/lens/page.tsx",
                                lineNumber: 125,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/lens/page.tsx",
                        lineNumber: 118,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-5xl mb-4",
                                children: isNative ? '📸' : '📷'
                            }, void 0, false, {
                                fileName: "[project]/app/lens/page.tsx",
                                lineNumber: 131,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-stone-300 font-medium mb-1",
                                children: isNative ? 'Tap to Open Camera / Gallery' : t('lens_upload')
                            }, void 0, false, {
                                fileName: "[project]/app/lens/page.tsx",
                                lineNumber: 132,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-stone-600 text-sm",
                                children: isNative ? 'Native Camera Capture' : 'JPG, PNG, WEBP supported'
                            }, void 0, false, {
                                fileName: "[project]/app/lens/page.tsx",
                                lineNumber: 135,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/lens/page.tsx",
                        lineNumber: 130,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/lens/page.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                id: "lens-analyze-btn",
                onClick: analyze,
                disabled: !image || loading,
                className: "w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-violet-500 hover:to-purple-500 transition-all mb-8",
                children: loading ? t('lens_analyzing') : t('lens_analyze')
            }, void 0, false, {
                fileName: "[project]/app/lens/page.tsx",
                lineNumber: 143,
                columnNumber: 7
            }, this),
            result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass rounded-2xl overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-5 border-b border-white/10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-lg font-bold text-white",
                            children: t('lens_result_title')
                        }, void 0, false, {
                            fileName: "[project]/app/lens/page.tsx",
                            lineNumber: 156,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/lens/page.tsx",
                        lineNumber: 155,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-5",
                        children: [
                            isMock && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-400 text-sm",
                                children: t('lens_mock_note')
                            }, void 0, false, {
                                fileName: "[project]/app/lens/page.tsx",
                                lineNumber: 160,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-stone-300 text-sm leading-relaxed whitespace-pre-wrap mb-6",
                                children: result
                            }, void 0, false, {
                                fileName: "[project]/app/lens/page.tsx",
                                lineNumber: 164,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                id: "lens-disclaimer",
                                className: "p-4 bg-red-900/30 border border-red-500/50 rounded-xl",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-red-400 flex-shrink-0",
                                            children: "⚠️"
                                        }, void 0, false, {
                                            fileName: "[project]/app/lens/page.tsx",
                                            lineNumber: 171,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-red-300 text-xs leading-relaxed",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-semibold block mb-1",
                                                    children: "Important Disclaimer"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/lens/page.tsx",
                                                    lineNumber: 173,
                                                    columnNumber: 19
                                                }, this),
                                                t('lens_disclaimer')
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/lens/page.tsx",
                                            lineNumber: 172,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/lens/page.tsx",
                                    lineNumber: 170,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/lens/page.tsx",
                                lineNumber: 169,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/lens/page.tsx",
                        lineNumber: 158,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/lens/page.tsx",
                lineNumber: 154,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/lens/page.tsx",
        lineNumber: 89,
        columnNumber: 5
    }, this);
}
_s(LensPage, "daoT0R5/ONFn5PP1kOvjYF2x6LE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$LangContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"]
    ];
});
_c = LensPage;
var _c;
__turbopack_context__.k.register(_c, "LensPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/@capacitor/camera/dist/esm/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @deprecated This enum is only meant to be used for deprecated `getPhoto` method.
 * It will be removed in a future major version of the plugin, along with `getPhoto`.
 */ __turbopack_context__.s([
    "CameraDirection",
    ()=>CameraDirection,
    "CameraErrorCode",
    ()=>CameraErrorCode,
    "CameraResultType",
    ()=>CameraResultType,
    "CameraSource",
    ()=>CameraSource,
    "EncodingType",
    ()=>EncodingType,
    "MediaType",
    ()=>MediaType,
    "MediaTypeSelection",
    ()=>MediaTypeSelection
]);
var CameraSource;
(function(CameraSource) {
    /**
     * Prompts the user to select either the photo album or take a photo.
     */ CameraSource["Prompt"] = "PROMPT";
    /**
     * Take a new photo using the camera.
     */ CameraSource["Camera"] = "CAMERA";
    /**
     * Pick an existing photo from the gallery or photo album.
     */ CameraSource["Photos"] = "PHOTOS";
})(CameraSource || (CameraSource = {}));
var CameraDirection;
(function(CameraDirection) {
    CameraDirection["Rear"] = "REAR";
    CameraDirection["Front"] = "FRONT";
})(CameraDirection || (CameraDirection = {}));
var CameraResultType;
(function(CameraResultType) {
    CameraResultType["Uri"] = "uri";
    CameraResultType["Base64"] = "base64";
    CameraResultType["DataUrl"] = "dataUrl";
})(CameraResultType || (CameraResultType = {}));
var MediaType;
(function(MediaType) {
    MediaType[MediaType["Photo"] = 0] = "Photo";
    MediaType[MediaType["Video"] = 1] = "Video";
})(MediaType || (MediaType = {}));
var MediaTypeSelection;
(function(MediaTypeSelection) {
    MediaTypeSelection[MediaTypeSelection["Photo"] = 0] = "Photo";
    MediaTypeSelection[MediaTypeSelection["Video"] = 1] = "Video";
    MediaTypeSelection[MediaTypeSelection["All"] = 2] = "All";
})(MediaTypeSelection || (MediaTypeSelection = {}));
var EncodingType;
(function(EncodingType) {
    EncodingType[EncodingType["JPEG"] = 0] = "JPEG";
    EncodingType[EncodingType["PNG"] = 1] = "PNG";
})(EncodingType || (EncodingType = {}));
var CameraErrorCode;
(function(CameraErrorCode) {
    // Permissions
    /**
     * Camera access was denied by the user.
     */ CameraErrorCode["CameraPermissionDenied"] = "OS-PLUG-CAMR-0003";
    /**
     * Photo library / gallery access was denied by the user.
     */ CameraErrorCode["GalleryPermissionDenied"] = "OS-PLUG-CAMR-0005";
    /**
     * No camera hardware is available on the device.
     */ CameraErrorCode["NoCameraAvailable"] = "OS-PLUG-CAMR-0007";
    // Take Photo
    /**
     * The user cancelled the take photo action.
     */ CameraErrorCode["TakePhotoCancelled"] = "OS-PLUG-CAMR-0006";
    /**
     * Failed to take photo.
     */ CameraErrorCode["TakePhotoFailed"] = "OS-PLUG-CAMR-0010";
    /**
     * The take photo action received invalid arguments.
     * @platform ios
     */ CameraErrorCode["TakePhotoInvalidArguments"] = "OS-PLUG-CAMR-0014";
    // Edit Photo
    /**
     * The selected file contains invalid image data.
     * @platform ios
     */ CameraErrorCode["InvalidImageData"] = "OS-PLUG-CAMR-0008";
    /**
     * Failed to edit image.
     */ CameraErrorCode["EditPhotoFailed"] = "OS-PLUG-CAMR-0009";
    /**
     * The user cancelled the edit photo action.
     */ CameraErrorCode["EditPhotoCancelled"] = "OS-PLUG-CAMR-0013";
    /**
     * The URI parameter for editing is empty.
     * @platform android
     */ CameraErrorCode["EditPhotoEmptyUri"] = "OS-PLUG-CAMR-0024";
    // Choose from Gallery
    /**
     * Failed to retrieve an image from the gallery.
     */ CameraErrorCode["ImageNotFound"] = "OS-PLUG-CAMR-0011";
    /**
     * Failed to process the selected image.
     */ CameraErrorCode["ProcessImageFailed"] = "OS-PLUG-CAMR-0012";
    /**
     * Failed to choose media from the gallery.
     */ CameraErrorCode["ChooseMediaFailed"] = "OS-PLUG-CAMR-0018";
    /**
     * The user cancelled choosing media from the gallery.
     */ CameraErrorCode["ChooseMediaCancelled"] = "OS-PLUG-CAMR-0020";
    /**
     * Failed to retrieve the media file path.
     * @platform android
     */ CameraErrorCode["MediaPathError"] = "OS-PLUG-CAMR-0021";
    /**
     * Failed to retrieve an image from the provided URI.
     */ CameraErrorCode["FetchImageFromUriFailed"] = "OS-PLUG-CAMR-0028";
    // Record Video
    /**
     * Failed to record video.
     */ CameraErrorCode["RecordVideoFailed"] = "OS-PLUG-CAMR-0016";
    /**
     * The user cancelled the video recording.
     */ CameraErrorCode["RecordVideoCancelled"] = "OS-PLUG-CAMR-0017";
    /**
     * Failed to retrieve a video from the gallery.
     * @platform ios
     */ CameraErrorCode["VideoNotFound"] = "OS-PLUG-CAMR-0025";
    // Play Video
    /**
     * Failed to play video.
     */ CameraErrorCode["PlayVideoFailed"] = "OS-PLUG-CAMR-0023";
    // General
    /**
     * Failed to encode the media result.
     * @platform ios
     */ CameraErrorCode["EncodeResultFailed"] = "OS-PLUG-CAMR-0019";
    /**
     * The selected file does not exist.
     */ CameraErrorCode["FileNotFound"] = "OS-PLUG-CAMR-0027";
    /**
     * Invalid argument provided to a plugin method.
     * @platform android
     */ CameraErrorCode["InvalidArgument"] = "OS-PLUG-CAMR-0031";
    /**
     * A general plugin error occurred.
     * @platform ios
     */ CameraErrorCode["GeneralError"] = "OS-PLUG-CAMR-0026";
})(CameraErrorCode || (CameraErrorCode = {}));
}),
"[project]/node_modules/@capacitor/camera/dist/esm/index.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Camera",
    ()=>Camera
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@capacitor/core/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$camera$2f$dist$2f$esm$2f$web$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@capacitor/camera/dist/esm/web.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$camera$2f$dist$2f$esm$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@capacitor/camera/dist/esm/definitions.js [app-client] (ecmascript)");
;
;
const Camera = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerPlugin"])('Camera', {
    web: ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$camera$2f$dist$2f$esm$2f$web$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CameraWeb"]()
});
;
;
}),
"[project]/node_modules/@capacitor/camera/dist/esm/web.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Camera",
    ()=>Camera,
    "CameraWeb",
    ()=>CameraWeb
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@capacitor/core/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$camera$2f$dist$2f$esm$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@capacitor/camera/dist/esm/definitions.js [app-client] (ecmascript)");
;
;
class CameraWeb extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WebPlugin"] {
    async takePhoto(options) {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject)=>{
            if (options.webUseInput) {
                this.takePhotoCameraInputExperience(options, resolve, reject);
            } else {
                this.takePhotoCameraExperience(options, resolve, reject);
            }
        });
    }
    async recordVideo(_options) {
        throw this.unimplemented('recordVideo is not implemented on Web.');
    }
    async playVideo(_options) {
        throw this.unimplemented('playVideo is not implemented on Web.');
    }
    async chooseFromGallery(options) {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject)=>{
            this.galleryInputExperience(options, resolve, reject);
        });
    }
    async editPhoto(_options) {
        throw this.unimplemented('editPhoto is not implemented on Web.');
    }
    async editURIPhoto(_options) {
        throw this.unimplemented('editURIPhoto is not implemented on Web.');
    }
    async getPhoto(options) {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject)=>{
            if (options.webUseInput || options.source === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$camera$2f$dist$2f$esm$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CameraSource"].Photos) {
                this.fileInputExperience(options, resolve, reject);
            } else if (options.source === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$camera$2f$dist$2f$esm$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CameraSource"].Prompt) {
                let actionSheet = document.querySelector('pwa-action-sheet');
                if (!actionSheet) {
                    actionSheet = document.createElement('pwa-action-sheet');
                    document.body.appendChild(actionSheet);
                }
                actionSheet.header = options.promptLabelHeader || 'Photo';
                actionSheet.cancelable = false;
                actionSheet.options = [
                    {
                        title: options.promptLabelPhoto || 'From Photos'
                    },
                    {
                        title: options.promptLabelPicture || 'Take Picture'
                    }
                ];
                actionSheet.addEventListener('onSelection', async (e)=>{
                    const selection = e.detail;
                    if (selection === 0) {
                        this.fileInputExperience(options, resolve, reject);
                    } else {
                        this.cameraExperience(options, resolve, reject);
                    }
                });
            } else {
                this.cameraExperience(options, resolve, reject);
            }
        });
    }
    async pickImages(_options) {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject)=>{
            this.multipleFileInputExperience(resolve, reject);
        });
    }
    async cameraExperience(options, resolve, reject) {
        await this._setupPWACameraModal(options.direction, (photo)=>this._getCameraPhoto(photo, options), ()=>this.fileInputExperience(options, resolve, reject), resolve, reject);
    }
    fileInputExperience(options, resolve, reject) {
        let input = document.querySelector('#_capacitor-camera-input');
        const cleanup = ()=>{
            var _a;
            (_a = input.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(input);
        };
        if (!input) {
            input = document.createElement('input');
            input.id = '_capacitor-camera-input';
            input.type = 'file';
            input.hidden = true;
            document.body.appendChild(input);
            input.addEventListener('change', (_e)=>{
                const file = input.files[0];
                let format = 'jpeg';
                if (file.type === 'image/png') {
                    format = 'png';
                } else if (file.type === 'image/gif') {
                    format = 'gif';
                }
                if (options.resultType === 'dataUrl' || options.resultType === 'base64') {
                    const reader = new FileReader();
                    reader.addEventListener('load', ()=>{
                        if (options.resultType === 'dataUrl') {
                            resolve({
                                dataUrl: reader.result,
                                format
                            });
                        } else if (options.resultType === 'base64') {
                            const b64 = reader.result.split(',')[1];
                            resolve({
                                base64String: b64,
                                format
                            });
                        }
                        cleanup();
                    });
                    reader.readAsDataURL(file);
                } else {
                    resolve({
                        webPath: URL.createObjectURL(file),
                        format: format
                    });
                    cleanup();
                }
            });
            input.addEventListener('cancel', (_e)=>{
                reject(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CapacitorException"]('User cancelled photos app'));
                cleanup();
            });
        }
        input.accept = 'image/*';
        input.capture = true;
        if (options.source === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$camera$2f$dist$2f$esm$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CameraSource"].Photos || options.source === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$camera$2f$dist$2f$esm$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CameraSource"].Prompt) {
            input.removeAttribute('capture');
        } else if (options.direction === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$camera$2f$dist$2f$esm$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CameraDirection"].Front) {
            input.capture = 'user';
        } else if (options.direction === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$camera$2f$dist$2f$esm$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CameraDirection"].Rear) {
            input.capture = 'environment';
        }
        input.click();
    }
    multipleFileInputExperience(resolve, reject) {
        let input = document.querySelector('#_capacitor-camera-input-multiple');
        const cleanup = ()=>{
            var _a;
            (_a = input.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(input);
        };
        if (!input) {
            input = document.createElement('input');
            input.id = '_capacitor-camera-input-multiple';
            input.type = 'file';
            input.hidden = true;
            input.multiple = true;
            document.body.appendChild(input);
            input.addEventListener('change', (_e)=>{
                const photos = [];
                // eslint-disable-next-line @typescript-eslint/prefer-for-of
                for(let i = 0; i < input.files.length; i++){
                    const file = input.files[i];
                    let format = 'jpeg';
                    if (file.type === 'image/png') {
                        format = 'png';
                    } else if (file.type === 'image/gif') {
                        format = 'gif';
                    }
                    photos.push({
                        webPath: URL.createObjectURL(file),
                        format: format
                    });
                }
                resolve({
                    photos
                });
                cleanup();
            });
            input.addEventListener('cancel', (_e)=>{
                reject(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CapacitorException"]('User cancelled photos app'));
                cleanup();
            });
        }
        input.accept = 'image/*';
        input.click();
    }
    _getCameraPhoto(photo, options) {
        return new Promise((resolve, reject)=>{
            const reader = new FileReader();
            const format = this._getFileFormat(photo);
            if (options.resultType === 'uri') {
                resolve({
                    webPath: URL.createObjectURL(photo),
                    format,
                    saved: false
                });
            } else {
                reader.readAsDataURL(photo);
                reader.onloadend = ()=>{
                    const r = reader.result;
                    if (options.resultType === 'dataUrl') {
                        resolve({
                            dataUrl: r,
                            format,
                            saved: false
                        });
                    } else {
                        resolve({
                            base64String: r.split(',')[1],
                            format,
                            saved: false
                        });
                    }
                };
                reader.onerror = (e)=>{
                    reject(e);
                };
            }
        });
    }
    async takePhotoCameraExperience(options, resolve, reject) {
        await this._setupPWACameraModal(options.cameraDirection, (photo)=>{
            var _a;
            return this._buildPhotoMediaResult(photo, (_a = options.includeMetadata) !== null && _a !== void 0 ? _a : false);
        }, ()=>this.takePhotoCameraInputExperience(options, resolve, reject), resolve, reject);
    }
    takePhotoCameraInputExperience(options, resolve, reject) {
        const input = this._createFileInput('_capacitor-camera-input-takephoto');
        const cleanup = ()=>{
            var _a;
            (_a = input.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(input);
        };
        input.onchange = async (_e)=>{
            var _a;
            if (!this._validateFileInput(input, reject, cleanup)) {
                return;
            }
            const file = input.files[0];
            resolve(await this._buildPhotoMediaResult(file, (_a = options.includeMetadata) !== null && _a !== void 0 ? _a : false));
            cleanup();
        };
        input.oncancel = ()=>{
            reject(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CapacitorException"]('User cancelled photos app'));
            cleanup();
        };
        input.accept = 'image/*';
        if (options.cameraDirection === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$camera$2f$dist$2f$esm$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CameraDirection"].Front) {
            input.capture = 'user';
        } else {
            // CameraDirection.Rear
            input.capture = 'environment';
        }
        input.click();
    }
    galleryInputExperience(options, resolve, reject) {
        var _a, _b;
        const input = this._createFileInput('_capacitor-camera-input-gallery');
        input.multiple = (_a = options.allowMultipleSelection) !== null && _a !== void 0 ? _a : false;
        const cleanup = ()=>{
            var _a;
            (_a = input.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(input);
        };
        input.onchange = async (_e)=>{
            var _a;
            if (!this._validateFileInput(input, reject, cleanup)) {
                return;
            }
            const results = [];
            // eslint-disable-next-line @typescript-eslint/prefer-for-of
            for(let i = 0; i < input.files.length; i++){
                const file = input.files[i];
                if (file.type.startsWith('image/')) {
                    results.push(await this._buildPhotoMediaResult(file, (_a = options.includeMetadata) !== null && _a !== void 0 ? _a : false));
                } else if (file.type.startsWith('video/')) {
                    const format = this._getFileFormat(file);
                    let thumbnail;
                    let resolution;
                    let duration;
                    try {
                        const videoInfo = await this._getVideoMetadata(file);
                        thumbnail = videoInfo.thumbnail;
                        if (options.includeMetadata) {
                            resolution = videoInfo.resolution;
                            duration = videoInfo.duration;
                        }
                    } catch (e) {
                        console.warn('Failed to get video metadata:', e);
                    }
                    const result = {
                        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$camera$2f$dist$2f$esm$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MediaType"].Video,
                        thumbnail,
                        webPath: URL.createObjectURL(file),
                        saved: false
                    };
                    if (options.includeMetadata) {
                        result.metadata = {
                            format,
                            resolution,
                            size: file.size,
                            creationDate: new Date(file.lastModified).toISOString(),
                            duration
                        };
                    }
                    results.push(result);
                }
            }
            resolve({
                results
            });
            cleanup();
        };
        input.oncancel = ()=>{
            reject(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CapacitorException"]('User cancelled photos app'));
            cleanup();
        };
        // Set accept attribute based on mediaType
        const mediaType = (_b = options.mediaType) !== null && _b !== void 0 ? _b : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$camera$2f$dist$2f$esm$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MediaTypeSelection"].Photo;
        if (mediaType === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$camera$2f$dist$2f$esm$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MediaTypeSelection"].Photo) {
            input.accept = 'image/*';
        } else if (mediaType === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$camera$2f$dist$2f$esm$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MediaTypeSelection"].Video) {
            input.accept = 'video/*';
        } else {
            // MediaTypeSelection.All
            input.accept = 'image/*,video/*';
        }
        input.click();
    }
    _getFileFormat(file) {
        if (file.type === 'image/png') {
            return 'png';
        } else if (file.type === 'image/gif') {
            return 'gif';
        } else if (file.type.startsWith('video/')) {
            return file.type.split('/')[1];
        } else if (file.type.startsWith('image/')) {
            return 'jpeg';
        }
        return file.type.split('/')[1] || 'jpeg';
    }
    async _buildPhotoMediaResult(file, includeMetadata) {
        const format = this._getFileFormat(file);
        const thumbnail = await this._getBase64FromFile(file);
        const result = {
            type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$camera$2f$dist$2f$esm$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MediaType"].Photo,
            thumbnail,
            webPath: URL.createObjectURL(file),
            saved: false
        };
        if (includeMetadata) {
            const resolution = await this._getImageResolution(file);
            result.metadata = {
                format,
                resolution,
                size: file.size,
                creationDate: 'lastModified' in file ? new Date(file.lastModified).toISOString() : new Date().toISOString()
            };
        }
        return result;
    }
    _validateFileInput(input, reject, cleanup) {
        if (!input.files || input.files.length === 0) {
            const message = input.multiple ? 'No files selected' : 'No file selected';
            reject(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CapacitorException"](message));
            cleanup();
            return false;
        }
        return true;
    }
    async _setupPWACameraModal(cameraDirection, onPhotoCallback, fallbackCallback, resolve, reject) {
        if (customElements.get('pwa-camera-modal')) {
            const cameraModal = document.createElement('pwa-camera-modal');
            cameraModal.facingMode = cameraDirection === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$camera$2f$dist$2f$esm$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CameraDirection"].Front ? 'user' : 'environment';
            document.body.appendChild(cameraModal);
            try {
                await cameraModal.componentOnReady();
                cameraModal.addEventListener('onPhoto', async (e)=>{
                    const photo = e.detail;
                    if (photo === null) {
                        reject(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$capacitor$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CapacitorException"]('User cancelled photos app'));
                    } else if (photo instanceof Error) {
                        reject(photo);
                    } else {
                        resolve(await onPhotoCallback(photo));
                    }
                    cameraModal.dismiss();
                    document.body.removeChild(cameraModal);
                });
                cameraModal.present();
            } catch (e) {
                fallbackCallback();
            }
        } else {
            console.error(`Unable to load PWA Element 'pwa-camera-modal'. See the docs: https://capacitorjs.com/docs/web/pwa-elements.`);
            fallbackCallback();
        }
    }
    _createFileInput(id) {
        let input = document.querySelector(`#${id}`);
        if (!input) {
            input = document.createElement('input');
            input.id = id;
            input.type = 'file';
            input.hidden = true;
            document.body.appendChild(input);
        }
        return input;
    }
    async _getImageResolution(image) {
        try {
            const bitmap = await createImageBitmap(image);
            const resolution = `${bitmap.width}x${bitmap.height}`;
            bitmap.close();
            return resolution;
        } catch (e) {
            console.warn('Failed to get image resolution:', e);
            return undefined;
        }
    }
    _getBase64FromFile(file) {
        return new Promise((resolve, reject)=>{
            const reader = new FileReader();
            reader.onloadend = ()=>{
                const dataUrl = reader.result;
                const base64 = dataUrl.split(',')[1];
                resolve(base64);
            };
            reader.onerror = (e)=>{
                reject(e);
            };
            reader.readAsDataURL(file);
        });
    }
    _getVideoMetadata(videoFile) {
        return new Promise((resolve)=>{
            const video = document.createElement('video');
            video.preload = 'metadata';
            video.muted = true;
            video.onloadedmetadata = ()=>{
                // Seek to 1 second or 10% of duration to capture thumbnail
                const seekTime = Math.min(1, video.duration * 0.1);
                video.currentTime = seekTime;
            };
            video.onseeked = ()=>{
                const result = {
                    resolution: `${video.videoWidth}x${video.videoHeight}`,
                    duration: video.duration
                };
                try {
                    const canvas = document.createElement('canvas');
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                        result.thumbnail = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
                    }
                } catch (e) {
                    console.warn('Failed to generate video thumbnail:', e);
                }
                URL.revokeObjectURL(video.src);
                resolve(result);
            };
            video.onerror = ()=>{
                // Clean up and return defaults
                URL.revokeObjectURL(video.src);
                resolve({});
            };
            video.src = URL.createObjectURL(videoFile);
        });
    }
    async checkPermissions() {
        if (typeof navigator === 'undefined' || !navigator.permissions) {
            throw this.unavailable('Permissions API not available in this browser');
        }
        try {
            // https://developer.mozilla.org/en-US/docs/Web/API/Permissions/query
            // the specific permissions that are supported varies among browsers that implement the
            // permissions API, so we need a try/catch in case 'camera' is invalid
            const permission = await window.navigator.permissions.query({
                name: 'camera'
            });
            return {
                camera: permission.state,
                photos: 'granted'
            };
        } catch (_a) {
            throw this.unavailable('Camera permissions are not available in this browser');
        }
    }
    async requestPermissions() {
        throw this.unimplemented('Not implemented on web.');
    }
    async pickLimitedLibraryPhotos() {
        throw this.unavailable('Not implemented on web.');
    }
    async getLimitedLibraryPhotos() {
        throw this.unavailable('Not implemented on web.');
    }
}
const Camera = new CameraWeb();
;
}),
"[project]/node_modules/@capacitor/core/dist/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Capacitor",
    ()=>Capacitor,
    "CapacitorCookies",
    ()=>CapacitorCookies,
    "CapacitorException",
    ()=>CapacitorException,
    "CapacitorHttp",
    ()=>CapacitorHttp,
    "ExceptionCode",
    ()=>ExceptionCode,
    "SystemBarType",
    ()=>SystemBarType,
    "SystemBars",
    ()=>SystemBars,
    "SystemBarsStyle",
    ()=>SystemBarsStyle,
    "WebPlugin",
    ()=>WebPlugin,
    "WebView",
    ()=>WebView,
    "buildRequestInit",
    ()=>buildRequestInit,
    "registerPlugin",
    ()=>registerPlugin
]);
/*! Capacitor: https://capacitorjs.com/ - MIT License */ var ExceptionCode;
(function(ExceptionCode) {
    /**
     * API is not implemented.
     *
     * This usually means the API can't be used because it is not implemented for
     * the current platform.
     */ ExceptionCode["Unimplemented"] = "UNIMPLEMENTED";
    /**
     * API is not available.
     *
     * This means the API can't be used right now because:
     *   - it is currently missing a prerequisite, such as network connectivity
     *   - it requires a particular platform or browser version
     */ ExceptionCode["Unavailable"] = "UNAVAILABLE";
})(ExceptionCode || (ExceptionCode = {}));
class CapacitorException extends Error {
    constructor(message, code, data){
        super(message);
        this.message = message;
        this.code = code;
        this.data = data;
    }
}
const getPlatformId = (win)=>{
    var _a, _b;
    if (win === null || win === void 0 ? void 0 : win.androidBridge) {
        return 'android';
    } else if ((_b = (_a = win === null || win === void 0 ? void 0 : win.webkit) === null || _a === void 0 ? void 0 : _a.messageHandlers) === null || _b === void 0 ? void 0 : _b.bridge) {
        return 'ios';
    } else {
        return 'web';
    }
};
const createCapacitor = (win)=>{
    const capCustomPlatform = win.CapacitorCustomPlatform || null;
    const cap = win.Capacitor || {};
    const Plugins = cap.Plugins = cap.Plugins || {};
    const getPlatform = ()=>{
        return capCustomPlatform !== null ? capCustomPlatform.name : getPlatformId(win);
    };
    const isNativePlatform = ()=>getPlatform() !== 'web';
    const isPluginAvailable = (pluginName)=>{
        const plugin = registeredPlugins.get(pluginName);
        if (plugin === null || plugin === void 0 ? void 0 : plugin.platforms.has(getPlatform())) {
            // JS implementation available for the current platform.
            return true;
        }
        if (getPluginHeader(pluginName)) {
            // Native implementation available.
            return true;
        }
        return false;
    };
    const getPluginHeader = (pluginName)=>{
        var _a;
        return (_a = cap.PluginHeaders) === null || _a === void 0 ? void 0 : _a.find((h)=>h.name === pluginName);
    };
    const handleError = (err)=>win.console.error(err);
    const registeredPlugins = new Map();
    const registerPlugin = (pluginName, jsImplementations = {})=>{
        const registeredPlugin = registeredPlugins.get(pluginName);
        if (registeredPlugin) {
            console.warn(`Capacitor plugin "${pluginName}" already registered. Cannot register plugins twice.`);
            return registeredPlugin.proxy;
        }
        const platform = getPlatform();
        const pluginHeader = getPluginHeader(pluginName);
        let jsImplementation;
        const loadPluginImplementation = async ()=>{
            if (!jsImplementation && platform in jsImplementations) {
                jsImplementation = typeof jsImplementations[platform] === 'function' ? jsImplementation = await jsImplementations[platform]() : jsImplementation = jsImplementations[platform];
            } else if (capCustomPlatform !== null && !jsImplementation && 'web' in jsImplementations) {
                jsImplementation = typeof jsImplementations['web'] === 'function' ? jsImplementation = await jsImplementations['web']() : jsImplementation = jsImplementations['web'];
            }
            return jsImplementation;
        };
        const createPluginMethod = (impl, prop)=>{
            var _a, _b;
            if (pluginHeader) {
                const methodHeader = pluginHeader === null || pluginHeader === void 0 ? void 0 : pluginHeader.methods.find((m)=>prop === m.name);
                if (methodHeader) {
                    if (methodHeader.rtype === 'promise') {
                        return (options)=>cap.nativePromise(pluginName, prop.toString(), options);
                    } else {
                        return (options, callback)=>cap.nativeCallback(pluginName, prop.toString(), options, callback);
                    }
                } else if (impl) {
                    return (_a = impl[prop]) === null || _a === void 0 ? void 0 : _a.bind(impl);
                }
            } else if (impl) {
                return (_b = impl[prop]) === null || _b === void 0 ? void 0 : _b.bind(impl);
            } else {
                throw new CapacitorException(`"${pluginName}" plugin is not implemented on ${platform}`, ExceptionCode.Unimplemented);
            }
        };
        const createPluginMethodWrapper = (prop)=>{
            let remove;
            const wrapper = (...args)=>{
                const p = loadPluginImplementation().then((impl)=>{
                    const fn = createPluginMethod(impl, prop);
                    if (fn) {
                        const p = fn(...args);
                        remove = p === null || p === void 0 ? void 0 : p.remove;
                        return p;
                    } else {
                        throw new CapacitorException(`"${pluginName}.${prop}()" is not implemented on ${platform}`, ExceptionCode.Unimplemented);
                    }
                });
                if (prop === 'addListener') {
                    p.remove = async ()=>remove();
                }
                return p;
            };
            // Some flair ✨
            wrapper.toString = ()=>`${prop.toString()}() { [capacitor code] }`;
            Object.defineProperty(wrapper, 'name', {
                value: prop,
                writable: false,
                configurable: false
            });
            return wrapper;
        };
        const addListener = createPluginMethodWrapper('addListener');
        const removeListener = createPluginMethodWrapper('removeListener');
        const addListenerNative = (eventName, callback)=>{
            const call = addListener({
                eventName
            }, callback);
            const remove = async ()=>{
                const callbackId = await call;
                removeListener({
                    eventName,
                    callbackId
                }, callback);
            };
            const p = new Promise((resolve)=>call.then(()=>resolve({
                        remove
                    })));
            p.remove = async ()=>{
                console.warn(`Using addListener() without 'await' is deprecated.`);
                await remove();
            };
            return p;
        };
        const proxy = new Proxy({}, {
            get (_, prop) {
                switch(prop){
                    // https://github.com/facebook/react/issues/20030
                    case '$$typeof':
                        return undefined;
                    case 'toJSON':
                        return ()=>({});
                    case 'addListener':
                        return pluginHeader ? addListenerNative : addListener;
                    case 'removeListener':
                        return removeListener;
                    default:
                        return createPluginMethodWrapper(prop);
                }
            }
        });
        Plugins[pluginName] = proxy;
        registeredPlugins.set(pluginName, {
            name: pluginName,
            proxy,
            platforms: new Set([
                ...Object.keys(jsImplementations),
                ...pluginHeader ? [
                    platform
                ] : []
            ])
        });
        return proxy;
    };
    // Add in convertFileSrc for web, it will already be available in native context
    if (!cap.convertFileSrc) {
        cap.convertFileSrc = (filePath)=>filePath;
    }
    cap.getPlatform = getPlatform;
    cap.handleError = handleError;
    cap.isNativePlatform = isNativePlatform;
    cap.isPluginAvailable = isPluginAvailable;
    cap.registerPlugin = registerPlugin;
    cap.Exception = CapacitorException;
    cap.DEBUG = !!cap.DEBUG;
    cap.isLoggingEnabled = !!cap.isLoggingEnabled;
    return cap;
};
const initCapacitorGlobal = (win)=>win.Capacitor = createCapacitor(win);
const Capacitor = /*#__PURE__*/ initCapacitorGlobal(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : ("TURBOPACK compile-time truthy", 1) ? /*TURBOPACK member replacement*/ __turbopack_context__.g : "TURBOPACK unreachable");
const registerPlugin = Capacitor.registerPlugin;
/**
 * Base class web plugins should extend.
 */ class WebPlugin {
    constructor(){
        this.listeners = {};
        this.retainedEventArguments = {};
        this.windowListeners = {};
    }
    addListener(eventName, listenerFunc) {
        let firstListener = false;
        const listeners = this.listeners[eventName];
        if (!listeners) {
            this.listeners[eventName] = [];
            firstListener = true;
        }
        this.listeners[eventName].push(listenerFunc);
        // If we haven't added a window listener for this event and it requires one,
        // go ahead and add it
        const windowListener = this.windowListeners[eventName];
        if (windowListener && !windowListener.registered) {
            this.addWindowListener(windowListener);
        }
        if (firstListener) {
            this.sendRetainedArgumentsForEvent(eventName);
        }
        const remove = async ()=>this.removeListener(eventName, listenerFunc);
        const p = Promise.resolve({
            remove
        });
        return p;
    }
    async removeAllListeners() {
        this.listeners = {};
        for(const listener in this.windowListeners){
            this.removeWindowListener(this.windowListeners[listener]);
        }
        this.windowListeners = {};
    }
    notifyListeners(eventName, data, retainUntilConsumed) {
        const listeners = this.listeners[eventName];
        if (!listeners) {
            if (retainUntilConsumed) {
                let args = this.retainedEventArguments[eventName];
                if (!args) {
                    args = [];
                }
                args.push(data);
                this.retainedEventArguments[eventName] = args;
            }
            return;
        }
        listeners.forEach((listener)=>listener(data));
    }
    hasListeners(eventName) {
        var _a;
        return !!((_a = this.listeners[eventName]) === null || _a === void 0 ? void 0 : _a.length);
    }
    registerWindowListener(windowEventName, pluginEventName) {
        this.windowListeners[pluginEventName] = {
            registered: false,
            windowEventName,
            pluginEventName,
            handler: (event)=>{
                this.notifyListeners(pluginEventName, event);
            }
        };
    }
    unimplemented(msg = 'not implemented') {
        return new Capacitor.Exception(msg, ExceptionCode.Unimplemented);
    }
    unavailable(msg = 'not available') {
        return new Capacitor.Exception(msg, ExceptionCode.Unavailable);
    }
    async removeListener(eventName, listenerFunc) {
        const listeners = this.listeners[eventName];
        if (!listeners) {
            return;
        }
        const index = listeners.indexOf(listenerFunc);
        this.listeners[eventName].splice(index, 1);
        // If there are no more listeners for this type of event,
        // remove the window listener
        if (!this.listeners[eventName].length) {
            this.removeWindowListener(this.windowListeners[eventName]);
        }
    }
    addWindowListener(handle) {
        window.addEventListener(handle.windowEventName, handle.handler);
        handle.registered = true;
    }
    removeWindowListener(handle) {
        if (!handle) {
            return;
        }
        window.removeEventListener(handle.windowEventName, handle.handler);
        handle.registered = false;
    }
    sendRetainedArgumentsForEvent(eventName) {
        const args = this.retainedEventArguments[eventName];
        if (!args) {
            return;
        }
        delete this.retainedEventArguments[eventName];
        args.forEach((arg)=>{
            this.notifyListeners(eventName, arg);
        });
    }
}
const WebView = /*#__PURE__*/ registerPlugin('WebView');
/******** END WEB VIEW PLUGIN ********/ /******** COOKIES PLUGIN ********/ /**
 * Safely web encode a string value (inspired by js-cookie)
 * @param str The string value to encode
 */ const encode = (str)=>encodeURIComponent(str).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
/**
 * Safely web decode a string value (inspired by js-cookie)
 * @param str The string value to decode
 */ const decode = (str)=>str.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
class CapacitorCookiesPluginWeb extends WebPlugin {
    async getCookies() {
        const cookies = document.cookie;
        const cookieMap = {};
        cookies.split(';').forEach((cookie)=>{
            if (cookie.length <= 0) return;
            // Replace first "=" with CAP_COOKIE to prevent splitting on additional "="
            let [key, value] = cookie.replace(/=/, 'CAP_COOKIE').split('CAP_COOKIE');
            key = decode(key).trim();
            value = decode(value).trim();
            cookieMap[key] = value;
        });
        return cookieMap;
    }
    async setCookie(options) {
        try {
            // Safely Encoded Key/Value
            const encodedKey = encode(options.key);
            const encodedValue = encode(options.value);
            // Clean & sanitize options
            const expires = options.expires ? `; expires=${options.expires.replace('expires=', '')}` : '';
            const path = (options.path || '/').replace('path=', ''); // Default is "path=/"
            const domain = options.url != null && options.url.length > 0 ? `domain=${options.url}` : '';
            document.cookie = `${encodedKey}=${encodedValue || ''}${expires}; path=${path}; ${domain};`;
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async deleteCookie(options) {
        try {
            document.cookie = `${options.key}=; Max-Age=0`;
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async clearCookies() {
        try {
            const cookies = document.cookie.split(';') || [];
            for (const cookie of cookies){
                document.cookie = cookie.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async clearAllCookies() {
        try {
            await this.clearCookies();
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
const CapacitorCookies = registerPlugin('CapacitorCookies', {
    web: ()=>new CapacitorCookiesPluginWeb()
});
// UTILITY FUNCTIONS
/**
 * Read in a Blob value and return it as a base64 string
 * @param blob The blob value to convert to a base64 string
 */ const readBlobAsBase64 = async (blob)=>new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.onload = ()=>{
            const base64String = reader.result;
            // remove prefix "data:application/pdf;base64,"
            resolve(base64String.indexOf(',') >= 0 ? base64String.split(',')[1] : base64String);
        };
        reader.onerror = (error)=>reject(error);
        reader.readAsDataURL(blob);
    });
/**
 * Normalize an HttpHeaders map by lowercasing all of the values
 * @param headers The HttpHeaders object to normalize
 */ const normalizeHttpHeaders = (headers = {})=>{
    const originalKeys = Object.keys(headers);
    const loweredKeys = Object.keys(headers).map((k)=>k.toLocaleLowerCase());
    const normalized = loweredKeys.reduce((acc, key, index)=>{
        acc[key] = headers[originalKeys[index]];
        return acc;
    }, {});
    return normalized;
};
/**
 * Builds a string of url parameters that
 * @param params A map of url parameters
 * @param shouldEncode true if you should encodeURIComponent() the values (true by default)
 */ const buildUrlParams = (params, shouldEncode = true)=>{
    if (!params) return null;
    const output = Object.entries(params).reduce((accumulator, entry)=>{
        const [key, value] = entry;
        let encodedValue;
        let item;
        if (Array.isArray(value)) {
            item = '';
            value.forEach((str)=>{
                encodedValue = shouldEncode ? encodeURIComponent(str) : str;
                item += `${key}=${encodedValue}&`;
            });
            // last character will always be "&" so slice it off
            item.slice(0, -1);
        } else {
            encodedValue = shouldEncode ? encodeURIComponent(value) : value;
            item = `${key}=${encodedValue}`;
        }
        return `${accumulator}&${item}`;
    }, '');
    // Remove initial "&" from the reduce
    return output.substr(1);
};
/**
 * Build the RequestInit object based on the options passed into the initial request
 * @param options The Http plugin options
 * @param extra Any extra RequestInit values
 */ const buildRequestInit = (options, extra = {})=>{
    const output = Object.assign({
        method: options.method || 'GET',
        headers: options.headers
    }, extra);
    // Get the content-type
    const headers = normalizeHttpHeaders(options.headers);
    const type = headers['content-type'] || '';
    // If body is already a string, then pass it through as-is.
    if (typeof options.data === 'string') {
        output.body = options.data;
    } else if (type.includes('application/x-www-form-urlencoded')) {
        const params = new URLSearchParams();
        for (const [key, value] of Object.entries(options.data || {})){
            params.set(key, value);
        }
        output.body = params.toString();
    } else if (type.includes('multipart/form-data') || options.data instanceof FormData) {
        const form = new FormData();
        if (options.data instanceof FormData) {
            options.data.forEach((value, key)=>{
                form.append(key, value);
            });
        } else {
            for (const key of Object.keys(options.data)){
                form.append(key, options.data[key]);
            }
        }
        output.body = form;
        const headers = new Headers(output.headers);
        headers.delete('content-type'); // content-type will be set by `window.fetch` to includy boundary
        output.headers = headers;
    } else if (type.includes('application/json') || typeof options.data === 'object') {
        output.body = JSON.stringify(options.data);
    }
    return output;
};
// WEB IMPLEMENTATION
class CapacitorHttpPluginWeb extends WebPlugin {
    /**
     * Perform an Http request given a set of options
     * @param options Options to build the HTTP request
     */ async request(options) {
        const requestInit = buildRequestInit(options, options.webFetchExtra);
        const urlParams = buildUrlParams(options.params, options.shouldEncodeUrlParams);
        const url = urlParams ? `${options.url}?${urlParams}` : options.url;
        const response = await fetch(url, requestInit);
        const contentType = response.headers.get('content-type') || '';
        // Default to 'text' responseType so no parsing happens
        let { responseType = 'text' } = response.ok ? options : {};
        // If the response content-type is json, force the response to be json
        if (contentType.includes('application/json')) {
            responseType = 'json';
        }
        let data;
        let blob;
        switch(responseType){
            case 'arraybuffer':
            case 'blob':
                blob = await response.blob();
                data = await readBlobAsBase64(blob);
                break;
            case 'json':
                data = await response.json();
                break;
            case 'document':
            case 'text':
            default:
                data = await response.text();
        }
        // Convert fetch headers to Capacitor HttpHeaders
        const headers = {};
        response.headers.forEach((value, key)=>{
            headers[key] = value;
        });
        return {
            data,
            headers,
            status: response.status,
            url: response.url
        };
    }
    /**
     * Perform an Http GET request given a set of options
     * @param options Options to build the HTTP request
     */ async get(options) {
        return this.request(Object.assign(Object.assign({}, options), {
            method: 'GET'
        }));
    }
    /**
     * Perform an Http POST request given a set of options
     * @param options Options to build the HTTP request
     */ async post(options) {
        return this.request(Object.assign(Object.assign({}, options), {
            method: 'POST'
        }));
    }
    /**
     * Perform an Http PUT request given a set of options
     * @param options Options to build the HTTP request
     */ async put(options) {
        return this.request(Object.assign(Object.assign({}, options), {
            method: 'PUT'
        }));
    }
    /**
     * Perform an Http PATCH request given a set of options
     * @param options Options to build the HTTP request
     */ async patch(options) {
        return this.request(Object.assign(Object.assign({}, options), {
            method: 'PATCH'
        }));
    }
    /**
     * Perform an Http DELETE request given a set of options
     * @param options Options to build the HTTP request
     */ async delete(options) {
        return this.request(Object.assign(Object.assign({}, options), {
            method: 'DELETE'
        }));
    }
}
const CapacitorHttp = registerPlugin('CapacitorHttp', {
    web: ()=>new CapacitorHttpPluginWeb()
});
/******** END HTTP PLUGIN ********/ /******** SYSTEM BARS PLUGIN ********/ /**
 * Available status bar styles.
 */ var SystemBarsStyle;
(function(SystemBarsStyle) {
    /**
     * Light system bar content on a dark background.
     *
     * @since 8.0.0
     */ SystemBarsStyle["Dark"] = "DARK";
    /**
     * For dark system bar content on a light background.
     *
     * @since 8.0.0
     */ SystemBarsStyle["Light"] = "LIGHT";
    /**
     * The style is based on the device appearance or the underlying content.
     * If the device is using Dark mode, the system bars content will be light.
     * If the device is using Light mode, the system bars content will be dark.
     *
     * @since 8.0.0
     */ SystemBarsStyle["Default"] = "DEFAULT";
})(SystemBarsStyle || (SystemBarsStyle = {}));
/**
 * Available system bar types.
 */ var SystemBarType;
(function(SystemBarType) {
    /**
     * The top status bar on both Android and iOS.
     *
     * @since 8.0.0
     */ SystemBarType["StatusBar"] = "StatusBar";
    /**
     * The navigation bar (or gesture bar on iOS) on both Android and iOS.
     *
     * @since 8.0.0
     */ SystemBarType["NavigationBar"] = "NavigationBar";
})(SystemBarType || (SystemBarType = {}));
class SystemBarsPluginWeb extends WebPlugin {
    async setStyle() {
        this.unavailable('not available for web');
    }
    async setAnimation() {
        this.unavailable('not available for web');
    }
    async show() {
        this.unavailable('not available for web');
    }
    async hide() {
        this.unavailable('not available for web');
    }
}
const SystemBars = registerPlugin('SystemBars', {
    web: ()=>new SystemBarsPluginWeb()
});
;
}),
]);

//# sourceMappingURL=_1vyufn3._.js.map