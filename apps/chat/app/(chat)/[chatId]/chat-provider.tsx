"use client";

import { ChatMessage, ChatRoom, ChatTask } from "@/types/chat";
import { useEffect } from "react";
import { createClient } from "yz13/supabase/client";
import {
  deleteMessage,
  deleteTask,
  pushMessage,
  pushTask,
  setChat,
  setMessages,
  updateChatInList,
  updateMessage,
  updateTask,
} from "../chat-api/chat-api";

type ChatProviderProps = {
  children?: React.ReactNode;
  chat: ChatRoom;
  messages?: ChatMessage[];
  tasks?: ChatTask[];
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
            updateChatInList(newChat);
          }
          if (isDelete) {
          }
        },
      )
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, [chat]);
  useEffect(() => {
    const client = createClient();
    const channel = client.channel(`chat:${chat.id}:tasks`);
    channel
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "chats-tasks",
          filter: `chat_id=eq.${chat.id}`,
        },
        (payload) => {
          console.log("payload", payload);
          const event = payload.eventType;
          const isInsert = event === "INSERT";
          const isUpdate = event === "UPDATE";
          const isDelete = event === "DELETE";
          if (isInsert) {
            const newTask = payload.new as ChatTask;
            pushTask(newTask);
          }
          if (isUpdate) {
            const updatedTask = payload.new as ChatTask;
            updateTask(updatedTask);
          }
          if (isDelete) {
            const deletedTask = payload.old as ChatTask;
            deleteTask(deletedTask.id);
          }
        },
      )
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
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
          const isUpdate = event === "UPDATE";
          const isDelete = event === "DELETE";
          if (isInsert) {
            const newMessage = payload.new as ChatMessage;
            pushMessage(newMessage);
          }
          if (isUpdate) {
            const updatedMessage = payload.new as ChatMessage;
            updateMessage(updatedMessage);
          }
          if (isDelete) {
            const deletedMessage = payload.old as ChatMessage;
            deleteMessage(deletedMessage.id);
          }
        },
      )
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, [chat]);
  return <>{children}</>;
};

export default ChatProvider;
