import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ModelData {
  id: string;
  name: string;
  description?: string;
  supportedParameters?: string[];
  defaultParametrs?: Record<string, any> | null;
  // Add other relevant fields as needed
}

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

interface ChatState {
  // Selected metrics for current experiment
  selectedModel: ModelData | null;
  availableModels: ModelData[];
  loading: boolean;
  error: string | null;
  messages: Message[];
  isLoadingResponse: boolean

  fetchModels: () => Promise<void>;
  setSelectedModel: (model: ModelData | null) => void;
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  setIsLoadingResponse: (v: boolean) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      selectedModel: null,
      availableModels: [],
      loading: false,
      error: null,
      messages: [],
      isLoadingResponse: false,

      fetchModels: async () => {
        set({ loading: true, error: null });
        try {
          const response = await fetch("/api/models");
          if (!response.ok) throw new Error("Failed to load models");
          const json = await response.json();
          set({ availableModels: json.models || [] });
        } catch (err) {
          set({ error: err instanceof Error ? err.message : "Error" });
        } finally {
          set({ loading: false });
        }
      },

      setSelectedModel: (model) => set({ selectedModel: model }),
  
      addMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),

      clearMessages: () => set({ messages: [] }),

      setIsLoadingResponse: (v) => set({ isLoadingResponse: v }),
    }),
    {
      name: "chat-store",
    },
  ),
);