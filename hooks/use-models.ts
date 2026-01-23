import { OpenRouterModel } from '@/types/global';

export async function fetchModels(): Promise<OpenRouterModel[]> {
  const response = await fetch('/api/models');

  if (!response.ok) {
    throw new Error('Failed to fetch models');
  }

  const data = await response.json();
  return data.models as OpenRouterModel[];
}