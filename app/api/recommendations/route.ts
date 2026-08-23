import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import type { Language } from '@/lib/i18n';

interface RecommendationItem {
  poiId: number;
  name: string;
  city: string;
  category: string;
  reason: string;
  transitInfo: string;
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.user?.id ? Number(session.user.id) : null;

    const { searchParams } = new URL(req.url);
    const language = (searchParams.get('lang') as Language) || 'en';

    let allPois: any[] = [];
    try {
      allPois = await prisma.pointOfInterest.findMany();
    } catch {
      allPois = [];
    }

    if (!allPois || allPois.length === 0) {
      allPois = (await import('@/lib/seedData')).SEEDED_POIS;
    }

    // 1. Fetch user's saved trips if logged in
    let userTrips: Array<{ destination: string; interests: string }> = [];
    if (userId) {
      try {
        userTrips = await prisma.trip.findMany({
          where: { userId },
          select: { destination: true, interests: true },
          orderBy: { createdAt: 'desc' },
          take: 5,
        });
      } catch {
        userTrips = [];
      }
    }

    // 2. New user / 0 trips fallback — Popular Starter Curation
    if (userTrips.length === 0) {
      const starterPois = allPois.slice(0, 3);
      const starterRecommendations: RecommendationItem[] = starterPois.map((poi) => {
        let reason = 'A top-rated iconic Tamil Nadu landmark perfect for first-time visitors.';
        if (language === 'ta') {
          reason = 'தமிழ்நாட்டின் முதன்மையான மற்றும் பாரம்பரிய சிறப்புமிக்க முக்கிய இடம்.';
        } else if (language === 'hi') {
          reason = 'तमिलनाडु का एक प्रमुख और विश्व प्रसिद्ध ऐतिहासिक स्थल।';
        }

        return {
          poiId: poi.id,
          name: poi.name,
          city: poi.city,
          category: poi.category,
          reason,
          transitInfo: poi.transitInfo,
        };
      });

      return NextResponse.json({
        recommendations: starterRecommendations,
        isPersonalized: false,
        mock: true,
      });
    }

    // 3. Personalized for user with trip history
    const visitedCities = Array.from(new Set(userTrips.map((t) => t.destination.toLowerCase())));
    const userInterests = Array.from(
      new Set(
        userTrips.flatMap((t) => {
          try {
            return JSON.parse(t.interests) as string[];
          } catch {
            return [];
          }
        })
      )
    );

    // Filter for unvisited POIs
    let candidatePois = allPois.filter(
      (p) => !visitedCities.includes(p.city.toLowerCase())
    );

    // If all cities visited, candidate is any other POI
    if (candidatePois.length === 0) {
      candidatePois = allPois;
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // If no API key or offline, generate rule-based personalized reasoning
    if (!apiKey || apiKey.trim() === '') {
      const chosen = candidatePois.slice(0, 3);
      const mockPersonalized: RecommendationItem[] = chosen.map((poi) => ({
        poiId: poi.id,
        name: poi.name,
        city: poi.city,
        category: poi.category,
        reason:
          language === 'ta'
            ? `நீங்கள் இதற்கு முன் ${visitedCities.join(', ')} சென்றிருப்பதால், ${poi.city} உள்ள இந்த ${poi.category} தளம் உங்களுக்கு மிகவும் பிடிக்கும்.`
            : language === 'hi'
            ? `क्योंकि आपने पहले ${visitedCities.join(', ')} की यात्रा की है, इसलिए ${poi.city} का यह स्थल आपके लिए उत्तम रहेगा।`
            : `Based on your past visits to ${visitedCities.join(', ')} and your interest in ${userInterests.join(', ') || 'heritage'}, ${poi.name} in ${poi.city} is a recommended next destination.`,
        transitInfo: poi.transitInfo,
      }));

      return NextResponse.json({
        recommendations: mockPersonalized,
        isPersonalized: true,
        mock: true,
      });
    }

    // 4. Call Gemini AI for personalized recommendations
    try {
      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey });

      const langName = language === 'ta' ? 'Tamil' : language === 'hi' ? 'Hindi' : 'English';
      const prompt = `You are a personalized travel recommendation engine for Tamil Nadu heritage tourism.
The user has previously planned trips to: ${visitedCities.join(', ')}.
Their stated travel interests are: ${userInterests.join(', ') || 'heritage, culture'}.

Available unvisited points of interest from our verified database:
${candidatePois
  .map(
    (p) =>
      `- [ID: ${p.id}] "${p.name}" in ${p.city} (Category: ${p.category}) - ${p.description}`
  )
  .join('\n')}

Task: Select exactly 2 or 3 POIs from the unvisited list above that best match their travel profile. For each selected POI, provide exactly ONE concise, engaging sentence explaining why they will enjoy it based on their history.

Respond ONLY with valid JSON array:
[
  {
    "poiId": <number>,
    "name": "<exact name from list>",
    "city": "<city>",
    "category": "<category>",
    "reason": "<one sentence personalized reasoning in ${langName}>"
  }
]`;

      let response;
      try {
        response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });
      } catch {
        response = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: prompt,
        });
      }

      const text = response.text || '';
      const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(cleaned);

      const enriched: RecommendationItem[] = parsed.map((item: any) => {
        const matchingPoi = allPois.find((p) => p.id === item.poiId || p.name === item.name);
        return {
          poiId: item.poiId || matchingPoi?.id || 1,
          name: item.name || matchingPoi?.name || 'Heritage Monument',
          city: item.city || matchingPoi?.city || 'Tamil Nadu',
          category: item.category || matchingPoi?.category || 'heritage',
          reason: item.reason,
          transitInfo: matchingPoi?.transitInfo || 'Accessible by local bus and auto.',
        };
      });

      return NextResponse.json({
        recommendations: enriched,
        isPersonalized: true,
        mock: false,
      });
    } catch (aiErr) {
      console.warn('Gemini recommendations fallback to mock:', aiErr);
      const chosen = candidatePois.slice(0, 3);
      const mockPersonalized: RecommendationItem[] = chosen.map((poi) => ({
        poiId: poi.id,
        name: poi.name,
        city: poi.city,
        category: poi.category,
        reason: `Based on your past visits to ${visitedCities.join(', ')}, we recommend exploring ${poi.name} in ${poi.city}.`,
        transitInfo: poi.transitInfo,
      }));

      return NextResponse.json({
        recommendations: mockPersonalized,
        isPersonalized: true,
        mock: true,
      });
    }
  } catch (error) {
    console.error('Recommendations API error:', error);
    return NextResponse.json({ error: 'Failed to generate recommendations' }, { status: 500 });
  }
}
