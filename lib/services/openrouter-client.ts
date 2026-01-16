import {
  OpenRouterModel,
  OpenRouterChatMessage,
  AppModel,
} from '@/types/global';

const BASE_URL = 'https://openrouter.ai/api/v1';

export class OpenRouterClient {
  private static headers = {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': 'http://localhost:3000',
    'X-Title': 'My Chat App',
  };

  // MODELS
  static async getFreeModels(): Promise<AppModel[]> {
    const res = await fetch(`${BASE_URL}/models`, {
      headers: this.headers,
    });

    const data: { data?: OpenRouterModel[]; error?: string } =
      await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'OpenRouter models error');
    }

    return (data.data ?? [])
      .filter(
        (m) =>
          m.pricing?.prompt === '0' &&
          m.pricing?.completion === '0',
      )
      .map<AppModel>((m) => ({
        id: m.id,
        name: m.name ?? m.id,
        description: m.description ?? 'Free model',
      }));
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
