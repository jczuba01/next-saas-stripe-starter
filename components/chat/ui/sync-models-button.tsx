"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { syncModelsAction } from "@/actions/sync-models";
import { useChatStore } from "@/components/chat/chat-store";

export function SyncModelsButton() {
  const [isPending, startTransition] = useTransition();
  const { loadModels } = useChatStore();

  const handleSync = () => {
    startTransition(async () => {
      const result = await syncModelsAction();
      if (result.success) {
        // Reload models from DB after sync
        await loadModels();
      }
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
