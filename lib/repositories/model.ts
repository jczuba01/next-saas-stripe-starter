import { prisma } from '@/lib/db';
import { OpenRouterModel } from '@/types/global';

// Repository - data access (DB)
export class ModelRepository {
  
// Upsert models into DB
static async upsertModels(models: OpenRouterModel[]): Promise<number> {
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

  //Read free models from DB
  static async getFreeModels() {
    return prisma.model.findMany({
      where: { isFree: true },
      orderBy: { name: 'asc' },
    });
  }
}
