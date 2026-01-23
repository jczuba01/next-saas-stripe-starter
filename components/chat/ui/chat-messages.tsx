'use client';

import { useChatStore } from '@/components/chat/chat-store';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

export function ChatMessages() {
  const { messages, error } = useChatStore();

  return (
    <section className="chat-messages flex-1 min-h-0">
      <ScrollArea className="h-full pr-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                'flex',
                msg.role === 'user'
                  ? 'justify-end'
                  : 'justify-start'
              )}
            >
              <Card
                className={cn(
                  'max-w-[75%]',
                  msg.role === 'user'
                    ? 'bg-muted'
                    : 'bg-card'
                )}
              >
                <CardContent className="p-3 text-sm leading-relaxed">
                  <span className="font-semibold capitalize mr-1">
                    {msg.role}:
                  </span>
                  {msg.content}
                </CardContent>
              </Card>
            </div>
          ))}

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      </ScrollArea>
    </section>
  );
}
