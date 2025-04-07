import { useEffect, useState } from "react";
import { ChatMessage } from "rest-api/types/chats";
import { getMessage } from "../chat-api/chat-api";
import { getChatMessage } from "rest-api/messages";
import { EditIcon, XIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { setEditMessage } from "./input-store";

export default function EditMessage({
  chatId,
  messageId,
  showClose = false,
}: {
  messageId?: string;
  chatId?: string;
  showClose?: boolean;
}) {
  const [message, setMessage] = useState<ChatMessage | null>(null);
  const handleMessage = async (id: string) => {
    if (!chatId) return;
    const localMessage = getMessage(id);
    if (localMessage) {
      setMessage(localMessage);
    } else {
      const message = await getChatMessage(chatId, id);
      if (message) setMessage(message);
    }
  };
  useEffect(() => {
    if (messageId) {
      handleMessage(messageId);
    }
  }, [messageId]);
  if (!message) return null;
  return (
    <div className="w-full flex justify-between items-center gap-2 border h-fit p-1 rounded-xl bg-background-secondary">
      <div className="w-fit flex items-center">
        <div className="size-10 flex items-center justify-center">
          <EditIcon size={16} />
        </div>
        <div className="flex flex-col px-2">
          <span className="text-sm font-medium text-foreground/60">
            Редактировать сообщение
          </span>
          <span className="text-xs text-secondary line-clamp-1">
            {message.message}
          </span>
        </div>
      </div>
      {showClose && (
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setEditMessage(null)}
        >
          <XIcon size={16} />
        </Button>
      )}
    </div>
  );
}
