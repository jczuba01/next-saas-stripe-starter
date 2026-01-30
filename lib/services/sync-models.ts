import { ModelRepository } from '@/lib/repositories/model';

export async function syncModelsService(): Promise<number> {
  
  const raw = await ModelRepository.fetchFromOpenRouter();
  
  const count = await ModelRepository.upsertModels(raw);

  return count;
}