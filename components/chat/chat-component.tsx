'use client';

import { ChatModelSelector } from '@/components/chat/ui/chat-model-selector';
import { ChatMessages } from '@/components/chat/ui/chat-messages';
import { ChatPrompt } from '@/components/chat/ui/chat-prompt';
import { ChatContainer } from '@/components/chat/ui/chat-container';

export function ChatComponent() {
  return (
    <ChatContainer>
      <ChatModelSelector />
      <ChatMessages />
      <ChatPrompt />
    </ChatContainer>
  );
}