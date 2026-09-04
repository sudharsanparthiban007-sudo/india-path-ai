(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/AskAssistantWidget.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AskAssistantWidget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$LangContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/LangContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const STARTER_PROMPTS = {
    en: [
        'What is the dress code for Kapaleeshwarar Temple?',
        'Best time to visit Shore Temple in Mahabalipuram?',
        'What should I pack for a 3-day temple tour?',
        'Famous local food to try in Madurai?'
    ],
    ta: [
        'கபாலீஸ்வரர் கோயிலுக்கு என்ன ஆடை அணிய வேண்டும்?',
        'மாமல்லபுரம் கடற்கரை கோயில் பார்க்க சிறந்த நேரம் எது?',
        'மதுரையில் சாப்பிட வேண்டிய புகழ்பெற்ற உணவுகள்?',
        '3 நாள் பயணத்திற்கு என்னென்ன கொண்டு செல்ல வேண்டும்?'
    ],
    hi: [
        'कपालेश्वर मंदिर के लिए क्या ड्रेस कोड है?',
        'महाबलीपुरम शोर मंदिर जाने का सबसे अच्छा समय क्या है?',
        'मदुरै में क्या प्रसिद्ध भोजन खाना चाहिए?',
        'मंदिर यात्रा के लिए क्या पैक करना चाहिए?'
    ]
};
function AskAssistantWidget() {
    _s();
    const { lang, t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$LangContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            id: 'welcome',
            role: 'assistant',
            content: lang === 'ta' ? 'வணக்கம்! நான் உங்கள் தமிழ்நாடு AI பயண வழிகாட்டி. சுற்றுலா, கோயில்கள், போக்குவரத்து அல்லது உணவு பற்றி என்னிடம் கேளுங்கள்!' : lang === 'hi' ? 'नमस्ते! मैं आपका तमिलनाडु AI यात्रा सहायक हूँ। दर्शनीय स्थलों, मंदिरों, परिवहन या भोजन के बारे में कुछ भी पूछें!' : 'Vanakkam! I am your Tamil Nadu AI Travel Assistant. Ask me anything about monuments, packing, opening hours, local food, or transit!'
        }
    ]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const scrollToBottom = ()=>{
        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth'
        });
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AskAssistantWidget.useEffect": ()=>{
            if (isOpen) {
                scrollToBottom();
            }
        }
    }["AskAssistantWidget.useEffect"], [
        messages,
        isOpen
    ]);
    const handleSend = async (textToSend)=>{
        const query = (textToSend || input).trim();
        if (!query || loading) return;
        const userMsg = {
            id: `user-${Date.now()}`,
            role: 'user',
            content: query
        };
        setMessages((prev)=>[
                ...prev,
                userMsg
            ]);
        setInput('');
        setLoading(true);
        try {
            // Build history for multi-turn
            const history = messages.filter((m)=>m.id !== 'welcome').map((m)=>({
                    role: m.role,
                    content: m.content
                }));
            const res = await fetch('/api/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: query,
                    history,
                    language: lang
                })
            });
            const data = await res.json();
            const assistantMsg = {
                id: `assistant-${Date.now()}`,
                role: 'assistant',
                content: data.content || 'I could not generate a response. Please try again.',
                isEmergency: data.isEmergency,
                groundedPois: data.groundedPois,
                mock: data.mock
            };
            setMessages((prev)=>[
                    ...prev,
                    assistantMsg
                ]);
        } catch (err) {
            console.error('Ask Assistant error:', err);
            setMessages((prev)=>[
                    ...prev,
                    {
                        id: `error-${Date.now()}`,
                        role: 'assistant',
                        content: 'Unable to reach the assistant. Please check your connection.'
                    }
                ]);
        } finally{
            setLoading(false);
        }
    };
    const handleKeyDown = (e)=>{
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
        }
    };
    const clearChat = ()=>{
        setMessages([
            {
                id: 'welcome',
                role: 'assistant',
                content: lang === 'ta' ? 'அரட்டை அழிக்கப்பட்டது. தமிழ்நாடு சுற்றுலா பற்றி புதிய கேள்வியை கேளுங்கள்!' : lang === 'hi' ? 'चैट साफ़ की गई। तमिलनाडु यात्रा के बारे में नया प्रश्न पूछें!' : 'Chat reset. Ask me anything about Tamil Nadu travel and heritage sites!'
            }
        ]);
    };
    const starterList = STARTER_PROMPTS[lang] || STARTER_PROMPTS.en;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-6 right-6 z-50",
                children: !isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    id: "open-ask-assistant-btn",
                    onClick: ()=>setIsOpen(true),
                    className: "group flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-semibold text-sm shadow-2xl shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all",
                    "aria-label": "Open AI Travel Assistant",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xl animate-bounce",
                            children: "💬"
                        }, void 0, false, {
                            fileName: "[project]/components/AskAssistantWidget.tsx",
                            lineNumber: 161,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-bold tracking-wide",
                            children: "Ask AI"
                        }, void 0, false, {
                            fileName: "[project]/components/AskAssistantWidget.tsx",
                            lineNumber: 162,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/AskAssistantWidget.tsx",
                    lineNumber: 155,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/AskAssistantWidget.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[420px] max-h-[85vh] h-[580px] glass rounded-3xl border border-white/20 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-5 py-3.5 bg-gradient-to-r from-orange-500/30 via-amber-500/20 to-stone-900 border-b border-white/10 flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white text-sm font-bold shadow-md shadow-orange-500/30",
                                        children: "✨"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AskAssistantWidget.tsx",
                                        lineNumber: 173,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-bold text-white text-sm flex items-center gap-1.5",
                                                children: [
                                                    "AI Travel Assistant",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] px-2 py-0.5 rounded-full bg-orange-500/30 text-orange-300 font-normal",
                                                        children: "Grounded POI"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AskAssistantWidget.tsx",
                                                        lineNumber: 179,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AskAssistantWidget.tsx",
                                                lineNumber: 177,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] text-stone-400",
                                                children: "Tamil Nadu Heritage Companion"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AskAssistantWidget.tsx",
                                                lineNumber: 183,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AskAssistantWidget.tsx",
                                        lineNumber: 176,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AskAssistantWidget.tsx",
                                lineNumber: 172,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: clearChat,
                                        title: "Reset conversation",
                                        className: "p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-white/10 text-xs transition-colors",
                                        children: "🔄"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AskAssistantWidget.tsx",
                                        lineNumber: 188,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        id: "close-ask-assistant-btn",
                                        onClick: ()=>setIsOpen(false),
                                        className: "p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-white/10 text-sm transition-colors",
                                        "aria-label": "Close assistant",
                                        children: "✕"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AskAssistantWidget.tsx",
                                        lineNumber: 195,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AskAssistantWidget.tsx",
                                lineNumber: 187,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AskAssistantWidget.tsx",
                        lineNumber: 171,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 p-4 overflow-y-auto space-y-3.5 text-sm",
                        children: [
                            messages.map((m)=>{
                                const isUser = m.role === 'user';
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `flex flex-col ${isUser ? 'items-end' : 'items-start'}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `max-w-[88%] rounded-2xl px-4 py-3 leading-relaxed ${isUser ? 'bg-orange-500 text-white rounded-br-none shadow-md shadow-orange-500/20' : m.isEmergency ? 'bg-red-950/90 border border-red-500 text-red-100 rounded-bl-none shadow-xl shadow-red-900/40' : 'bg-stone-900/90 border border-white/10 text-stone-200 rounded-bl-none'}`,
                                        children: [
                                            m.isEmergency && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-3 p-2.5 bg-red-600/30 border border-red-500/50 rounded-xl flex items-center justify-between gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-xs text-red-200",
                                                        children: "🚨 Emergency Safety Alert"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AskAssistantWidget.tsx",
                                                        lineNumber: 227,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/sos",
                                                        onClick: ()=>setIsOpen(false),
                                                        className: "px-3 py-1 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg transition-colors",
                                                        children: "Open SOS Tab →"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AskAssistantWidget.tsx",
                                                        lineNumber: 230,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AskAssistantWidget.tsx",
                                                lineNumber: 226,
                                                columnNumber: 23
                                            }, this),
                                            m.groundedPois && m.groundedPois.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-2 flex flex-wrap items-center gap-1 text-[11px] text-orange-400",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "🏛️ Grounded in:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AskAssistantWidget.tsx",
                                                        lineNumber: 243,
                                                        columnNumber: 25
                                                    }, this),
                                                    m.groundedPois.map((poi)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "px-2 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/30 font-medium",
                                                            children: poi
                                                        }, poi, false, {
                                                            fileName: "[project]/components/AskAssistantWidget.tsx",
                                                            lineNumber: 245,
                                                            columnNumber: 27
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AskAssistantWidget.tsx",
                                                lineNumber: 242,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "whitespace-pre-wrap text-[13px]",
                                                children: m.content
                                            }, void 0, false, {
                                                fileName: "[project]/components/AskAssistantWidget.tsx",
                                                lineNumber: 256,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AskAssistantWidget.tsx",
                                        lineNumber: 215,
                                        columnNumber: 19
                                    }, this)
                                }, m.id, false, {
                                    fileName: "[project]/components/AskAssistantWidget.tsx",
                                    lineNumber: 211,
                                    columnNumber: 17
                                }, this);
                            }),
                            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-xs text-orange-400 animate-pulse px-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "✨ AI is generating grounded advice…"
                                }, void 0, false, {
                                    fileName: "[project]/components/AskAssistantWidget.tsx",
                                    lineNumber: 264,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/AskAssistantWidget.tsx",
                                lineNumber: 263,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: messagesEndRef
                            }, void 0, false, {
                                fileName: "[project]/components/AskAssistantWidget.tsx",
                                lineNumber: 267,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AskAssistantWidget.tsx",
                        lineNumber: 207,
                        columnNumber: 11
                    }, this),
                    messages.length === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 pb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[11px] font-semibold text-stone-400 mb-1.5 uppercase tracking-wider",
                                children: "Quick Questions:"
                            }, void 0, false, {
                                fileName: "[project]/components/AskAssistantWidget.tsx",
                                lineNumber: 273,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-1.5",
                                children: starterList.map((prompt, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleSend(prompt),
                                        className: "text-left text-[11px] px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/40 text-stone-300 hover:text-white hover:bg-orange-500/10 transition-all",
                                        children: prompt
                                    }, idx, false, {
                                        fileName: "[project]/components/AskAssistantWidget.tsx",
                                        lineNumber: 278,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/AskAssistantWidget.tsx",
                                lineNumber: 276,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AskAssistantWidget.tsx",
                        lineNumber: 272,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 py-1.5 bg-stone-950/60 border-t border-white/5 text-[10px] text-stone-500 text-center",
                        children: "⚠️ AI travel advice only — verify official opening hours and fares locally."
                    }, void 0, false, {
                        fileName: "[project]/components/AskAssistantWidget.tsx",
                        lineNumber: 291,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-3 bg-stone-900/95 border-t border-white/10 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                id: "ask-assistant-input",
                                type: "text",
                                value: input,
                                onChange: (e)=>setInput(e.target.value),
                                onKeyDown: handleKeyDown,
                                placeholder: "Ask about temples, packing, food, hours…",
                                disabled: loading,
                                className: "flex-1 bg-stone-950/80 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-orange-500 transition-all"
                            }, void 0, false, {
                                fileName: "[project]/components/AskAssistantWidget.tsx",
                                lineNumber: 297,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                id: "ask-assistant-send-btn",
                                onClick: ()=>handleSend(),
                                disabled: loading || !input.trim(),
                                className: "px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 disabled:opacity-40 text-white font-bold text-xs transition-all shadow-md",
                                children: "Send"
                            }, void 0, false, {
                                fileName: "[project]/components/AskAssistantWidget.tsx",
                                lineNumber: 307,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AskAssistantWidget.tsx",
                        lineNumber: 296,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AskAssistantWidget.tsx",
                lineNumber: 169,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/AskAssistantWidget.tsx",
        lineNumber: 151,
        columnNumber: 5
    }, this);
}
_s(AskAssistantWidget, "32cKU3J5O5KeS0PduoB32jYys48=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$LangContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"]
    ];
});
_c = AskAssistantWidget;
var _c;
__turbopack_context__.k.register(_c, "AskAssistantWidget");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/AuthProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AuthProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/react.js [app-client] (ecmascript)");
'use client';
;
;
function AuthProvider({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SessionProvider"], {
        children: children
    }, void 0, false, {
        fileName: "[project]/components/AuthProvider.tsx",
        lineNumber: 7,
        columnNumber: 10
    }, this);
}
_c = AuthProvider;
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/NavBar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NavBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/react.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$LangContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/LangContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const LANGS = [
    {
        code: 'en',
        label: 'EN'
    },
    {
        code: 'ta',
        label: 'தமிழ்'
    },
    {
        code: 'hi',
        label: 'हिंदी'
    }
];
function NavBar() {
    _s();
    const { t, lang, setLang } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$LangContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"])();
    const { data: session } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [menuOpen, setMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const links = [
        {
            href: '/',
            key: 'nav_home'
        },
        {
            href: '/planner',
            key: 'nav_planner'
        },
        {
            href: '/events',
            key: 'nav_events'
        },
        {
            href: '/ask',
            key: 'nav_ask'
        },
        {
            href: '/explore',
            key: 'nav_explore'
        },
        {
            href: '/bookings',
            key: 'Bookings'
        },
        {
            href: '/lens',
            key: 'nav_lens'
        },
        {
            href: '/sos',
            key: 'nav_sos'
        },
        {
            href: '/complaint',
            key: 'nav_complaint'
        },
        {
            href: '/dashboard',
            key: 'nav_dashboard'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "fixed top-0 inset-x-0 z-50 glass border-b border-white/10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto px-4 h-16 flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "flex items-center gap-2 group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-orange-500/20",
                                children: "IP"
                            }, void 0, false, {
                                fileName: "[project]/components/NavBar.tsx",
                                lineNumber: 40,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-bold text-white hidden sm:block",
                                children: t('nav_brand')
                            }, void 0, false, {
                                fileName: "[project]/components/NavBar.tsx",
                                lineNumber: 43,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/NavBar.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden lg:flex items-center gap-1",
                        children: links.map(({ href, key })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: href,
                                className: `px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${pathname === href ? 'bg-orange-500/20 text-orange-400' : 'text-stone-400 hover:text-white hover:bg-white/5'}`,
                                children: key === 'Bookings' ? '🎟️ Bookings' : t(key)
                            }, href, false, {
                                fileName: "[project]/components/NavBar.tsx",
                                lineNumber: 49,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/NavBar.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center bg-white/5 rounded-lg p-1 gap-1",
                                children: LANGS.map(({ code, label })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        id: `lang-${code}`,
                                        onClick: ()=>setLang(code),
                                        className: `px-2 py-1 rounded text-xs font-medium transition-all ${lang === code ? 'bg-orange-500 text-white' : 'text-stone-400 hover:text-white'}`,
                                        children: label
                                    }, code, false, {
                                        fileName: "[project]/components/NavBar.tsx",
                                        lineNumber: 68,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/NavBar.tsx",
                                lineNumber: 66,
                                columnNumber: 11
                            }, this),
                            session?.user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/dashboard",
                                        id: "nav-user-profile",
                                        className: "flex items-center gap-2 px-3 py-1.5 rounded-xl glass border border-orange-500/30 text-xs text-orange-300 hover:bg-orange-500/10 transition-all",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-5 h-5 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 text-white font-bold text-[10px] flex items-center justify-center",
                                                children: (session.user.name || session.user.email || 'U')[0].toUpperCase()
                                            }, void 0, false, {
                                                fileName: "[project]/components/NavBar.tsx",
                                                lineNumber: 91,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "max-w-[100px] truncate hidden sm:inline",
                                                children: session.user.name || session.user.email?.split('@')[0]
                                            }, void 0, false, {
                                                fileName: "[project]/components/NavBar.tsx",
                                                lineNumber: 94,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/NavBar.tsx",
                                        lineNumber: 86,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        id: "nav-logout-btn",
                                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signOut"])({
                                                callbackUrl: '/'
                                            }),
                                        className: "px-2.5 py-1.5 rounded-lg text-xs text-stone-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all",
                                        title: "Sign out",
                                        children: "Sign out"
                                    }, void 0, false, {
                                        fileName: "[project]/components/NavBar.tsx",
                                        lineNumber: 98,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/NavBar.tsx",
                                lineNumber: 85,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        id: "nav-login-btn",
                                        href: "/login",
                                        className: "px-3 py-1.5 rounded-lg text-xs font-medium text-stone-300 hover:text-white hover:bg-white/5 transition-all",
                                        children: "Sign in"
                                    }, void 0, false, {
                                        fileName: "[project]/components/NavBar.tsx",
                                        lineNumber: 109,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        id: "nav-signup-btn",
                                        href: "/signup",
                                        className: "px-3 py-1.5 rounded-lg bg-orange-500 text-white text-xs font-medium hover:bg-orange-400 transition-all shadow-sm",
                                        children: "Sign up"
                                    }, void 0, false, {
                                        fileName: "[project]/components/NavBar.tsx",
                                        lineNumber: 116,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/NavBar.tsx",
                                lineNumber: 108,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                id: "mobile-menu-toggle",
                                className: "lg:hidden p-2 rounded-lg text-stone-400 hover:text-white hover:bg-white/5",
                                onClick: ()=>setMenuOpen(!menuOpen),
                                "aria-label": "Toggle menu",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-5 h-5",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: menuOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M6 18L18 6M6 6l12 12"
                                    }, void 0, false, {
                                        fileName: "[project]/components/NavBar.tsx",
                                        lineNumber: 135,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M4 6h16M4 12h16M4 18h16"
                                    }, void 0, false, {
                                        fileName: "[project]/components/NavBar.tsx",
                                        lineNumber: 137,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/NavBar.tsx",
                                    lineNumber: 133,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/NavBar.tsx",
                                lineNumber: 127,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/NavBar.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/NavBar.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            menuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lg:hidden glass border-t border-white/10 px-4 pb-4 space-y-1",
                children: [
                    links.map(({ href, key })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: href,
                            onClick: ()=>setMenuOpen(false),
                            className: `block px-3 py-2 rounded-lg text-sm font-medium transition-all ${pathname === href ? 'bg-orange-500/20 text-orange-400' : 'text-stone-400 hover:text-white hover:bg-white/5'}`,
                            children: key === 'Bookings' ? '🎟️ Bookings' : t(key)
                        }, href, false, {
                            fileName: "[project]/components/NavBar.tsx",
                            lineNumber: 148,
                            columnNumber: 13
                        }, this)),
                    !session?.user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pt-2 border-t border-white/10 flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/login",
                                onClick: ()=>setMenuOpen(false),
                                className: "flex-1 py-2 text-center text-sm font-medium glass rounded-xl text-stone-300",
                                children: "Sign in"
                            }, void 0, false, {
                                fileName: "[project]/components/NavBar.tsx",
                                lineNumber: 163,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/signup",
                                onClick: ()=>setMenuOpen(false),
                                className: "flex-1 py-2 text-center text-sm font-medium bg-orange-500 rounded-xl text-white",
                                children: "Sign up"
                            }, void 0, false, {
                                fileName: "[project]/components/NavBar.tsx",
                                lineNumber: 170,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/NavBar.tsx",
                        lineNumber: 162,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/NavBar.tsx",
                lineNumber: 146,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/NavBar.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_s(NavBar, "KePwNvClMWxw4PPdrCfh8Xw91ZU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$LangContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLang"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = NavBar;
var _c;
__turbopack_context__.k.register(_c, "NavBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/LangContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LangProvider",
    ()=>LangProvider,
    "useLang",
    ()=>useLang
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/i18n.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const LangContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    lang: 'en',
    setLang: ()=>{},
    t: (key)=>key
});
function LangProvider({ children }) {
    _s();
    const [lang, setLang] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('en');
    const t = (key)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, key);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LangContext.Provider, {
        value: {
            lang,
            setLang,
            t
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/LangContext.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_s(LangProvider, "3SAFWOAEFwr4n9Xzl+qKKYmrg6c=");
_c = LangProvider;
function useLang() {
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(LangContext);
}
_s1(useLang, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
var _c;
__turbopack_context__.k.register(_c, "LangProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/i18n.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "t",
    ()=>t,
    "translations",
    ()=>translations
]);
const translations = {
    en: {
        // Nav
        nav_home: 'Home',
        nav_planner: 'Trip Planner',
        nav_events: 'Events',
        nav_ask: 'Ask AI',
        nav_explore: 'Explore Map',
        nav_lens: 'Heritage Lens',
        nav_sos: 'SOS',
        nav_complaint: 'Report Issue',
        nav_dashboard: 'Dashboard',
        nav_brand: 'India Path AI',
        // Home
        home_hero_title: 'Discover Tamil Nadu',
        home_hero_subtitle: 'Your AI-powered heritage travel companion — plan trips, explore monuments, and navigate with confidence.',
        home_cta_planner: 'Plan My Trip',
        home_cta_explore: 'Explore the Map',
        home_feature_planner_title: 'AI Trip Planner',
        home_feature_planner_desc: 'Get a personalised day-by-day itinerary powered by AI.',
        home_feature_events_title: 'Culture & Events',
        home_feature_events_desc: 'Filter seasonal festivals and living heritage traditions across Tamil Nadu.',
        home_feature_ask_title: 'AI Tourism Assistant',
        home_feature_ask_desc: 'Instant answers grounded in verified monument data, dress codes, and packing tips.',
        home_feature_map_title: 'Interactive Map',
        home_feature_map_desc: 'Explore heritage sites with real transit info.',
        home_feature_lens_title: 'Heritage Lens',
        home_feature_lens_desc: 'Upload a photo of an inscription or monument for AI context.',
        home_feature_sos_title: 'Tourist SOS',
        home_feature_sos_desc: 'Emergency numbers and incident logging — always at hand.',
        home_feature_complaint_title: 'Report an Issue',
        home_feature_complaint_desc: 'AI-routed complaints to the right government department.',
        // Planner
        planner_title: 'AI Trip Planner',
        planner_destination: 'Destination',
        planner_days: 'Number of Days',
        planner_interests: 'Interests',
        planner_interest_heritage: 'Heritage',
        planner_interest_temples: 'Temples',
        planner_interest_food: 'Food',
        planner_interest_nature: 'Nature',
        planner_interest_beaches: 'Beaches',
        planner_generate: 'Generate Itinerary',
        planner_generating: 'Generating…',
        planner_day: 'Day',
        planner_my_trips: 'My Saved Trips',
        planner_no_trips: 'No trips saved yet.',
        planner_mock_note: '⚠️ Mock response — add GEMINI_API_KEY to .env.local for real AI output.',
        planner_save_success: 'Trip saved!',
        // Explore
        explore_title: 'Explore Map',
        explore_filter_all: 'All',
        explore_filter_heritage: 'Heritage',
        explore_filter_temple: 'Temple',
        explore_filter_beach: 'Beach',
        explore_filter_transit: 'Transit Hub',
        explore_filter_nature: 'Nature',
        explore_transit_info: 'Transit Info',
        explore_how_to_get: 'How to Get There',
        // Lens
        lens_title: 'Heritage Lens',
        lens_upload: 'Upload or drag a photo of a monument, inscription, or sign',
        lens_analyze: 'Analyse with AI',
        lens_analyzing: 'Analysing…',
        lens_result_title: 'AI Interpretation',
        lens_disclaimer: 'AI-generated interpretation — a starting point only. Verify with a licensed guide, museum, or the Archaeological Survey of India before treating this as historical fact, especially for translating an inscription.',
        lens_mock_note: '⚠️ Mock response — add GEMINI_API_KEY to .env.local for real AI output.',
        // SOS
        sos_title: 'Tourist SOS',
        sos_button: 'SOS — Emergency',
        sos_demo_banner: 'DEMO MODE — this prototype does not contact real emergency services.',
        sos_location_captured: 'Location captured',
        sos_location_denied: 'Location permission denied.',
        sos_emergency_numbers: 'India Emergency Numbers',
        sos_general: '112 — General Emergency',
        sos_police: '100 — Police',
        sos_fire: '101 — Fire',
        sos_ambulance: '108 — Ambulance',
        sos_embassy: 'Contact Your Embassy',
        sos_embassy_note: 'Look up your country\'s current embassy number in India. This app does not store embassy numbers.',
        sos_note_label: 'Optional note',
        sos_log_incident: 'Log Incident',
        sos_logged: 'Incident logged locally.',
        sos_incident_log: 'Incident Log',
        sos_no_incidents: 'No incidents logged yet.',
        // Complaint
        complaint_title: 'Report an Issue',
        complaint_proto_banner: 'Prototype only — complaints are stored locally and are not sent to any real government office.',
        complaint_photo: 'Photo (optional)',
        complaint_description: 'Description',
        complaint_location: 'Location',
        complaint_use_gps: 'Use My Location',
        complaint_submit: 'Submit Complaint',
        complaint_submitting: 'Submitting…',
        complaint_success: 'Complaint submitted!',
        complaint_ai_classification: 'AI Classification',
        complaint_urgency: 'Urgency',
        complaint_department: 'Department',
        // Dashboard
        dashboard_title: 'Officer Dashboard',
        dashboard_proto_banner: 'Prototype only — complaints are stored locally and are not sent to any real government office.',
        dashboard_no_complaints: 'No complaints yet.',
        dashboard_advance: 'Advance Status',
        dashboard_status_submitted: 'Submitted',
        dashboard_status_review: 'In Review',
        dashboard_status_resolved: 'Resolved',
        // General
        close: 'Close',
        save: 'Save',
        cancel: 'Cancel',
        loading: 'Loading…'
    },
    ta: {
        nav_home: 'முகப்பு',
        nav_planner: 'பயண திட்டமிடல்',
        nav_events: 'நிகழ்வுகள்',
        nav_ask: 'AI கேள்விகள்',
        nav_explore: 'வரைபட ஆய்வு',
        nav_lens: 'பாரம்பரிய லென்ஸ்',
        nav_sos: 'SOS',
        nav_complaint: 'புகார் அளிக்க',
        nav_dashboard: 'டாஷ்போர்டு',
        nav_brand: 'India Path AI',
        home_hero_title: 'தமிழ்நாட்டை கண்டுபிடிக்கவும்',
        home_hero_subtitle: 'AI-இயக்கும் பாரம்பரிய பயண துணை — பயணங்களைத் திட்டமிடுங்கள், நினைவுச்சின்னங்களை ஆராயுங்கள்.',
        home_cta_planner: 'என் பயணத்தை திட்டமிடு',
        home_cta_explore: 'வரைபடத்தை ஆராயுங்கள்',
        home_feature_planner_title: 'AI பயண திட்டமிடல்',
        home_feature_planner_desc: 'AI ஆல் இயக்கப்படும் நாள்வாரியான தனிப்பயன் பயண திட்டம்.',
        home_feature_events_title: 'கலாச்சாரம் & திருவிழாக்கள்',
        home_feature_events_desc: 'தமிழ்நாட்டின் பாரம்பரிய திருவிழாக்கள் மற்றும் நடன விழாக்களை காண்க.',
        home_feature_ask_title: 'AI சுற்றுலா உதவியாளர்',
        home_feature_ask_desc: 'நினைவுச்சின்னங்கள், ஆடை குறிப்புகள் மற்றும் பயண கேள்விகளுக்கு உடனடி பதில்கள்.',
        home_feature_map_title: 'ஊடாடும் வரைபடம்',
        home_feature_map_desc: 'போக்குவரத்து தகவலுடன் பாரம்பரிய தளங்களை ஆராயுங்கள்.',
        home_feature_lens_title: 'பாரம்பரிய லென்ஸ்',
        home_feature_lens_desc: 'AI சூழலுக்கு கல்வெட்டு அல்லது நினைவுச்சின்னத்தின் புகைப்படத்தை பதிவேற்றவும்.',
        home_feature_sos_title: 'சுற்றுலா SOS',
        home_feature_sos_desc: 'அவசர எண்கள் மற்றும் சம்பவ பதிவு — எப்போதும் கையில்.',
        home_feature_complaint_title: 'சிக்கலை புகாரளிக்கவும்',
        home_feature_complaint_desc: 'சரியான அரசு துறைக்கு AI வழிசெலுத்தும் புகார்கள்.',
        planner_title: 'AI பயண திட்டமிடல்',
        planner_destination: 'இலக்கு',
        planner_days: 'நாட்களின் எண்ணிக்கை',
        planner_interests: 'ஆர்வங்கள்',
        planner_interest_heritage: 'பாரம்பரியம்',
        planner_interest_temples: 'கோயில்கள்',
        planner_interest_food: 'உணவு',
        planner_interest_nature: 'இயற்கை',
        planner_interest_beaches: 'கடற்கரைகள்',
        planner_generate: 'பயண திட்டத்தை உருவாக்கு',
        planner_generating: 'உருவாக்குகிறது…',
        planner_day: 'நாள்',
        planner_my_trips: 'என் சேமித்த பயணங்கள்',
        planner_no_trips: 'இன்னும் பயணங்கள் சேமிக்கப்படவில்லை.',
        planner_mock_note: '⚠️ மாதிரி பதில் — உண்மையான AI வெளியீட்டிற்கு GEMINI_API_KEY சேர்க்கவும்.',
        planner_save_success: 'பயணம் சேமிக்கப்பட்டது!',
        explore_title: 'வரைபட ஆய்வு',
        explore_filter_all: 'அனைத்தும்',
        explore_filter_heritage: 'பாரம்பரியம்',
        explore_filter_temple: 'கோயில்',
        explore_filter_beach: 'கடற்கரை',
        explore_filter_transit: 'போக்குவரத்து மையம்',
        explore_filter_nature: 'இயற்கை',
        explore_transit_info: 'போக்குவரத்து தகவல்',
        explore_how_to_get: 'எப்படி செல்வது',
        lens_title: 'பாரம்பரிய லென்ஸ்',
        lens_upload: 'நினைவுச்சின்னம், கல்வெட்டு அல்லது அடையாளத்தின் புகைப்படத்தை பதிவேற்றவும்',
        lens_analyze: 'AI உடன் பகுப்பாய்வு செய்',
        lens_analyzing: 'பகுப்பாய்வு செய்கிறது…',
        lens_result_title: 'AI விளக்கம்',
        lens_disclaimer: 'AI ஆல் உருவாக்கப்பட்ட விளக்கம் — தொடக்க புள்ளி மட்டுமே. இதை வரலாற்று உண்மையாக கருதுவதற்கு முன், உரிமம் பெற்ற வழிகாட்டி, அருங்காட்சியகம் அல்லது இந்திய தொல்லியல் கணக்கெடுப்புடன் சரிபார்க்கவும், குறிப்பாக கல்வெட்டை மொழிபெயர்க்கும்போது.',
        lens_mock_note: '⚠️ மாதிரி பதில் — உண்மையான AI வெளியீட்டிற்கு GEMINI_API_KEY சேர்க்கவும்.',
        sos_title: 'சுற்றுலா SOS',
        sos_button: 'SOS — அவசரநிலை',
        sos_demo_banner: 'டெமோ பயன்முறை — இந்த முன்மாதிரி உண்மையான அவசரகால சேவைகளை தொடர்பு கொள்ளாது.',
        sos_location_captured: 'இடம் பிடிக்கப்பட்டது',
        sos_location_denied: 'இட அனுமதி மறுக்கப்பட்டது.',
        sos_emergency_numbers: 'இந்திய அவசர எண்கள்',
        sos_general: '112 — பொது அவசரநிலை',
        sos_police: '100 — காவல்துறை',
        sos_fire: '101 — தீயணைப்பு',
        sos_ambulance: '108 — ஆம்புலன்ஸ்',
        sos_embassy: 'உங்கள் தூதரகத்தை தொடர்பு கொள்ளுங்கள்',
        sos_embassy_note: 'இந்தியாவில் உங்கள் நாட்டின் தூதரக எண்ணை தேடுங்கள். இந்த ஆப் தூதரக எண்களை சேமிக்காது.',
        sos_note_label: 'விருப்பமான குறிப்பு',
        sos_log_incident: 'சம்பவத்தை பதிவு செய்',
        sos_logged: 'சம்பவம் உள்ளூரில் பதிவு செய்யப்பட்டது.',
        sos_incident_log: 'சம்பவ பதிவு',
        sos_no_incidents: 'இன்னும் சம்பவங்கள் பதிவு செய்யப்படவில்லை.',
        complaint_title: 'சிக்கலை புகாரளிக்கவும்',
        complaint_proto_banner: 'முன்மாதிரி மட்டுமே — புகார்கள் உள்ளூரில் சேமிக்கப்படுகின்றன, எந்த உண்மையான அரசு அலுவலகத்திற்கும் அனுப்பப்படவில்லை.',
        complaint_photo: 'புகைப்படம் (விருப்பமானது)',
        complaint_description: 'விவரிப்பு',
        complaint_location: 'இடம்',
        complaint_use_gps: 'என் இடத்தை பயன்படுத்து',
        complaint_submit: 'புகார் சமர்ப்பி',
        complaint_submitting: 'சமர்ப்பிக்கிறது…',
        complaint_success: 'புகார் சமர்ப்பிக்கப்பட்டது!',
        complaint_ai_classification: 'AI வகைப்படுத்தல்',
        complaint_urgency: 'அவசரம்',
        complaint_department: 'துறை',
        dashboard_title: 'அதிகாரி டாஷ்போர்டு',
        dashboard_proto_banner: 'முன்மாதிரி மட்டுமே — புகார்கள் உள்ளூரில் சேமிக்கப்படுகின்றன, எந்த உண்மையான அரசு அலுவலகத்திற்கும் அனுப்பப்படவில்லை.',
        dashboard_no_complaints: 'இன்னும் புகார்கள் இல்லை.',
        dashboard_advance: 'நிலையை முன்னேற்று',
        dashboard_status_submitted: 'சமர்ப்பிக்கப்பட்டது',
        dashboard_status_review: 'மதிப்பாய்வில்',
        dashboard_status_resolved: 'தீர்க்கப்பட்டது',
        close: 'மூடு',
        save: 'சேமி',
        cancel: 'ரத்து செய்',
        loading: 'ஏற்றுகிறது…'
    },
    hi: {
        nav_home: 'होम',
        nav_planner: 'यात्रा योजनाकार',
        nav_events: 'उत्सव एवं कार्यक्रम',
        nav_ask: 'AI से पूछें',
        nav_explore: 'मानचित्र देखें',
        nav_lens: 'विरासत लेंस',
        nav_sos: 'SOS',
        nav_complaint: 'शिकायत दर्ज करें',
        nav_dashboard: 'डैशबोर्ड',
        nav_brand: 'India Path AI',
        home_hero_title: 'तमिलनाडु की खोज करें',
        home_hero_subtitle: 'AI-संचालित विरासत यात्रा सहायक — यात्राएं योजनाबद्ध करें, स्मारकों की खोज करें।',
        home_cta_planner: 'मेरी यात्रा की योजना बनाएं',
        home_cta_explore: 'मानचित्र देखें',
        home_feature_planner_title: 'AI यात्रा योजनाकार',
        home_feature_planner_desc: 'AI द्वारा संचालित व्यक्तिगत दिन-दर-दिन यात्रा कार्यक्रम।',
        home_feature_events_title: 'संस्कृति एवं उत्सव',
        home_feature_events_desc: 'तमिलनाडु के मौसमी त्योहारों और पारंपरिक उत्सवों की खोज करें।',
        home_feature_ask_title: 'AI पर्यटन सहायक',
        home_feature_ask_desc: 'स्मारकों, पैकिंग और ड्रेस कोड के प्रश्नों के सटीक और तत्काल उत्तर।',
        home_feature_map_title: 'इंटरएक्टिव मानचित्र',
        home_feature_map_desc: 'वास्तविक परिवहन जानकारी के साथ विरासत स्थलों की खोज करें।',
        home_feature_lens_title: 'विरासत लेंस',
        home_feature_lens_desc: 'AI संदर्भ के लिए किसी शिलालेख या स्मारक की फोटो अपलोड करें।',
        home_feature_sos_title: 'पर्यटक SOS',
        home_feature_sos_desc: 'आपातकालीन नंबर और घटना लॉगिंग — हमेशा हाथ में।',
        home_feature_complaint_title: 'समस्या रिपोर्ट करें',
        home_feature_complaint_desc: 'सही सरकारी विभाग को AI द्वारा निर्देशित शिकायतें।',
        planner_title: 'AI यात्रा योजनाकार',
        planner_destination: 'गंतव्य',
        planner_days: 'दिनों की संख्या',
        planner_interests: 'रुचियां',
        planner_interest_heritage: 'विरासत',
        planner_interest_temples: 'मंदिर',
        planner_interest_food: 'भोजन',
        planner_interest_nature: 'प्रकृति',
        planner_interest_beaches: 'समुद्र तट',
        planner_generate: 'यात्रा कार्यक्रम बनाएं',
        planner_generating: 'बना रहा है…',
        planner_day: 'दिन',
        planner_my_trips: 'मेरी सहेजी गई यात्राएं',
        planner_no_trips: 'अभी तक कोई यात्रा सहेजी नहीं।',
        planner_mock_note: '⚠️ नकली प्रतिक्रिया — वास्तविक AI आउटपुट के लिए GEMINI_API_KEY जोड़ें।',
        planner_save_success: 'यात्रा सहेजी गई!',
        explore_title: 'मानचित्र देखें',
        explore_filter_all: 'सभी',
        explore_filter_heritage: 'विरासत',
        explore_filter_temple: 'मंदिर',
        explore_filter_beach: 'समुद्र तट',
        explore_filter_transit: 'ट्रांजिट हब',
        explore_filter_nature: 'प्रकृति',
        explore_transit_info: 'परिवहन जानकारी',
        explore_how_to_get: 'कैसे पहुंचें',
        lens_title: 'विरासत लेंस',
        lens_upload: 'किसी स्मारक, शिलालेख, या संकेत की फोटो अपलोड करें या खींचें',
        lens_analyze: 'AI से विश्लेषण करें',
        lens_analyzing: 'विश्लेषण हो रहा है…',
        lens_result_title: 'AI व्याख्या',
        lens_disclaimer: 'AI-जनित व्याख्या — केवल एक प्रारंभिक बिंदु। इसे ऐतिहासिक तथ्य मानने से पहले किसी लाइसेंस प्राप्त गाइड, संग्रहालय, या भारतीय पुरातत्व सर्वेक्षण से सत्यापित करें, विशेष रूप से शिलालेख का अनुवाद करते समय।',
        lens_mock_note: '⚠️ नकली प्रतिक्रिया — वास्तविक AI आउटपुट के लिए GEMINI_API_KEY जोड़ें।',
        sos_title: 'पर्यटक SOS',
        sos_button: 'SOS — आपातकाल',
        sos_demo_banner: 'डेमो मोड — यह प्रोटोटाइप वास्तविक आपातकालीन सेवाओं से संपर्क नहीं करता।',
        sos_location_captured: 'स्थान कैप्चर किया गया',
        sos_location_denied: 'स्थान अनुमति अस्वीकार।',
        sos_emergency_numbers: 'भारतीय आपातकालीन नंबर',
        sos_general: '112 — सामान्य आपातकाल',
        sos_police: '100 — पुलिस',
        sos_fire: '101 — अग्निशमन',
        sos_ambulance: '108 — एम्बुलेंस',
        sos_embassy: 'अपना दूतावास संपर्क करें',
        sos_embassy_note: 'भारत में अपने देश का वर्तमान दूतावास नंबर खोजें। यह ऐप दूतावास नंबर संग्रहीत नहीं करता।',
        sos_note_label: 'वैकल्पिक नोट',
        sos_log_incident: 'घटना लॉग करें',
        sos_logged: 'घटना स्थानीय रूप से लॉग की गई।',
        sos_incident_log: 'घटना लॉग',
        sos_no_incidents: 'अभी तक कोई घटना लॉग नहीं।',
        complaint_title: 'समस्या रिपोर्ट करें',
        complaint_proto_banner: 'केवल प्रोटोटाइप — शिकायतें स्थानीय रूप से संग्रहीत हैं और किसी भी वास्तविक सरकारी कार्यालय को नहीं भेजी जाती हैं।',
        complaint_photo: 'फोटो (वैकल्पिक)',
        complaint_description: 'विवरण',
        complaint_location: 'स्थान',
        complaint_use_gps: 'मेरा स्थान उपयोग करें',
        complaint_submit: 'शिकायत जमा करें',
        complaint_submitting: 'जमा हो रहा है…',
        complaint_success: 'शिकायत जमा हुई!',
        complaint_ai_classification: 'AI वर्गीकरण',
        complaint_urgency: 'अत्यावश्यकता',
        complaint_department: 'विभाग',
        dashboard_title: 'अधिकारी डैशबोर्ड',
        dashboard_proto_banner: 'केवल प्रोटोटाइप — शिकायतें स्थानीय रूप से संग्रहीत हैं और किसी भी वास्तविक सरकारी कार्यालय को नहीं भेजी जाती हैं।',
        dashboard_no_complaints: 'अभी तक कोई शिकायत नहीं।',
        dashboard_advance: 'स्थिति आगे बढ़ाएं',
        dashboard_status_submitted: 'जमा किया',
        dashboard_status_review: 'समीक्षा में',
        dashboard_status_resolved: 'हल किया',
        close: 'बंद करें',
        save: 'सहेजें',
        cancel: 'रद्द करें',
        loading: 'लोड हो रहा है…'
    }
};
function t(lang, key) {
    return translations[lang]?.[key] ?? translations.en[key] ?? key;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_03apmsz._.js.map