import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ModelData } from '@/hooks/useModels';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ChatState {
  selectedModel: ModelData | null;
  messages: Message[];
  isLoadingResponse: boolean;
  error: string | null;

  setSelectedModel: (model: ModelData | null) => void;
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  setIsLoadingResponse: (v: boolean) => void;
  sendMessage: (prompt: string) => Promise<void>;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      selectedModel: null,
      messages: [],
      isLoadingResponse: false,
      error: null,

      setSelectedModel: (model) => set({ selectedModel: model }),
      addMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),
      clearMessages: () => set({ messages: [] }),
      setIsLoadingResponse: (v) => set({ isLoadingResponse: v }),

      sendMessage: async (prompt: string) => {
        const { selectedModel, messages } = get();
        if (!selectedModel || !prompt.trim()) return;

        const userMessage: Message = {
          id: Date.now().toString(),
          role: 'user',
          content: prompt,
          timestamp: new Date().toISOString(),
        };

        set((state) => ({
          messages: [...state.messages, userMessage],
          isLoadingResponse: true,
          error: null,
        }));

        try {
          const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              modelId: selectedModel.id,
              messages: [...messages, userMessage],
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to fetch from API');
          }

          const data = await response.json();

          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: data.choices[0].message.content,
            timestamp: new Date().toISOString(),
          };

          set((state) => ({
            messages: [...state.messages, assistantMessage],
          }));
        } catch (err) {
          set({
            error: err instanceof Error ? err.message : 'Chat error',
          });
        } finally {
          set({ isLoadingResponse: false });
        }
      },
    }),
    {
      name: 'chat-store',
    },
  ),
);