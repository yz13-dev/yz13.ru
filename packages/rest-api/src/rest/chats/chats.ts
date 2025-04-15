"use server";
import { customFetch } from "@/const/fetch";
import { ChatData, ChatRoom } from "@/types/chats";
import { TablesInsert, TablesUpdate } from "yz13/supabase/database";

export const getChat = async (id: string) => {
  return await customFetch<ChatRoom | null>(`/chats/${id}`, {
    method: "GET",
  });
};

export const getChats = async (uid: string) => {
  return await customFetch<ChatRoom[]>(`/chats/user/${uid}`, {
    method: "GET",
  });
};

export const createChat = async (body: TablesInsert<"chats">) => {
  return await customFetch<ChatRoom | null>(`/chats`, {
    method: "POST",
    body: JSON.stringify(body),
  });
};


export const updateChat = async (id: string, body: TablesUpdate<"chats">) => {
  return await customFetch<ChatRoom | null>(`/chats/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  })
};

export const deleteChat = async (id: string) => {
  return await customFetch<ChatRoom | null>(`/chats/${id}`, {
    method: "DELETE"
  })
};

export const getChatsData = async (uid: string) => {
  return customFetch<ChatData>(`/chats/user/${uid}/all`, {
    method: "GET",
  });
};
