"use server";
import { customFetch } from "@/const/fetch";
import { ChatData, ChatRoom } from "@/types/chats";
import { cookies } from "next/headers";
import { TablesInsert, TablesUpdate } from "yz13/supabase/database";
import { createClient } from "yz13/supabase/server";

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
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("chats")
      .insert(body)
      .select("*")
      .maybeSingle();
    if (error) {
      console.log(error);
      return null;
    } else return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateChat = async (id: string, body: TablesUpdate<"chats">) => {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("chats")
      .update(body)
      .eq("id", id)
      .select("*")
      .maybeSingle();
    if (error) {
      console.log(error);
      return null;
    } else return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteChat = async (id: string) => {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("chats")
      .delete()
      .eq("id", id)
      .select("*")
      .maybeSingle();
    if (error) {
      console.log(error);
      return null;
    } else return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getChatsData = async (uid: string) => {
  return customFetch<ChatData>(`/chats/user/${uid}/all`, {
    method: "GET",
  });
};
