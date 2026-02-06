"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/components/chat/chat-store";

export function SyncModelsButton() {
  const [isPending, startTransition] = useTransition();
  const { syncModels } = useChatStore();

  const handleSync = () => {
    startTransition(async () => {
        await syncModels();
    });
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleSync}
      disabled={isPending}
    >
      {isPending ? "Syncing..." : "Sync models"}
    </Button>
  );
}
