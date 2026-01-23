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

// Repository - only data access (raw)
export class ModelRepository {
  private static headers = {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': 'http://localhost:3000',
    'X-Title': 'My Chat App',
  };

  static async getModels(): Promise<OpenRouterModelRaw[]> {
    const res = await fetch(`${BASE_URL}/models`, {
      headers: this.headers,
    });

    const data: OpenRouterResponse = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'OpenRouter models error');
    }

    return data.data ?? [];
  }
}
