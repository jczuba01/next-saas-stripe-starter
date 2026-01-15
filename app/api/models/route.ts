import { getFreeModels } from '@/lib/services/openRouterModels.service';

export async function GET() {
  try {
    const models = await getFreeModels();
    return Response.json({ models });
  } catch (error) {
    console.error('Models API Error:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch models' },
      { status: 500 }
    );
  }
}