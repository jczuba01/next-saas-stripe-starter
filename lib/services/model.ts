import { ModelRepository } from '@/lib/repositories/model';
import { OpenRouterModel } from '@/types/global';
import { OpenRouterClient } from '@/lib/services/openrouter-client';


export class ModelService {

  static async upsertModels(models: OpenRouterModel[]): Promise<number> {
    return ModelRepository.upsertModels(models);
  }

  static async getPersistedModels() {
    return ModelRepository.getPersistedModels();
  }
  
  static async getFreeModels(): Promise<OpenRouterModel[]> {
    return ModelRepository.getFreeModels() as Promise<OpenRouterModel[]>;
  }

  static async syncModels(): Promise<number> {
    const raw = await OpenRouterClient.fetchModels();
    const count = await this.upsertModels(raw);

    return count;
  }
}
