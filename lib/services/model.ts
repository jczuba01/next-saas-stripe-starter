import { ModelRepository } from '@/lib/repositories/model';
import { OpenRouterModel } from '@/types/global';

interface OpenRouterResponse {
  data?: OpenRouterModel[];
  error?: string;
}

const BASE_URL = 'https://openrouter.ai/api/v1';
const headers = {
  Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
  'Content-Type': 'application/json',
  'HTTP-Referer': 'http://localhost:3000',
  'X-Title': 'My Chat App'
}

export async function fetchFromOpenRouterService(): Promise<OpenRouterModel[]> {
  const res = await fetch(`${BASE_URL}/models`, {
    headers,
  });

  const data: OpenRouterResponse = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Failed to fetch models from OpenRouter');
  }

  return data.data ?? [];
}

export async function syncModelsService(): Promise<number> {
  const raw = await fetchFromOpenRouterService();
  const count = await ModelRepository.upsertModels(raw);

  return count;
}