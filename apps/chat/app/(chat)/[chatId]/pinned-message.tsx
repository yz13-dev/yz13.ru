"use client";
import { Loader2Icon, PinIcon, XIcon } from "lucide-react";
import { Button } from "mono/components/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "mono/components/popover";
import { useEffect, useState } from "react";
import { updateChat } from "rest-api/chats";
import { getChatMessage } from "rest-api/messages";
import { ChatMessage } from "rest-api/types/chats";
import { cn } from "yz13/cn";
import { setChat } from "../chat-api/chat-api";
import { useChatApi } from "../chat-api/chat-provider";
import { parseText } from "./chat-bubble";

const PinnedMessage = () => {
  const [message, setMessage] = useState<ChatMessage | null>(null);
  const chat = useChatApi((state) => state.chat);
  const [loading, setLoading] = useState<boolean>(false);
  const handleUnpinMessage = async () => {
    if (!message) return;
    if (chat) {
      setLoading(true);
      try {
        const { data: updatedChat } = await updateChat(chat.id, {
          "pinned-message": null,
        });
        if (updatedChat) setChat(updatedChat);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    if (!chat?.id || !chat?.["pinned-message"]) return;
    // console.log(chat.id, chat["pinned-message"]);
    getChatMessage(chat.id, chat["pinned-message"]).then(
      ({ data: recieved }) => {
        // console.log(recieved);
        setMessage(recieved);
      },
    );
  }, [chat]);
  if (!message || !chat?.["pinned-message"]) return <></>;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center">
          <Button
            variant="outline"
            className="gap-2 max-w-48 h-8 text-xs rounded-r-none"
          >
            <PinIcon size={14} className="shrink-0" />
            <span className="line-clamp-1">{message.message}</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-l-none h-8 text-xs"
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleUnpinMessage();
            }}
          >
            {loading ? (
              <Loader2Icon size={14} className="shrink-0 animate-spin" />
            ) : (
              <XIcon size={14} className="shrink-0" />
            )}
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="rounded-2xl p-3 space-y-2">
        <span className="text-xs text-foreground block">
          Закрепленное сообщение
        </span>
        <span
          className={cn(
            "w-full *:select-none inline-block overflow-clip text-content *:inline",
            "whitespace-pre-wrap break-words relative text-xs",
          )}
        >
          {parseText(message.message)}
        </span>
      </PopoverContent>
    </Popover>
  );
};

export default PinnedMessage;
