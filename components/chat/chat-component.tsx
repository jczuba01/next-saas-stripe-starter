'use client';

import { ChatModelSelector } from '@/components/chat/ui/chat-model-selector';
import { ChatMessages } from '@/components/chat/ui/chat-messages';
import { ChatPrompt } from '@/components/chat/ui/chat-prompt';
import { ChatContainer } from '@/components/chat/ui/chat-container';
import { SyncModelsButton } from '@/components/chat/ui/sync-models-button';

export function ChatComponent() {
  return (
    <ChatContainer>
      <div className="flex items-center gap-2">
        <ChatModelSelector />
        <SyncModelsButton />
      </div>
      <ChatMessages />
      <ChatPrompt />
    </ChatContainer>
  );
}