'use server';

import { ModelService } from "@/lib/services/model";
import { ActionResult } from "@/types/global";

export async function syncModelsAction(): Promise<ActionResult<{ count: number }>> {
  try {
    const count = await ModelService.syncModels();
    return { success: true, data: { count } };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to sync models",
    };
  }
}