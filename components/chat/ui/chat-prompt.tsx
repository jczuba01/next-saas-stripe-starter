import { useState } from 'react';
import { useChatStore } from '@/components/chat/chat-store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function ChatPrompt() {
  const { 
    sendMessage, 
    clearMessages, 
    isLoadingResponse, 
    messages, 
    selectedModel, 
  } = useChatStore();

  const [prompt, setPrompt] = useState('');

  const handleSend = async () => {
    if (!prompt.trim() || !selectedModel) return;
    await sendMessage(prompt);
    setPrompt('');
  };

  return (
    <footer className="chat-prompt flex gap-2">
      <Input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Type your message..."
        disabled={isLoadingResponse || !selectedModel}
      />

      <Button
        onClick={handleSend}
        disabled={!prompt.trim() || !selectedModel || isLoadingResponse}
      >
        {isLoadingResponse ? 'Sending...' : 'Send'}
      </Button>
      <Button onClick={clearMessages} disabled={messages.length === 0}>
        Clear Chat
      </Button>
    </footer>
  );
}