import { AppModel } from '@/types/global';

export async function fetchModels(): Promise<AppModel[]> {
  const response = await fetch('/api/models');

  if (!response.ok) {
    throw new Error('Failed to fetch models');
  }

  const data = await response.json();
  return data.models as AppModel[];
}