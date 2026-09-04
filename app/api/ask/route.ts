import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { Language } from '@/lib/i18n';

const EMERGENCY_KEYWORDS = [
  'emergency', 'accident', 'medical', 'heart attack', 'chest pain', 'bleeding',
  'ambulance', 'police', 'fire', 'assault', 'robbery', 'crime', 'threat',
  'danger', 'hospital', 'injury', 'injured', 'sos', 'save me', 'urgent help',
  'help me please', 'dying', 'poison', 'snake bite', 'drowning', 'attacked',
  'அவசரம்', 'விபத்து', 'மருத்துவம்', 'ஆம்புலன்ஸ்', 'காவல்துறை', 'காப்பாற்றுங்கள்',
  'ஆபத்து', 'தீ', 'காயம்', 'மருத்துவமனை',
  'आपातकाल', 'दुर्घटना', 'चिकित्सा', 'एम्बुलेंस', 'पुलिस', 'बचाओ',
  'खतरा', 'आग', 'चोट', 'अस्पताल'
];

function isEmergencyQuery(text: string): boolean {
  const lower = text.toLowerCase();
  return EMERGENCY_KEYWORDS.some((kw) => lower.includes(kw.toLowerCase()));
}

function getEmergencyResponse(language: Language) {
  if (language === 'ta') {
    return {
      isEmergency: true,
      content: `🚨 **அவசர உதவி தேவை**

இந்த AI உதவியாளர் மருத்துவ அல்லது அவசர சேவைகளை வழங்க முடியாது.

உடனடியாக **Tourist SOS பக்கத்திற்கு** செல்லவும் அல்லது இந்தியாவின் அதிகாரப்பூர்வ அவசர எண்களை நேரடியாக அழைக்கவும்:

• **112** — தேசிய பொது அவசர எண்
• **108** — இலவச ஆம்புலன்ஸ் & மருத்துவ உதவி
• **100** — காவல்துறை
• **101** — தீயணைப்பு & மீட்பு சேவை
• **1091** — பெண்கள் உதவி எண்

உங்கள் பாதுகாப்பு மிக முக்கியமானது. உடனடியாக இந்த எண்களில் ஒன்றை தொடர்பு கொள்ளவும்.`,
      mock: false,
    };
  }

  if (language === 'hi') {
    return {
      isEmergency: true,
      content: `🚨 **आपातकालीन सहायता आवश्यक**

यह AI सहायक चिकित्सा या आपातकालीन सेवाएं प्रदान नहीं कर सकता है।

कृपया तुरंत **Tourist SOS पेज** पर जाएं या भारत के आधिकारिक आपातकालीन नंबरों पर कॉल करें:

• **112** — राष्ट्रीय एकीकृत आपातकालीन नंबर
• **108** — मुफ्त एम्बुलेंस और चिकित्सा सेवा
• **100** — पुलिस
• **101** — अग्निशमन और बचाव सेवा
• **1091** — महिला हेल्पलाइन

आपकी सुरक्षा सर्वोच्च प्राथमिकता है। कृपया तुरंत इनमें से किसी एक नंबर पर संपर्क करें।`,
      mock: false,
    };
  }

  return {
    isEmergency: true,
    content: `🚨 **EMERGENCY ASSISTANCE REQUIRED**

This AI assistant cannot provide medical, safety, or emergency dispatch services.

Please immediately navigate to the **[Tourist SOS page](/sos)** or call India's official emergency numbers directly:

• **112** — National Unified Emergency Service
• **108** — Free Emergency Ambulance & Medical Dispatch
• **100** — Police Control Room
• **101** — Fire & Rescue Service
• **1091** — Women Helpline

Your safety is the top priority. Please call one of these numbers or use the in-app SOS page for emergency GPS logging.`,
    mock: false,
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history = [], language = 'en' } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const lang = (language as Language) || 'en';

    // ─── 1. NON-NEGOTIABLE SAFETY CHECK: Emergency Interception ─────────────
    if (isEmergencyQuery(message)) {
      return NextResponse.json(getEmergencyResponse(lang));
    }

    // ─── 2. POI GROUNDING: Find relevant database POIs ──────────────────────
    let allPois: any[] = [];
    try {
      allPois = await prisma.pointOfInterest.findMany();
    } catch {
      allPois = [];
    }

    if (!allPois || allPois.length === 0) {
      allPois = (await import('@/lib/seedData')).SEEDED_POIS;
    }
    const queryLower = message.toLowerCase();

    // Match POIs by city or name
    const matchedPois = allPois.filter((p) => {
      const nameMatch = queryLower.includes(p.name.toLowerCase()) || p.name.toLowerCase().includes(queryLower);
      const cityMatch = queryLower.includes(p.city.toLowerCase());
      return nameMatch || cityMatch;
    });

    const groundingContext = matchedPois.length > 0
      ? matchedPois.map((p) =>
          `- **${p.name}** (${p.city}, Category: ${p.category})\n  Description: ${p.description}\n  Transit Info: ${p.transitInfo}`
        ).join('\n\n')
      : 'No specific in-app POI directly matched this query. Use general knowledge about Tamil Nadu tourism.';

    // ─── 3. Check for Gemini / AI API Key ───────────────────────────────────
    const geminiKey = process.env.GEMINI_API_KEY;
    const hasGeminiKey =
      geminiKey &&
      geminiKey.trim() !== '' &&
      geminiKey.trim() !== 'your-gemini-api-key' &&
      geminiKey.trim() !== 'YOUR_GEMINI_API_KEY_HERE' &&
      !geminiKey.includes('YOUR_GEMINI_API_KEY');

    const openrouterKey = process.env.OPENROUTERAI_API_KEY || process.env.OPENROUTER_API_KEY;
    const hasOpenrouterKey =
      openrouterKey &&
      openrouterKey.trim() !== '' &&
      openrouterKey.trim() !== 'sk-or-v1-...' &&
      openrouterKey.startsWith('sk-or-');

    if (!hasGeminiKey && !hasOpenrouterKey) {
      return NextResponse.json(
        {
          error:
            'Gemini AI is not configured. Please add your GEMINI_API_KEY to .env.local and restart the server.',
          mock: false,
        },
        { status: 503 }
      );
    }

    // ─── 4. Call Gemini AI (Direct or OpenRouter) ───────────────────────────
    try {
      const langName = lang === 'ta' ? 'Tamil' : lang === 'hi' ? 'Hindi' : 'English';

      const systemInstruction = `You are "India Path AI Travel Guide", a knowledgeable, warm, and helpful AI tourism assistant specializing in Tamil Nadu heritage travel.
You answer open-ended tourist questions including packing advice, temple dress codes, food recommendations, opening hours, best seasons to visit, and itinerary evaluations (e.g. "is X worth visiting for 1 day?").

GROUNDED IN-APP POI DATA:
${groundingContext}

INSTRUCTIONS:
1. When the user asks about destinations or monuments included in the GROUNDED IN-APP POI DATA above, use those specific details (historical background, location, transit tips) for accurate answers.
2. If asked about places or topics outside the in-app POIs, answer using your broad, accurate knowledge of Tamil Nadu tourism.
3. For temple visits, always advise appropriate modest attire (covering shoulders and knees, removing footwear outside).
4. Clearly state that travel advice is AI-generated guidance and exact timings or entry tickets should be verified locally.
5. If the user asks for emergency, medical, or safety assistance, redirect them immediately to emergency number 112 and the in-app SOS tab.
6. Respond entirely and fluently in ${langName}. Use clear markdown formatting with bullet points and bold headers.`;

      let replyText = '';

      if (hasGeminiKey) {
        const { GoogleGenAI } = await import('@google/genai');
        const ai = new GoogleGenAI({ apiKey: geminiKey!.trim() });

        const formattedHistory = history.map((h: { role: string; content: string }) => ({
          role: h.role === 'user' ? 'user' : 'model',
          parts: [{ text: h.content }],
        }));

        const contents = [
          ...formattedHistory,
          { role: 'user', parts: [{ text: message }] },
        ];

        let response;
        try {
          response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents,
            config: {
              systemInstruction: { parts: [{ text: systemInstruction }] },
            },
          });
        } catch {
          response = await ai.models.generateContent({
            model: 'gemini-1.5-flash',
            contents,
            config: {
              systemInstruction: { parts: [{ text: systemInstruction }] },
            },
          });
        }

        replyText = response.text || '';
      } else if (hasOpenrouterKey) {
        const orMessages = [
          { role: 'system', content: systemInstruction },
          ...history.map((h: { role: string; content: string }) => ({
            role: h.role === 'user' ? 'user' : 'assistant',
            content: h.content,
          })),
          { role: 'user', content: message },
        ];

        const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openrouterKey!.trim()}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'http://localhost:3000',
            'X-Title': 'India Path AI',
          },
          body: JSON.stringify({
            model: 'google/gemini-2.5-flash',
            max_tokens: 3000,
            messages: orMessages,
          }),
        });

        if (!res.ok) {
          const errBody = await res.text();
          throw new Error(`OpenRouter Gemini API error (${res.status}): ${errBody}`);
        }

        const data = await res.json();
        replyText = data?.choices?.[0]?.message?.content || '';
      }

      if (!replyText) {
        replyText = 'I could not generate a response. Please try rephrasing your question.';
      }

      return NextResponse.json({
        content: replyText,
        isEmergency: false,
        groundedPois: matchedPois.map((p) => p.name),
        mock: false,
      });
    } catch (aiError: any) {
      console.error('Gemini AI Assistant error:', aiError);
      const msg = aiError?.message || String(aiError);
      // Surface meaningful errors instead of silently mocking
      if (msg.includes('API_KEY') || msg.includes('PERMISSION_DENIED') || msg.includes('401') || msg.includes('403')) {
        return NextResponse.json(
          { error: 'Gemini API key is invalid or does not have permission. Check GEMINI_API_KEY in .env.local.' },
          { status: 401 }
        );
      }
      if (msg.includes('quota') || msg.includes('RESOURCE_EXHAUSTED') || msg.includes('429')) {
        return NextResponse.json(
          { error: 'Gemini API quota exceeded. Please try again later or check your billing.' },
          { status: 429 }
        );
      }
      return NextResponse.json(
        { error: `AI Assistant error: ${msg}` },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Ask Assistant API error:', error);
    return NextResponse.json({ error: 'Failed to process inquiry' }, { status: 500 });
  }
}

// ─── Mock Fallback Generator ──────────────────────────────────────────────────
function generateMockAssistantReply(
  query: string,
  matchedPois: Array<{ name: string; city: string; description: string; transitInfo: string }>,
  language: Language
): string {
  const q = query.toLowerCase();

  if (language === 'ta') {
    if (matchedPois.length > 0) {
      const poi = matchedPois[0];
      return `### 🏛️ ${poi.name} (${poi.city}) வழிகாட்டி

${poi.description}

**போக்குவரத்து & எப்படி செல்வது:**
${poi.transitInfo}

**பயண குறிப்புகள்:**
• காலை 6:00 – 11:00 அல்லது மாலை 4:30 – 8:30 நேரங்களில் செல்வது சிறந்தது.
• கோயில்களுக்கு பாரம்பரிய மற்றும் முறையான ஆடைகளை அணியவும்.
• உள்ளூர் அரசு பேருந்துகள் மற்றும் ஆட்டோக்கள் எளிதில் கிடைக்கின்றன.

*(இது AI வழிகாட்டல் — உள்ளூர் அதிகாரப்பூர்வ தகவல்களை சரிபார்க்கவும்)*`;
    }
    return `### 🌴 தமிழ்நாடு சுற்றுலா வழிகாட்டி

தமிழ்நாடு பயணம் குறித்த உங்கள் கேள்விக்கு நன்றி!

**பொதுவான பயண குறிப்புகள்:**
• **ஆடை வழிகாட்டுதல்:** கோயில்களுக்கு தோள்கள் மற்றும் முழங்கால்களை மூடும் ஆடைகள் அவசியம்.
• **உணவு பரிந்துரைகள்:** மதுரை பன் பரோட்டா, தஞ்சாவூர் சாப்பாடு, செட்டிநாடு உணவு வகைகளை ருசித்து பாருங்கள்.
• **பயண காலம்:** நவம்பர் முதல் மார்ச் வரையிலான குளிர் காலம் தமிழ்நாட்டை சுற்றிப்பார்க்க மிகவும் உகந்தது.

*(இது AI வழிகாட்டல் — உள்ளூர் அதிகாரப்பூர்வ தகவல்களை சரிபார்க்கவும்)*`;
  }

  if (language === 'hi') {
    if (matchedPois.length > 0) {
      const poi = matchedPois[0];
      return `### 🏛️ ${poi.name} (${poi.city}) यात्रा मार्गदर्शन

${poi.description}

**परिवहन एवं कैसे पहुंचे:**
${poi.transitInfo}

**सुझाव:**
• सुबह 6:00 से 11:00 या शाम 4:30 से 8:30 का समय दर्शन के लिए सर्वोत्तम है।
• मंदिर परिसर में शालीन वस्त्र पहनें और बाहर जूते-चप्पल उतारें।

*(यह AI द्वारा जनरेट किया गया यात्रा मार्गदर्शन है — स्थानीय समय की पुष्टि करें)*`;
    }
    return `### 🌴 तमिलनाडु पर्यटन सहायक

तमिलनाडु यात्रा के लिए उपयोगी सुझाव:
• **पहनावा:** मंदिरों के लिए पारंपरिक और शालीन कपड़े पहनें।
• **खान-पान:** फ़िल्टर कॉफ़ी, पारंपरिक डोसा, मदुरै की प्रसिद्ध इडली अवश्य आज़माएं।
• **उत्तम मौसम:** नवंबर से मार्च का समय भ्रमण के लिए सबसे अनुकूल है।

*(यह AI द्वारा जनरेट किया गया यात्रा मार्गदर्शन है — स्थानीय समय की पुष्टि करें)*`;
  }

  // English Mock
  if (matchedPois.length > 0) {
    const poi = matchedPois[0];
    return `### 🏛️ Visitor Guide: ${poi.name} (${poi.city})

${poi.description}

**🚍 Getting There & Transit:**
${poi.transitInfo}

**💡 Practical Visiting Tips:**
• **Best Time:** Early morning (6:30 AM – 10:00 AM) or late afternoon (4:00 PM – 7:30 PM) to avoid midday heat and peak crowds.
• **Dress Code:** Traditional modest attire is required for active temples (shoulders and knees covered; leather belts/shoes must be left at footwear stands).
• **Photography:** Allowed in outer courtyards; restricted inside main sanctums.

*(AI-generated travel guidance — please confirm exact opening hours and pooja timings locally)*`;
  }

  if (q.includes('pack') || q.includes('clothes') || q.includes('dress') || q.includes('wear')) {
    return `### 🎒 Packing & Dress Code Advice for Tamil Nadu

1. **Clothing:**
   • Lightweight, breathable cotton clothes for daytime warmth and humidity.
   • Modest clothing covering shoulders and knees for temple entry (dhotis/pants and sarees/salwars are standard).
   • Slip-on footwear (sandals/flip-flops) since shoes must be removed frequently at temples and heritage sanctums.

2. **Sun & Weather Protection:**
   • Wide-brim hat, sunglasses, and SPF 50+ sunscreen.
   • Compact umbrella for sudden coastal showers.

3. **Hydration & Essentials:**
   • Reusable insulated water bottle (stay hydrated with fresh tender coconut water available everywhere).
   • Modest cash (₹100/₹500 notes) for local auto-rickshaws and entry pass counters.

*(AI-generated travel guidance — verify local weather forecasts before travel)*`;
  }

  if (q.includes('food') || q.includes('eat') || q.includes('restaurant') || q.includes('dish')) {
    return `### 🍽️ Tamil Nadu Culinary Highlights

• **Chennai:** Authentic Mylapore filter coffee, piping hot ghee roast dosa, and idlis at Saravana Bhavan or Rayar's Mess.
• **Madurai:** Legendary soft idlis at Murugan Idli Shop, Kari Dosa, Bun Parotta, and refreshing Jigarthanda drink.
• **Thanjavur:** Traditional banana-leaf vegetarian thali with freshly ground sambar and rasam.
• **Coastal / Kanyakumari:** Fresh banana chips, Kerala-influenced coconut curries, and tropical fruit platters.

*(AI-generated food recommendations — always check food preparation preferences locally)*`;
  }

  return `### 🌴 Tamil Nadu Heritage Travel Advice

Thank you for your question! Here are key recommendations for travelling across Tamil Nadu:

• **Planning Your Route:** A classic heritage circuit is **Chennai → Mahabalipuram (2 hrs) → Thanjavur (5 hrs) → Madurai (3 hrs) → Kanyakumari (4 hrs)**.
• **1-Day Trips:** If you only have one day in a city, focus on 2 key landmarks (e.g. Shore Temple & Arjuna's Penance in Mahabalipuram, or Meenakshi Amman Temple & Nayakkar Palace in Madurai).
• **Best Season:** October through March offers pleasant weather for temple architecture walks and coastal explorations.

Ask me about any specific temple, monument, packing list, or transit route!

*(AI-generated travel guidance — please confirm ticket prices and timings locally)*`;
}
