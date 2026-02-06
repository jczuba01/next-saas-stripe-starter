import { ModelService } from '@/lib/services/model';

export async function GET() {
  try {
    const models = await ModelService.getFreeModels();
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
    const count = await ModelService.syncModels();
    return Response.json({ count });
  } catch (error) {
    console.error('Sync Models API Error:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Failed to sync models' },
      { status: 500 }
    );
  }
}