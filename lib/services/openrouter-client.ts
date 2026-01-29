import { OpenRouterModel, OpenRouterChatMessage } from '@/types/global';
import { ModelRepository } from '@/lib/repositories/model';

const BASE_URL = 'https://openrouter.ai/api/v1';

export class OpenRouterClient {
  private static headers = {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': 'http://localhost:3000',
    'X-Title': 'My Chat App',
  };

  // MODELS - business logic: filter free models
  static async getFreeModels(): Promise<OpenRouterModel[]> {
    const models = await ModelRepository.getModels();

    return models
      .filter(
        (m) =>
          m.pricing?.prompt === '0' &&
          m.pricing?.completion === '0',
      ) as OpenRouterModel[];
  }

  // CHAT
  static async createChatCompletion(
    model: string,
    messages: OpenRouterChatMessage[],
  ) {
    const res = await fetch(`${BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        model,
        messages,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'OpenRouter chat error');
    }

    return data;
  }
}
