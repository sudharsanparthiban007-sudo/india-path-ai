import type { Language } from './i18n';

const MODEL = 'gemini-2.5-flash';

function isMock(): boolean {
  const key = process.env.GEMINI_API_KEY;
  return !key || key.trim() === '';
}

function getApiKey(): string {
  return process.env.GEMINI_API_KEY!;
}

async function generateContentWithFallback(
  ai: any,
  params: { model: string; contents: any }
) {
  try {
    return await ai.models.generateContent(params);
  } catch (err: any) {
    if (
      err?.status === 404 ||
      (typeof err?.message === 'string' &&
        (err.message.includes('gemini-3.6-flash') ||
          err.message.includes('NOT_FOUND') ||
          err.message.includes('no longer available')))
    ) {
      return await ai.models.generateContent({
        ...params,
        model: 'gemini-3.6-flash',
      });
    }
    throw err;
  }
}

// ─── Trip Planner ────────────────────────────────────────────────────────────
export async function generateItinerary(
  destination: string,
  days: number,
  interests: string[],
  language: Language
): Promise<{ content: string; mock: boolean }> {
  if (isMock()) {
    return { content: getMockItinerary(destination, days, language), mock: true };
  }

  try {
    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey: getApiKey() });

    const langName = language === 'ta' ? 'Tamil' : language === 'hi' ? 'Hindi' : 'English';
    const prompt = `You are a Tamil Nadu heritage travel expert. Create a detailed ${days}-day itinerary for ${destination}, Tamil Nadu, India.
Traveller interests: ${interests.join(', ')}.
Respond entirely in ${langName}.
Format as JSON with this structure:
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
Only output valid JSON, no extra text.`;

    const response = await generateContentWithFallback(ai, {
      model: MODEL,
      contents: prompt,
    });

    const text = response.text ?? '';
    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return { content: cleaned, mock: false };
  } catch (err) {
    console.warn('[AI Planner Fallback to Mock]:', err);
    return { content: getMockItinerary(destination, days, language), mock: true };
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

  try {
    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey: getApiKey() });

    const langName = language === 'ta' ? 'Tamil' : language === 'hi' ? 'Hindi' : 'English';
    const prompt = `You are a Tamil Nadu heritage expert. Analyse the uploaded image and provide:
1. General description of what is depicted
2. Historical and cultural context
3. Any notable architectural features, symbols, or inscriptions you can identify

Respond entirely in ${langName}. Be informative and educational but appropriately cautious — note when you are uncertain.`;

    const response = await generateContentWithFallback(ai, {
      model: MODEL,
      contents: [
        {
          parts: [
            { text: prompt },
            { inlineData: { mimeType, data: base64Image } },
          ],
        },
      ],
    });

    return { content: response.text ?? '', mock: false };
  } catch (err) {
    console.warn('[AI Lens Fallback to Mock]:', err);
    return { content: getMockHeritageAnalysis(language), mock: true };
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
    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey: getApiKey() });

    const prompt = `Classify the following tourist complaint for Tamil Nadu government routing.
Complaint: "${description}"

Respond with JSON only:
{
  "department": "one of: Transport Infrastructure, Sanitation, Safety & Security, Heritage Site Maintenance, Tourism Services",
  "urgency": "one of: Low, Medium, High, Critical"
}`;

    const response = await generateContentWithFallback(ai, {
      model: MODEL,
      contents: prompt,
    });

    const text = response.text ?? '{}';
    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const parsed = JSON.parse(cleaned);
    return { department: parsed.department, urgency: parsed.urgency, mock: false };
  } catch (err) {
    console.warn('[AI Complaint Classification Fallback to Mock]:', err);
    return { department: 'Tourism Services', urgency: 'Medium', mock: true };
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
