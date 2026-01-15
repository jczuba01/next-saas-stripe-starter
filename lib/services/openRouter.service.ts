// Models types
interface OpenRouterModel {
  id: string;
  name?: string;
  description?: string;
  pricing?: {
    prompt: string;
    completion: string;
  };
}

// Chat types
type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

interface OpenRouterChatParams {
  model: string;
  messages: ChatMessage[];
}

// Get free models
export async function getFreeModels() {
  const response = await fetch(
    'https://openrouter.ai/api/v1/models',
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'My Chat App',
      },
    }
  );

  const data: { data?: OpenRouterModel[]; error?: string } = await response.json();

  if (!response.ok) {
    console.error('OpenRouter Models error:', data);
    throw new Error(data.error || 'Failed to fetch models from OpenRouter');
  }
  
  return (data.data ?? [])
    .filter((model) => 
      model.pricing?.prompt === "0" && model.pricing?.completion === "0"
    )
    .map((model) => ({
      id: model.id,
      name: model.name ?? model.id,
      description: model.description ?? 'Free model',
    }));
}

// Create chat completion
export async function createChatCompletion({
  model,
  messages,
}: OpenRouterChatParams) {
  const response = await fetch(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'My Chat App',
      },
      body: JSON.stringify({
        model,
        messages,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error('OpenRouter error:', data);
    throw new Error(data.error || 'OpenRouter request failed');
  }

  return data;
}