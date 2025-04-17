"use client";
import { Button } from "mono/components/button";
import { toast, Toaster } from "mono/components/sonner";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { getAuthorizedUser } from "rest-api/auth";
import { ChatMessage, ChatRoom, ChatTask } from "rest-api/types/chats";
import { getUserById } from "rest-api/user";
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
  className?: string;
};
const ChatProvider = ({
  children,
  chat,
  className = "",
}: ChatProviderProps) => {
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
          const event = payload.eventType;
          // console.log("chats/payload", event, payload);
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
          const event = payload.eventType;
          // console.log("chats-tasks/payload", event, payload);
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
          const event = payload.eventType;
          // console.log("chats-messages/payload", event, payload);
          const isInsert = event === "INSERT";
          const isUpdate = event === "UPDATE";
          const isDelete = event === "DELETE";
          const { data: user } = await getAuthorizedUser();
          if (isInsert) {
            const newMessage = payload.new as ChatMessage;
            const notFromMe = newMessage.from_id !== user?.id;
            if (notFromMe) {
              pushMessage(newMessage);
              const uid = newMessage.from_id;
              const { data: user } = await getUserById(uid);
              const userName = user?.username ?? user?.email ?? user?.phone;
              toast(userName, {
                description: (
                  <span className="text-sm text-muted-foreground">
                    {newMessage.message}
                  </span>
                ),
                action: (
                  <Button asChild variant="default" className="ml-auto">
                    <Link href={`/${chat.id}`}>Открыть</Link>
                  </Button>
                ),
              });
            }
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
  return (
    <div className={className}>
      <Toaster position="bottom-right" />
      {children}
    </div>
  );
};

export default ChatProvider;
