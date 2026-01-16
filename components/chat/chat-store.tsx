import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppModel, Message } from '@/types/global';
import { fetchModels } from '@/hooks/use-models';

interface ChatState {
  models: AppModel[];
  selectedModel: AppModel | null;
  messages: Message[];
  isLoadingModels: boolean;
  isLoadingResponse: boolean;
  error: string | null;

  loadModels: () => Promise<void>;
  setSelectedModel: (model: AppModel | null) => void;
  clearMessages: () => void;
  addMessage: (message: Message) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      models: [],
      selectedModel: null,
      messages: [],
      isLoadingModels: false,
      isLoadingResponse: false,
      error: null,

      loadModels: async () => {
        set({ isLoadingModels: true, error: null });
        try {
          const models = await fetchModels();
          set({ models });
        } catch (e) {
          set({
            error: e instanceof Error ? e.message : 'Models error',
          });
        } finally {
          set({ isLoadingModels: false });
        }
      },

      setSelectedModel: (model) => set({ selectedModel: model }),

      clearMessages: () => set({ messages: [] }),

      addMessage: (message) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),

      setLoading: (loading) => set({ isLoadingResponse: loading }),

      setError: (error) => set({ error }),
    }),
    { name: 'chat-store' },
  ),
);