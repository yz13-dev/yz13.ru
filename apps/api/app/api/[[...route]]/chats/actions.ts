import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";

export const getLimits = () => {
  return {
    chats: 10,
    tags: 10,
    task_lists: 10,
  };
};
export const getChatsCount = async (uid: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { count } = await supabase
    .from("chats")
    .select("*", { count: "exact" })
    .eq("from_id", uid);
  const chatsLimits = getLimits().chats;
  return chatsLimits - (count ?? 0);
};

export const getChatTasks = async (id: string) => {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("chats-tasks")
      .select("*")
      .eq("chat_id", id);
    if (error) {
      console.log(error);
      return [];
    } else return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getChatTasksByListId = async (id: string, listId: string) => {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const listIdAsNumber = parseInt(listId);
    const { data, error } = await supabase
      .from("chats-tasks")
      .select("*")
      .eq("chat_id", id)
      .eq("task_list", listIdAsNumber);
    if (error) {
      console.log(error);
      return [];
    } else return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getChatById = async (id: string) => {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("chats")
      .select("*")
      .eq("id", id)
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

export const getUserChat = async (uid: string) => {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("chats")
      .select("*")
      .contains("chat_participants", [uid])
      .order("created_at", { ascending: false })
      .limit(10);
    if (error) {
      console.log(error);
      return [];
    } else {
      return data;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getChatMessages = async (id: string, offset: number = 0) => {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("chats-messages")
      .select("*")
      .eq("chat_id", id)
      .order("created_at", { ascending: false })
      .range(offset, offset + 100);
    if (error) {
      console.log(error);
      return [];
    } else return data;
  } catch (error) {
    console.log(error);
    return [];
  }
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
      return [];
    } else return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getChatMessagesByTag = async (id: string, tagId: string) => {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const tagIdAsNumber = parseInt(tagId);
    const { data, error } = await supabase
      .from("chats-messages")
      .select("*")
      .eq("chat_id", id)
      .contains("tags", [tagIdAsNumber])
      .order("created_at", { ascending: false });
    if (error) {
      console.log(error);
      return [];
    } else return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
