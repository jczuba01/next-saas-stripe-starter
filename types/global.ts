//OPENROUTER - API TYPES

export interface OpenRouterPricing {
  prompt: string;
  completion: string;
}

export interface OpenRouterModel {
  id: string;
  name?: string;
  description?: string;
  pricing?: OpenRouterPricing;
}

export type ChatRole = 'user' | 'assistant' | 'system';

export interface OpenRouterChatMessage {
  role: ChatRole;
  content: string;
}

export interface OpenRouterChatCompletionParams {
  model: string;
  messages: OpenRouterChatMessage[];
}

// APP / UI TYPES

export interface AppModel {
  id: string;
  name: string;
  description?: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}