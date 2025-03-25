"use client";

import { getAurhorizedUser } from "@/actions/user/user";
import { ChatMessage, ChatRoom, ChatTask } from "@/types/chat";
import { useEffect, useMemo } from "react";
import { createClient } from "yz13/supabase/client";
import {
  deleteMessage,
  deleteTask,
  pushMessage,
  pushTask,
  setChat,
  updateChatInList,
  updateMessage,
  updateTask,
} from "../chat-api/chat-api";

type ChatProviderProps = {
  children?: React.ReactNode;
  chat: ChatRoom;
};
const ChatProvider = ({ children, chat }: ChatProviderProps) => {
  const client = useMemo(() => createClient(), []);
  useEffect(() => {
    if (chat) setChat(chat);
  }, [chat]);
  useEffect(() => {
    const channel = client.channel(`chat:${chat.id}`);
    const filter = `id=eq.${chat.id}`;
    channel
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "chats",
          filter,
        },
        (payload) => {
          console.log("chats/payload", payload);
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
    const channel = client.channel(`chat:${chat.id}/tasks`);
    const filter = `chat_id=eq.${chat.id}`;
    channel
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "chats-tasks",
          filter,
        },
        (payload) => {
          console.log("chats-tasks/payload", payload);
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
    const channel = client.channel(`chat:${chat.id}/messages`);
    const filter = `chat_id=eq.${chat.id}`;
    channel
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "chats-messages",
          filter,
        },
        async (payload) => {
          console.log("chats-messages/payload", payload);
          const event = payload.eventType;
          const isInsert = event === "INSERT";
          const isUpdate = event === "UPDATE";
          const isDelete = event === "DELETE";
          const user = await getAurhorizedUser();
          if (isInsert) {
            const newMessage = payload.new as ChatMessage;
            if (user && user.id !== newMessage.from_id) pushMessage(newMessage);
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
