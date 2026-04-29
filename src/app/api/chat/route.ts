import { NextRequest, NextResponse } from 'next/server';
import { personas } from '@/lib/personas';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
  try {
    const { messages, personaId } = await req.json();

    if (!messages || !personaId) {
      return NextResponse.json({ error: 'Missing messages or personaId' }, { status: 400 });
    }

    const persona = personas[personaId as keyof typeof personas];
    if (!persona) {
      return NextResponse.json({ error: 'Invalid personaId' }, { status: 400 });
    }

    const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-lite-latest",
      systemInstruction: persona.systemPrompt,
    });

    let history = messages.slice(0, -1).map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    // The SDK requires history to start with a 'user' message.
    if (history.length > 0 && history[0].role === 'model') {
      history = history.slice(1);
    }

    const latestMessage = messages[messages.length - 1].content;

    const chat = model.startChat({
      history: history,
      generationConfig: {
        temperature: 0.7,
      }
    });

    const result = await chat.sendMessage(latestMessage);
    const text = result.response.text() || '';
    
    const cleanText = text.replace(/<thought>[\s\S]*?<\/thought>/gi, '').trim();

    return NextResponse.json({ text: cleanText, fullText: text });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to communicate with AI' }, { status: 500 });
  }
}
