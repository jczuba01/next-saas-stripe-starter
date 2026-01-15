import { NextResponse } from 'next/server';
import { createChatCompletion } from '@/lib/services/openRouter.service';

export async function POST(req: Request) {
  try {
    const { messages, modelId } = await req.json();

    if (!modelId || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Missing prompt or modelId' },
        { status: 400 }
      );
    }

    const data = await createChatCompletion({
      model: modelId,
      messages,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    
    return NextResponse.json(
      { error: error.message ||'Internal server error' },
      { status: 500 }
    );
  }
}