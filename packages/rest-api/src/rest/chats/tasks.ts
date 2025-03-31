"use server";
import { customFetch } from "@/const/fetch";
import { ChatTask, NewChatTask, UpdatedTask } from "@/types/chats";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";

export const getTasks = async (chatId: string) => {
  return await customFetch<ChatTask[]>(`/chats/${chatId}/tasks`, {
    method: "GET",
  });
};

export const getTasksByChatId = async (chatId: string) => {
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
export const updateTask = async (taskId: string, task: UpdatedTask) => {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("chats-tasks")
      .update(task)
      .eq("id", taskId)
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

export const deleteTask = async (taskId: string) => {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("chats-tasks")
      .delete()
      .eq("id", taskId)
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
