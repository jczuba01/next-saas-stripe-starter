'use client';

import { useEffect, useState } from 'react';
import { useChatStore } from '@/components/chat/chat-store';

export function ChatComponent() {
  const { 
    selectedModel,
    availableModels,
    fetchModels,
    setSelectedModel,
    isLoadingResponse,
    setIsLoadingResponse,
    messages,
    addMessage,
  } = useChatStore();

  const [prompt, setPrompt] = useState('');

  // Load models on mount
  useEffect(() => {
    fetchModels();
  }, [fetchModels]);

  const handleModelSelect = (modelId: string) => {
    const model = availableModels.find(m => m.id === modelId);
    if (model) {
      setSelectedModel(model);
    }
  };

  const sendMessage = async () => {
    if (!prompt.trim() || !selectedModel) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: prompt,
      timestamp: new Date().toISOString(),
    };
    addMessage(userMessage);
    setPrompt('');

    try {
      setIsLoadingResponse(true);
      const response = await makeOpenRouterRequest(prompt, selectedModel.id);

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: response.choices[0].message.content,
        timestamp: new Date().toISOString(),
      };
      addMessage(assistantMessage);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingResponse(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Model selector */}
      <select
        onChange={(e) => handleModelSelect(e.target.value)}
        value={selectedModel?.id || ""}
      >
        <option value="">Select model</option>
        {availableModels.map((model) => (
          <option key={model.id} value={model.id}>{model.name}</option>
        ))}
      </select>

      {/* Messages */}
      <div>
        {messages.map((msg) => (
          <div key={msg.id}>
            <strong>{msg.role}:</strong> {msg.content}
          </div>
        ))}
      </div>

      {/* Prompt input */}
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Type your message..."
      />

      <button
        onClick={sendMessage}
        disabled={!selectedModel || isLoadingResponse}
      >
        Send
      </button>
    </div>
  );
}

async function makeOpenRouterRequest(
  prompt: string, 
  modelId: string
) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, modelId }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch from OpenRouter');
  }

  return response.json();
}