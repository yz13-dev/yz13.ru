"use server";
import { customFetch } from "@/const/fetch";
import { Filter, makeFilterString } from "@/lib/filters";
import { ChatMessage, NewChatMessage } from "@/types/chats";
import { cookies } from "next/headers";
import { TablesUpdate } from "yz13/supabase/database";
import { createClient } from "yz13/supabase/server";

export const createMessageInChat = async (
  body: NewChatMessage,
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
