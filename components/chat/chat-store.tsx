import { create } from 'zustand'
import { persist } from 'zustand/middleware'


export interface ModelData {
    id: string
    name: string
    description: string
    supportedParameters: string[]
    // Add other relevant fields
}

interface ChatState {
  // Selected metrics for current experiment
  selectedModel: ModelData | null
  availableModels: ModelData[]
  loading: boolean
  error: string | null

  setSelectedModel: (model: ModelData) => void
  setAvailableModels: (models: ModelData[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void

  fetchModels: (params: { applicationId: string }) => Promise<void>
}

export const useMetricsStore = create<ChatState>()(
  persist(
    set => ({
        selectedModel: null,
        availableModels: [],
        loading: false,
        error: null,
        setAvailableModels: (models: ModelData[]) =>
        set(() => ({
          availableModels: models,
        })),

      setSelectedModel: (model: ModelData) =>
        set(() => ({
          selectedModel: model,
        })),


      fetchModels: async ({ applicationId }) => {
        // Implementation for fetching models and updating state
      },
    }),
  ),
)
