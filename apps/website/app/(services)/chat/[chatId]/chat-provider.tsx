"use client";

import { ChatMessage, ChatRoom } from "@/types/chat";
import { useEffect } from "react";
import { createClient } from "yz13/supabase/client";
import { pushMessage, setChat, setMessages } from "../chat-api/chat-api";

type ChatProviderProps = {
  children?: React.ReactNode;
  chat: ChatRoom;
  messages?: ChatMessage[];
};
const ChatProvider = ({ children, chat, messages = [] }: ChatProviderProps) => {
  useEffect(() => {
    if (messages) setMessages(messages);
  }, [messages]);
  useEffect(() => {
    if (chat) setChat(chat);
    const client = createClient();
    const channel = client.channel(`chat:${chat.id}`);
    channel
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "chats-messages",
          filter: `chat_id=eq.${chat.id}`,
        },
        (payload) => {
          console.log("payload", payload);
          const event = payload.eventType;
          const isInsert = event === "INSERT";
          if (isInsert) {
            const newMessage = payload.new as ChatMessage;
            pushMessage(newMessage);
          }
        },
      )
      .subscribe();
  }, [chat]);
  return <>{children}</>;
};

export default ChatProvider;
