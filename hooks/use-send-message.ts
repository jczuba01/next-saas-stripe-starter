import { useChatStore } from '@/components/chat/chat-store';
import { Message, OpenRouterChatMessage } from '@/types/global';

export const useSendMessage = () => {
  const { selectedModel, messages, addMessage, setLoading, setError } =
    useChatStore();

  const sendMessage = async (prompt: string) => {
    if (!selectedModel || !prompt.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: prompt,
      timestamp: new Date().toISOString(),
    };

    addMessage(userMessage);
    setLoading(true);
    setError(null);

    try {
      const openRouterMessages: OpenRouterChatMessage[] = [
        ...messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        { role: 'user', content: prompt },
      ];

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          modelId: selectedModel.id,
          messages: openRouterMessages,
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

      addMessage(assistantMessage);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Chat error');
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage };
};