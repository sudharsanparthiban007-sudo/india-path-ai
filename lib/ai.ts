import type { Language } from './i18n';

const MODEL = 'gemini-2.5-flash';

function getActiveGeminiKey(): { type: 'google' | 'openrouter' | null; key: string } {
  const geminiKey = process.env.GEMINI_API_KEY;
  if (
    geminiKey &&
    geminiKey.trim() !== '' &&
    geminiKey.trim() !== 'your-gemini-api-key' &&
    geminiKey.trim() !== 'YOUR_GEMINI_API_KEY_HERE' &&
    !geminiKey.includes('YOUR_GEMINI_API_KEY')
  ) {
    return { type: 'google', key: geminiKey.trim() };
  }

  const openrouterKey = process.env.OPENROUTERAI_API_KEY || process.env.OPENROUTER_API_KEY;
  if (
    openrouterKey &&
    openrouterKey.trim() !== '' &&
    openrouterKey.trim() !== 'sk-or-v1-...' &&
    openrouterKey.startsWith('sk-or-')
  ) {
    return { type: 'openrouter', key: openrouterKey.trim() };
  }

  return { type: null, key: '' };
}

function isMock(): boolean {
  const active = getActiveGeminiKey();
  return active.type === null;
}

async function callGeminiChat(systemInstruction: string, prompt: string): Promise<string> {
  const active = getActiveGeminiKey();

  if (active.type === 'google') {
    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey: active.key });
    const fullPrompt = systemInstruction ? `${systemInstruction}\n\n${prompt}` : prompt;
    const response = await generateContentWithFallback(ai, {
      model: MODEL,
      contents: fullPrompt,
    });
    return response.text ?? '';
  }

  if (active.type === 'openrouter') {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${active.key}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'India Path AI',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        max_tokens: 3000,
        messages: [
          ...(systemInstruction ? [{ role: 'system', content: systemInstruction }] : []),
          { role: 'user', content: prompt },
        ],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`OpenRouter Gemini error (${res.status}): ${errText}`);
    }

    const data = await res.json();
    return data?.choices?.[0]?.message?.content ?? '';
  }

  throw new Error('Gemini API is not configured. Please add GEMINI_API_KEY to .env.local.');
}

// ─── Trip Planner ────────────────────────────────────────────────────────────
export async function generateItinerary(
  destination: string,
  days: number,
  interests: string[],
  language: Language,
  travelMonth?: string
): Promise<{ content: string; mock: boolean }> {
  if (isMock()) {
    return { content: getMockItinerary(destination, days, language), mock: true };
  }

  try {
    const langName = language === 'ta' ? 'Tamil' : language === 'hi' ? 'Hindi' : 'English';
    const monthContext = travelMonth && travelMonth !== 'Any Month'
      ? `The planned travel month is ${travelMonth}. Tailor the recommendations to seasonal weather, festivals, and appropriate times of day for ${travelMonth}.`
      : '';

    const systemInstruction = `You are a Tamil Nadu heritage travel expert. Always output valid JSON only, without any markdown code fence wrappers or extra conversational text.`;
    const prompt = `Create a detailed ${days}-day itinerary for ${destination}, Tamil Nadu, India.
Traveller interests: ${interests.join(', ')}.
${monthContext}
Respond entirely in ${langName}.
Format strictly as JSON with this structure:
{
  "days": [
    {
      "day": 1,
      "title": "Day title",
      "places": ["Place 1", "Place 2"],
      "transport": "Transport suggestion",
      "timeBlocks": ["Morning: ...", "Afternoon: ...", "Evening: ..."],
      "foodSuggestion": "Food recommendation",
      "estimatedCost": "₹ amount"
    }
  ]
}
Only output valid JSON.`;

    const text = await callGeminiChat(systemInstruction, prompt);
    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return { content: cleaned, mock: false };
  } catch (err: any) {
    console.error('[AI Planner Error]:', err);
    throw err;
  }
}

// ─── Heritage Lens ────────────────────────────────────────────────────────────
export async function analyzeHeritageImage(
  base64Image: string,
  mimeType: string,
  language: Language
): Promise<{ content: string; mock: boolean }> {
  if (isMock()) {
    return { content: getMockHeritageAnalysis(language), mock: true };
  }

  const active = getActiveGeminiKey();
  const langName = language === 'ta' ? 'Tamil' : language === 'hi' ? 'Hindi' : 'English';

  const systemInstruction = `You are "India Path AI Heritage Lens", an expert South Indian and Tamil Nadu archaeologist and art historian.
Analyze the uploaded image of a monument, temple, sculpture, architectural element, or inscription.

Structure your response clearly in ${langName} with the following distinct sections:
1. **Monument / Landmark Identification**: Name the structure, location, or deity depicted (or best estimate).
2. **Approximate Period / Date**: Dynasty (e.g. Pallava, Chola, Pandya, Vijayanagara, Nayak) and estimated century.
3. **Historical Context**: Who commissioned it, historical background, and historical events associated with it.
4. **Cultural & Architectural Significance**: Dravidian architectural style, gopuram/vimana style, iconographic features, or inscriptions.
5. **Interesting Facts**: 2-3 fascinating facts or legends about the site.
6. **Identification Confidence**: State your confidence level (High, Moderate, Tentative) and note any uncertainty or ambiguity.

Format using bold headers and clean markdown bullet points.`;

  const prompt = `Please analyze this image and provide comprehensive heritage details according to the required sections. Respond entirely in ${langName}.`;

  try {
    if (active.type === 'google') {
      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey: active.key });

      const response = await generateContentWithFallback(ai, {
        model: MODEL,
        contents: [
          {
            parts: [
              { text: `${systemInstruction}\n\n${prompt}` },
              { inlineData: { mimeType, data: base64Image } },
            ],
          },
        ],
      });

      return { content: response.text ?? '', mock: false };
    }

    if (active.type === 'openrouter') {
      const dataUrl = `data:${mimeType};base64,${base64Image}`;
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${active.key}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'India Path AI',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          max_tokens: 3000,
          messages: [
            { role: 'system', content: systemInstruction },
            {
              role: 'user',
              content: [
                { type: 'text', text: prompt },
                { type: 'image_url', image_url: { url: dataUrl } },
              ],
            },
          ],
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`OpenRouter Gemini Vision error (${res.status}): ${errText}`);
      }

      const data = await res.json();
      const content = data?.choices?.[0]?.message?.content ?? '';
      return { content, mock: false };
    }

    throw new Error('Gemini API is not configured.');
  } catch (err: any) {
    console.error('[AI Lens Error]:', err);
    throw err;
  }
}

// ─── Complaint Classification ─────────────────────────────────────────────────
export async function classifyComplaint(
  description: string,
  language: Language
): Promise<{ department: string; urgency: string; mock: boolean }> {
  if (isMock()) {
    return {
      department: 'Heritage Site Maintenance',
      urgency: 'Medium',
      mock: true,
    };
  }

  try {
    const systemInstruction = `You are an automated government dispatch classifier for Tamil Nadu Tourism. Classify the tourist complaint accurately. Always output valid JSON only.`;
    const prompt = `Classify the following tourist complaint for Tamil Nadu government routing.
Complaint: "${description}"

Respond strictly with valid JSON only in this format:
{
  "department": "Transport Infrastructure | Sanitation | Safety & Security | Heritage Site Maintenance | Tourism Services",
  "urgency": "Low | Medium | High | Critical"
}`;

    const text = await callGeminiChat(systemInstruction, prompt);
    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    let parsed: any;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      // Fallback extraction if JSON has surrounding text
      const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        parsed = {};
      }
    }

    const validDepts = [
      'Transport Infrastructure',
      'Sanitation',
      'Safety & Security',
      'Heritage Site Maintenance',
      'Tourism Services',
    ];
    const validUrgencies = ['Low', 'Medium', 'High', 'Critical'];

    const department = validDepts.includes(parsed.department)
      ? parsed.department
      : 'Tourism Services';
    const urgency = validUrgencies.includes(parsed.urgency) ? parsed.urgency : 'Medium';

    return { department, urgency, mock: false };
  } catch (err: any) {
    console.error('[AI Complaint Classification Error]:', err);
    // Fallback to sensible defaults on AI error rather than crashing
    return {
      department: 'Tourism Services',
      urgency: 'Medium',
      mock: true,
    };
  }
}

// ─── Mock Responses ───────────────────────────────────────────────────────────
function getMockItinerary(destination: string, days: number, language: Language): string {
  const dayLabel = language === 'ta' ? 'நாள்' : language === 'hi' ? 'दिन' : 'Day';
  const mockDays = Array.from({ length: days }, (_, i) => ({
    day: i + 1,
    title: `${dayLabel} ${i + 1}: ${destination} Heritage Highlights`,
    places: ['Brihadeeswara Temple', 'Local Museum', 'Ancient Fort'],
    transport:
      language === 'ta'
        ? 'அரசு பேருந்து — 45 நிமிடம் — ₹20'
        : language === 'hi'
        ? 'सरकारी बस — 45 मिनट — ₹20'
        : 'Government bus — 45 min — ₹20',
    timeBlocks: [
      language === 'ta'
        ? 'காலை: கோயில் வருகை (7 AM – 10 AM)'
        : language === 'hi'
        ? 'सुबह: मंदिर दर्शन (7 AM – 10 AM)'
        : 'Morning: Temple visit (7 AM – 10 AM)',
      language === 'ta'
        ? 'மதியம்: அருங்காட்சியகம் (11 AM – 2 PM)'
        : language === 'hi'
        ? 'दोपहर: संग्रहालय (11 AM – 2 PM)'
        : 'Afternoon: Museum exploration (11 AM – 2 PM)',
      language === 'ta'
        ? 'மாலை: உணவு & மண்டி சுற்றுலா (5 PM – 8 PM)'
        : language === 'hi'
        ? 'शाम: भोजन और बाज़ार (5 PM – 8 PM)'
        : 'Evening: Local food & market walk (5 PM – 8 PM)',
    ],
    foodSuggestion:
      language === 'ta'
        ? 'ஸ்ரீ கிருஷ்ணா ஸ்வீட்ஸில் உள்ளூர் சப்பாத்தி & சாம்பார்'
        : language === 'hi'
        ? 'स्थानीय रेस्तरां में इडली, डोसा और सांभर'
        : 'Local thali at Murugan Idli Shop — ₹120',
    estimatedCost: '₹800 – ₹1,200',
  }));

  return JSON.stringify({ days: mockDays });
}

function getMockHeritageAnalysis(language: Language): string {
  if (language === 'ta') {
    return `இது தமிழ்நாட்டின் ஒரு பழமையான கோயிலின் புகைப்படமாக தெரிகிறது. 

**பொது விளக்கம்:** இந்த கட்டிடம் திராவிட கட்டமைப்பு பாணியில் கட்டப்பட்டுள்ளது, கோபுரம் (நுழைவாயில் கோபுரம்) மற்றும் விரிவான சிற்பங்களுடன் காணப்படுகிறது.

**வரலாற்று சூழல்:** தமிழ்நாட்டில் பல்லவர், சோழர் மற்றும் நாயக்கர் வம்சங்கள் கட்டமைப்பு மரபுகளை வடிவமைத்தன. இந்த கட்டிடம் தோராயமாக 8ஆம் முதல் 16ஆம் நூற்றாண்டிற்கிடையில் காணப்படும் கட்டமைப்பு பாணியை பிரதிபலிக்கிறது.

**(மாதிரி பதில் — உண்மையான பகுப்பாய்வுக்கு GEMINI_API_KEY சேர்க்கவும்)**`;
  }
  if (language === 'hi') {
    return `यह तमिलनाडु के एक प्राचीन मंदिर की तस्वीर प्रतीत होती है।

**सामान्य विवरण:** यह भवन द्रविड़ स्थापत्य शैली में निर्मित है, जिसमें गोपुरम (प्रवेश द्वार का मीनार) और विस्तृत मूर्तियां हैं।

**ऐतिहासिक संदर्भ:** तमिलनाडु में पल्लव, चोल और नायक राजवंशों ने वास्तुकला परंपराओं को आकार दिया। यह भवन लगभग 8वीं से 16वीं शताब्दी के बीच की स्थापत्य शैली को दर्शाता है।

**(नकली प्रतिक्रिया — वास्तविक विश्लेषण के लिए GEMINI_API_KEY जोड़ें)**`;
  }
  return `This appears to be a photograph of a heritage structure in Tamil Nadu.

**General Description:** The structure displays Dravidian architectural style, featuring a gopuram (gateway tower) with intricate carvings and sculptures typical of South Indian temple architecture.

**Historical Context:** Tamil Nadu's architectural heritage spans the Pallava, Chola, and Nayak dynasties (6th–18th centuries CE). The style visible here — stacked tiers with sculpted figures, a rectangular compound, and mandapa halls — is consistent with medieval Chola or Nayak-period construction.

**Notable Features:** The layered tower structure, the use of granite stone, and the iconographic programme of figures suggest this may be a Shaivite temple complex. Inscriptions visible on pillars or walls would require expert epigraphic analysis.

**(Mock response — add GEMINI_API_KEY to .env.local for real AI output)**`;
}
