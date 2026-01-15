import { useEffect, useState } from 'react';

export interface ModelData {
  id: string;
  name: string;
  description?: string;
  supportedParameters?: string[];
  defaultParameters?: Record<string, unknown> | null;
}

export function useModels() {
  const [models, setModels] = useState<ModelData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchModels = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/models');
      if (!response.ok) throw new Error('Failed to fetch models');
      const data = await response.json();
      console.log('API response:', data);
      setModels(data.models);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  return { models, isLoading, error, refetch: fetchModels };
}