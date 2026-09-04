'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useLang } from '@/lib/LangContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isEmergency?: boolean;
  groundedPois?: string[];
  mock?: boolean;
}

const STARTER_PROMPTS: Record<string, string[]> = {
  en: [
    'What is the dress code for Kapaleeshwarar Temple?',
    'Best time to visit Shore Temple in Mahabalipuram?',
    'What should I pack for a 3-day temple tour?',
    'Famous local food to try in Madurai?',
  ],
  ta: [
    'கபாலீஸ்வரர் கோயிலுக்கு என்ன ஆடை அணிய வேண்டும்?',
    'மாமல்லபுரம் கடற்கரை கோயில் பார்க்க சிறந்த நேரம் எது?',
    'மதுரையில் சாப்பிட வேண்டிய புகழ்பெற்ற உணவுகள்?',
    '3 நாள் பயணத்திற்கு என்னென்ன கொண்டு செல்ல வேண்டும்?',
  ],
  hi: [
    'कपालेश्वर मंदिर के लिए क्या ड्रेस कोड है?',
    'महाबलीपुरम शोर मंदिर जाने का सबसे अच्छा समय क्या है?',
    'मदुरै में क्या प्रसिद्ध भोजन खाना चाहिए?',
    'मंदिर यात्रा के लिए क्या पैक करना चाहिए?',
  ],
};

export default function AskAssistantWidget() {
  const { lang, t } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        lang === 'ta'
          ? 'வணக்கம்! நான் உங்கள் தமிழ்நாடு AI பயண வழிகாட்டி. சுற்றுலா, கோயில்கள், போக்குவரத்து அல்லது உணவு பற்றி என்னிடம் கேளுங்கள்!'
          : lang === 'hi'
          ? 'नमस्ते! मैं आपका तमिलनाडु AI यात्रा सहायक हूँ। दर्शनीय स्थलों, मंदिरों, परिवहन या भोजन के बारे में कुछ भी पूछें!'
          : 'Vanakkam! I am your Tamil Nadu AI Travel Assistant. Ask me anything about monuments, packing, opening hours, local food, or transit!',
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // Build history for multi-turn
      const history = messages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history,
          language: lang,
        }),
      });

      const data = await res.json();

      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.content || 'I could not generate a response. Please try again.',
        isEmergency: data.isEmergency,
        groundedPois: data.groundedPois,
        mock: data.mock,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Ask Assistant error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content: 'Unable to reach the assistant. Please check your connection.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content:
          lang === 'ta'
            ? 'அரட்டை அழிக்கப்பட்டது. தமிழ்நாடு சுற்றுலா பற்றி புதிய கேள்வியை கேளுங்கள்!'
            : lang === 'hi'
            ? 'चैट साफ़ की गई। तमिलनाडु यात्रा के बारे में नया प्रश्न पूछें!'
            : 'Chat reset. Ask me anything about Tamil Nadu travel and heritage sites!',
      },
    ]);
  };

  const starterList = STARTER_PROMPTS[lang] || STARTER_PROMPTS.en;

  return (
    <>
      {/* ── Floating Launcher Button ── */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            id="open-ask-assistant-btn"
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-semibold text-sm shadow-2xl shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all"
            aria-label="Open AI Travel Assistant"
          >
            <span className="text-xl animate-bounce">💬</span>
            <span className="font-bold tracking-wide">Ask AI</span>
          </button>
        )}
      </div>

      {/* ── Expanding Glassmorphic Chat Widget ── */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[420px] max-h-[85vh] h-[580px] glass rounded-3xl border border-white/20 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="px-5 py-3.5 bg-gradient-to-r from-orange-500/30 via-amber-500/20 to-stone-900 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white text-sm font-bold shadow-md shadow-orange-500/30">
                ✨
              </div>
              <div>
                <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                  AI Travel Assistant
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/30 text-orange-300 font-normal">
                    Grounded POI
                  </span>
                </h3>
                <p className="text-[11px] text-stone-400">Tamil Nadu Heritage Companion</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={clearChat}
                title="Reset conversation"
                className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-white/10 text-xs transition-colors"
              >
                🔄
              </button>
              <button
                id="close-ask-assistant-btn"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-white/10 text-sm transition-colors"
                aria-label="Close assistant"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-sm">
            {messages.map((m) => {
              const isUser = m.role === 'user';
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-4 py-3 leading-relaxed ${
                      isUser
                        ? 'bg-orange-500 text-white rounded-br-none shadow-md shadow-orange-500/20'
                        : m.isEmergency
                        ? 'bg-red-950/90 border border-red-500 text-red-100 rounded-bl-none shadow-xl shadow-red-900/40'
                        : 'bg-stone-900/90 border border-white/10 text-stone-200 rounded-bl-none'
                    }`}
                  >
                    {/* Emergency Banner Alert */}
                    {m.isEmergency && (
                      <div className="mb-3 p-2.5 bg-red-600/30 border border-red-500/50 rounded-xl flex items-center justify-between gap-2">
                        <span className="font-bold text-xs text-red-200">
                          🚨 Emergency Safety Alert
                        </span>
                        <Link
                          href="/sos"
                          onClick={() => setIsOpen(false)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg transition-colors"
                        >
                          Open SOS Tab →
                        </Link>
                      </div>
                    )}

                    {/* Grounded POI badge */}
                    {m.groundedPois && m.groundedPois.length > 0 && (
                      <div className="mb-2 flex flex-wrap items-center gap-1 text-[11px] text-orange-400">
                        <span>🏛️ Grounded in:</span>
                        {m.groundedPois.map((poi) => (
                          <span
                            key={poi}
                            className="px-2 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/30 font-medium"
                          >
                            {poi}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Message content */}
                    <div className="whitespace-pre-wrap text-[13px]">{m.content}</div>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-orange-400 animate-pulse px-2">
                <span>✨ AI is generating grounded advice…</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Starter Pills (shown when only welcome message exists) */}
          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <div className="text-[11px] font-semibold text-stone-400 mb-1.5 uppercase tracking-wider">
                Quick Questions:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {starterList.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    className="text-left text-[11px] px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/40 text-stone-300 hover:text-white hover:bg-orange-500/10 transition-all"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Footer Disclaimer */}
          <div className="px-4 py-1.5 bg-stone-950/60 border-t border-white/5 text-[10px] text-stone-500 text-center">
            ⚠️ AI travel advice only — verify official opening hours and fares locally.
          </div>

          {/* Input Form */}
          <div className="p-3 bg-stone-900/95 border-t border-white/10 flex items-center gap-2">
            <input
              id="ask-assistant-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about temples, packing, food, hours…"
              disabled={loading}
              className="flex-1 bg-stone-950/80 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-orange-500 transition-all"
            />
            <button
              id="ask-assistant-send-btn"
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 disabled:opacity-40 text-white font-bold text-xs transition-all shadow-md"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
