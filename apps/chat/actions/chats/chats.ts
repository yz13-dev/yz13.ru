"use server";
import { ChatRoom } from "@/types/chat";
import { cookies } from "next/headers";
import { TablesInsert, TablesUpdate } from "yz13/supabase/database";
import { createClient } from "yz13/supabase/server";
import { redis } from "../redis";

export const getChat = async (id: string): Promise<ChatRoom | null> => {
  const key = `chat:${id}`;
  try {
    const cached = await redis.get<ChatRoom>(key);
    if (cached) return cached;
    else {
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
      } else {
        await redis.set(key, JSON.stringify(data), { ex: 3600 });
        return data;
      }
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getChats = async (uid: string) => {
  try {
    const key = `chats:${uid}`;
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
      await redis.set(key, JSON.stringify(data), { ex: 3600 });
      return data;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const createChat = async (body: TablesInsert<"chats">) => {
  const key = `chats:${body.from_id}`;
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
    } else {
      if (body.from_id) await redis.del(key);
      if (data) await redis.set(key, JSON.stringify(data), { ex: 3600 });
      return data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createMessageInChat = async (
  body: TablesInsert<"chats-messages">,
) => {
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
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("chats-messages")
      .select("*")
      .eq("chat_id", id)
      .order("created_at", { ascending: false })
      .limit(30);
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
      return null;
    } else return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateChat = async (id: string, body: TablesUpdate<"chats">) => {
  try {
    const key = `chat:${id}`;
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
    } else {
      await redis.del(key);
      if (data?.from_id) await redis.del(`chats:${data.from_id}`);
      return data;
    }
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
    const key = `chat:${id}`;
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
    } else {
      await redis.del(key);
      if (data?.from_id) await redis.del(`chats:${data.from_id}`);
      return data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
