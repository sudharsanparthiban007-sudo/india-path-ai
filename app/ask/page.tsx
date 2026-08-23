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
    'What should I pack for a 4-day Tamil Nadu temple tour?',
    'Is Shore Temple in Mahabalipuram worth visiting if I only have 1 day?',
    'What are the dress codes and pooja hours at Meenakshi Amman Temple?',
    'What authentic local dishes should I try in Madurai and Thanjavur?',
  ],
  ta: [
    '4 நாள் தமிழ்நாடு கோயில் பயணத்திற்கு என்னென்ன கொண்டு செல்ல வேண்டும்?',
    '1 நாள் மட்டுமே இருந்தால் மாமல்லபுரம் கடற்கரை கோயில் செல்லலாமா?',
    'மீனாட்சி அம்மன் கோயிலுக்கு என்ன ஆடை அணிய வேண்டும்?',
    'மதுரை மற்றும் தஞ்சாவூரில் சாப்பிட வேண்டிய சிறந்த உணவுகள்?',
  ],
  hi: [
    'तमिलनाडु मंदिर यात्रा के लिए क्या पैक करना चाहिए?',
    'यदि मेरे पास केवल 1 दिन है तो क्या महाबलीपुरम जाना सार्थक है?',
    'मीनाक्षी अम्मन मंदिर में दर्शन और पूजा का समय क्या है?',
    'मदुरै और तंजावुर में कौन सा पारंपरिक भोजन खाना चाहिए?',
  ],
};

export default function AskPage() {
  const { lang } = useLang();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        lang === 'ta'
          ? 'வணக்கம்! நான் உங்கள் தமிழ்நாடு AI பயண வழிகாட்டி. சுற்றுலா, கோயில்கள், போக்குவரத்து, உணவு அல்லது ஆடை குறிப்புகள் பற்றி என்னிடம் கேளுங்கள்!'
          : lang === 'hi'
          ? 'नमस्ते! मैं आपका तमिलनाडु AI यात्रा सहायक हूँ। दर्शनीय स्थलों, स्मारकों, पैकिंग, भोजन या परिवहन के बारे में कुछ भी पूछें!'
          : 'Vanakkam! I am your Tamil Nadu AI Travel Assistant. Ask me anything about monument history, opening hours, temple dress codes, transit, packing advice, or local culinary recommendations!',
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
            ? 'चैट साफ़ की गई। नया प्रश्न पूछें!'
            : 'Chat reset. Ask me anything about Tamil Nadu travel and heritage destinations!',
      },
    ]);
  };

  const starterList = STARTER_PROMPTS[lang] || STARTER_PROMPTS.en;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold gradient-text flex items-center gap-2.5">
            <span>✨</span> AI Tourism Assistant
          </h1>
          <p className="text-stone-400 text-sm mt-1">
            Grounded in Tamil Nadu heritage monuments, transit routes, and cultural guidance
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={clearChat}
            className="px-3.5 py-2 rounded-xl glass border border-white/20 text-xs text-stone-300 hover:text-white hover:border-orange-500/40 transition-all flex items-center gap-1.5"
          >
            <span>🔄</span> Reset Chat
          </button>
          <Link
            href="/planner"
            className="px-4 py-2 rounded-xl bg-orange-500/20 border border-orange-500/40 text-xs text-orange-300 font-semibold hover:bg-orange-500/30 transition-all"
          >
            Open Trip Planner →
          </Link>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="glass rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col h-[640px]">
        {/* Banner */}
        <div className="px-6 py-3 bg-stone-900/90 border-b border-white/10 flex items-center justify-between text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span>Active Knowledge: Seeded Tamil Nadu POIs + Gemini AI</span>
          </div>
          <span className="text-[11px] text-stone-500 hidden sm:inline">
            Non-emergency guidance only
          </span>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((m) => {
            const isUser = m.role === 'user';
            return (
              <div
                key={m.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-5 py-4 leading-relaxed ${
                    isUser
                      ? 'bg-orange-500 text-white rounded-br-none shadow-lg shadow-orange-500/20 text-sm'
                      : m.isEmergency
                      ? 'bg-red-950/90 border border-red-500 text-red-100 rounded-bl-none shadow-xl'
                      : 'bg-stone-900/90 border border-white/10 text-stone-200 rounded-bl-none text-sm'
                  }`}
                >
                  {/* Emergency Alert Card */}
                  {m.isEmergency && (
                    <div className="mb-4 p-4 bg-red-600/30 border border-red-500/60 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <div className="font-bold text-sm text-red-200">
                          🚨 Emergency Redirection
                        </div>
                        <div className="text-xs text-red-300/90">
                          Use the in-app SOS emergency screen for GPS capture & direct calls
                        </div>
                      </div>
                      <Link
                        href="/sos"
                        className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl transition-all shadow-md flex-shrink-0"
                      >
                        Go to SOS Page 🚨
                      </Link>
                    </div>
                  )}

                  {/* Grounded POI badge */}
                  {m.groundedPois && m.groundedPois.length > 0 && (
                    <div className="mb-3 flex flex-wrap items-center gap-1.5 text-xs text-orange-400">
                      <span className="font-medium">🏛️ Grounded POIs:</span>
                      {m.groundedPois.map((poi) => (
                        <span
                          key={poi}
                          className="px-2.5 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-[11px]"
                        >
                          {poi}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Body Text */}
                  <div className="whitespace-pre-wrap">{m.content}</div>

                  {m.mock && (
                    <div className="mt-3 text-xs text-amber-400/80">
                      ⚡ Demo mock response — add GEMINI_API_KEY for live AI
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center gap-2 text-sm text-orange-400 animate-pulse px-3">
              <span>✨ AI Assistant is searching grounded POIs and writing advice…</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Starter Pills */}
        {messages.length === 1 && (
          <div className="px-6 py-3 bg-stone-900/50 border-t border-white/5">
            <div className="text-xs font-semibold text-stone-400 mb-2 uppercase tracking-wider">
              Suggested Questions:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {starterList.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="text-left text-xs p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/40 text-stone-300 hover:text-white hover:bg-orange-500/10 transition-all"
                >
                  💬 {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="px-6 py-2 bg-stone-950/80 border-t border-white/5 text-[11px] text-stone-500 text-center">
          ⚠️ AI-generated travel guidance — not official information. Confirm entry tickets and timings locally.
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-stone-900 border-t border-white/10 flex items-center gap-3">
          <input
            id="ask-page-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about Tamil Nadu travel, temple codes, packing, food, or hours…"
            disabled={loading}
            className="flex-1 bg-stone-950 border border-stone-700 rounded-xl px-4 py-3 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-orange-500 transition-all"
          />
          <button
            id="ask-page-send-btn"
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 disabled:opacity-40 text-white font-bold text-sm transition-all shadow-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
