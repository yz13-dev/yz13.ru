"use server";
import { customFetch } from "@/const/fetch";
import { Filter, makeFilterString } from "@/lib/filters";
import { ChatMessage, NewChatMessage } from "@/types/chats";
import { TablesUpdate } from "yz13/supabase/database";

export const createMessageInChat = async (body: NewChatMessage) => {
  return await customFetch<ChatMessage | null>(
    `/chats/${body.chat_id}/messages`,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};

export const getChatMessages = async (id: string, filters?: Filter[]) => {
  const filterArray = filters ?? [];
  const query =
    filterArray.length !== 0
      ? "?" + decodeURIComponent(makeFilterString(filterArray))
      : "";
  return await customFetch<ChatMessage[]>(`/chats/${id}/messages${query}`, {
    method: "GET",
  });
};

export const getChatMessage = async (id: string, messageId: string) => {
  return await customFetch<ChatMessage | null>(
    `/chats/${id}/messages/${messageId}`,
    {
      method: "GET",
    },
  );
};

export const deleteChatMessage = async (id: string, messageId: string) => {
  return await customFetch<ChatMessage | null>(
    `/chats/${id}/messages/${messageId}`,
    {
      method: "DELETE",
    },
  );
};

export const updateChatMessage = async (
  id: string,
  body: TablesUpdate<"chats-messages">,
) => {
  return await customFetch<ChatMessage | null>(
    `/chats/${id}/messages/${body.id}`,
    {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};
