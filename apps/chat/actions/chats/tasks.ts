"use server";

import { ChatTask, NewChatTask } from "@/types/chat";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";

export const getTasks = async (chatId: string): Promise<ChatTask[]> => {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("chats-tasks")
      .select("*")
      .eq("chat_id", chatId);
    if (error) {
      console.log(error);
      return [];
    } else return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const createTask = async (chatId: string, task: NewChatTask) => {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase.from("chats-tasks").insert({
      ...task,
      chat_id: chatId,
    });
    if (error) {
      console.log(error);
      return null;
    } else return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
