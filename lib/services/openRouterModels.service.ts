interface OpenRouterModel {
  id: string;
  name?: string;
  description?: string;
  pricing?: {
    prompt: string;
    completion: string;
  };
}

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