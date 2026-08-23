import { NextRequest, NextResponse } from 'next/server';
import { analyzeHeritageImage } from '@/lib/ai';
import type { Language } from '@/lib/i18n';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageBase64, mimeType, language = 'en' } = body;

    if (!imageBase64) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    const result = await analyzeHeritageImage(imageBase64, mimeType || 'image/jpeg', language as Language);
    return NextResponse.json({ content: result.content, mock: result.mock });
  } catch (error) {
    console.error('Lens error:', error);
    return NextResponse.json({ error: 'Failed to analyze image' }, { status: 500 });
  }
}
