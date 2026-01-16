import { NextResponse } from 'next/server';
import { OpenRouterClient } from '@/lib/services/openrouter-client';
import { OpenRouterChatMessage } from '@/types/global';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, modelId } = body as {
      modelId: string;
      messages: OpenRouterChatMessage[];
    }

    if (!modelId || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Missing prompt or modelId' },
        { status: 400 }
      );
    }

    const data = await OpenRouterClient.createChatCompletion(
      modelId,
      messages,
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    
    return NextResponse.json(
      { error: error.message ||'Internal server error' },
      { status: 500 }
    );
  }
}