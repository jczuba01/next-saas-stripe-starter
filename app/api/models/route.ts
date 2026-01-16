import { OpenRouterClient } from '@/lib/services/openrouter-client';

export async function GET() {
  try {
    const models = await OpenRouterClient.getFreeModels();
    return Response.json({ models });
  } catch (error) {
    console.error('Models API Error:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch models' },
      { status: 500 }
    );
  }
}