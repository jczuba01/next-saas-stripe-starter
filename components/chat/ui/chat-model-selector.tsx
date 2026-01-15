import { useChatStore } from '@/components/chat/chat-store';
import { useModels } from '@/hooks/useModels';

import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

export function ChatModelSelector() {
  const { models, isLoading } = useModels();
  const { selectedModel, setSelectedModel } = useChatStore();

  return (
    <div className="chat-model-selector">
      <Select
        value={selectedModel?.id || ''}
        onValueChange={(modelId) => {
          const model = models.find((m) => m.id === modelId);
          if (model) setSelectedModel(model);
        }}
        disabled={isLoading}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select model" />
        </SelectTrigger>

        <SelectContent>
          {models.map((model) => (
            <SelectItem key={model.id} value={model.id}>
              {model.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}