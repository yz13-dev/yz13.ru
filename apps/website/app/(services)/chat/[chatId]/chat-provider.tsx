"use client";

import { ChatMessage, ChatRoom } from "@/types/chat";
import { useEffect } from "react";
import { createClient } from "yz13/supabase/client";
import {
  deleteMessage,
  pushMessage,
  setChat,
  setMessages,
} from "../chat-api/chat-api";

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
  }, [chat]);
  useEffect(() => {
    const client = createClient();
    const channel = client.channel(`chat:${chat.id}`);
    channel
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "chats",
          filter: `id=eq.${chat.id}`,
        },
        (payload) => {
          console.log("payload", payload);
          const event = payload.eventType;
          const isUpdate = event === "UPDATE";
          const isDelete = event === "DELETE";
          if (isUpdate) {
            const newChat = payload.new as ChatRoom;
            setChat(newChat);
          }
          if (isDelete) {
          }
        },
      )
      .subscribe();
  }, [chat]);
  useEffect(() => {
    const client = createClient();
    const channel = client.channel(`chat:${chat.id}:messages`);
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
          const isDelete = event === "DELETE";
          if (isInsert) {
            const newMessage = payload.new as ChatMessage;
            pushMessage(newMessage);
          }
          if (isDelete) {
            const deletedMessage = payload.old as ChatMessage;
            deleteMessage(deletedMessage.id);
          }
        },
      )
      .subscribe();
  }, [chat]);
  return <>{children}</>;
};

export default ChatProvider;
