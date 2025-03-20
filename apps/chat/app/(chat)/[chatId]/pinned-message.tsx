"use client";
import { getChatMessage } from "@/actions/chats/chats";
import { ChatMessage } from "@/types/chat";
import { PinIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { useEffect, useState } from "react";
import { useChatApi } from "../chat-api/chat-provider";

const PinnedMessage = () => {
  const [message, setMessage] = useState<ChatMessage | null>(null);
  const chat = useChatApi((state) => state.chat);
  useEffect(() => {
    if (!chat?.id || !chat?.["pinned-message"]) return;
    console.log(chat.id, chat["pinned-message"]);
    getChatMessage(chat.id, chat["pinned-message"]).then((recieved) => {
      console.log(recieved);
      setMessage(recieved);
    });
  }, [chat]);
  if (!message || !chat?.["pinned-message"]) return <></>;
  return (
    <Button variant="secondary" className="gap-2 max-w-48">
      <PinIcon size={16} className="shrink-0" />
      <span className="line-clamp-1">{message.message}</span>
    </Button>
  );
};

export default PinnedMessage;
