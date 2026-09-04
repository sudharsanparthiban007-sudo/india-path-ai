import { NextRequest, NextResponse } from 'next/server';
import { analyzeHeritageImage } from '@/lib/ai';
import type { Language } from '@/lib/i18n';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageBase64, mimeType, language = 'en' } = body;

    if (!imageBase64) {
      return NextResponse.json({ error: 'No image provided. Please select or capture a photo.' }, { status: 400 });
    }

    const result = await analyzeHeritageImage(imageBase64, mimeType || 'image/jpeg', language as Language);
    return NextResponse.json({ content: result.content, mock: result.mock });
  } catch (error: any) {
    console.error('Lens error:', error);
    const msg = error?.message || String(error);

    if (msg.includes('API_KEY') || msg.includes('PERMISSION_DENIED') || msg.includes('401') || msg.includes('403')) {
      return NextResponse.json(
        { error: 'Gemini API key is invalid or unauthorized. Please check GEMINI_API_KEY in .env.local.' },
        { status: 401 }
      );
    }
    if (msg.includes('quota') || msg.includes('RESOURCE_EXHAUSTED') || msg.includes('429')) {
      return NextResponse.json(
        { error: 'Gemini API quota limit reached. Please try again in a moment.' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: msg.startsWith('OpenRouter') ? msg : 'Failed to analyze image with AI. Please try again.' },
      { status: 500 }
    );
  }
}
