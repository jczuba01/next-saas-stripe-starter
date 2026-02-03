import { OpenRouterClient } from '@/lib/services/openrouter-client';
import { syncModelsService } from '@/lib/services/model';

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

export async function POST() {
  try {
    const count = await syncModelsService();
    return Response.json({ count });
  } catch (error) {
    console.error('Sync Models API Error:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Failed to sync models' },
      { status: 500 }
    );
  }
}