import { prisma } from '@/lib/db';

// Raw types from external API
export interface OpenRouterModelRaw {
  id: string;
  name?: string;
  description?: string;
  pricing?: {
    prompt: string;
    completion: string;
  };
}

interface OpenRouterResponse {
  data?: OpenRouterModelRaw[];
  error?: string;
}

const BASE_URL = 'https://openrouter.ai/api/v1';

// Repository - data access (OpenRouter API + DB)
export class ModelRepository {
  private static headers = {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': 'http://localhost:3000',
    'X-Title': 'My Chat App',
  };

  // Fetch all models from OpenRouter API
  static async fetchFromOpenRouter(): Promise<OpenRouterModelRaw[]> {
    const res = await fetch(`${BASE_URL}/models`, {
      headers: this.headers,
    });

    const data: OpenRouterResponse = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'OpenRouter models error');
    }

    return data.data ?? [];
  }

  // Upsert models into DB
static async upsertModels(models: OpenRouterModelRaw[]): Promise<number> {
  if (!models.length) return 0;

  await prisma.$transaction(
    models.map((model) => {
      const isFree = model.pricing?.prompt === '0' && model.pricing?.completion === '0';
      
      return prisma.model.upsert({
        where: { id: model.id },
        create: {
          id: model.id,
          name: model.name ?? model.id,
          description: model.description ?? null,
          pricingPrompt: model.pricing?.prompt ?? null,
          pricingCompletion: model.pricing?.completion ?? null,
          isFree,
        },
        update: {
          name: model.name ?? model.id,
          description: model.description ?? null,
          pricingPrompt: model.pricing?.prompt ?? null,
          pricingCompletion: model.pricing?.completion ?? null,
          isFree,
        },
      });
    })
  );

  return models.length;
}

  // Read persisted models from DB
  static async getPersistedModels() {
    return prisma.model.findMany({
      orderBy: { name: 'asc' },
    });
  }

  static async getFreeModels() {
    return prisma.model.findMany({
      where: { isFree: true },
      orderBy: { name: 'asc' },
    });
  }
}
