"use server";
import { customFetch } from "@/const/fetch";
import { ChatData, ChatMessage, ChatRoom } from "@/types/chats";
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

export const createMessageInChat = async (
  body: TablesInsert<"chats-messages">,
): Promise<ChatMessage | null> => {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("chats-messages")
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

export const getChatMessages = async (id: string) => {
  return await customFetch<ChatMessage[]>(`/chats/${id}/messages`, {
    method: "GET",
  });
};

export const getChatMessage = async (id: string, messageId: string) => {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("chats-messages")
      .select("*")
      .eq("chat_id", id)
      .eq("id", messageId)
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

export const deleteMessageFromChat = async (id: string) => {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("chats-messages")
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

export const updateChatMessage = async (
  id: string,
  body: TablesUpdate<"chats-messages">,
) => {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("chats-messages")
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
