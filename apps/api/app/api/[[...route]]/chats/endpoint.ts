import {
  getChatMessage,
  getChatMessages,
  getChatMessagesByTag,
  getChatTasks,
  getChatTasksByListId,
  getUserChat,
} from "@/app/api/[[...route]]/chats/actions";
import { expire, redis } from "@/extensions/redis";
import { Hono } from "hono";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";
import { getChatsLimitsByUserId } from "../limits/actions";

export const chats = new Hono();

chats.post("/", async (c) => {
  const chat = await c.req.json();
  const fromId = chat.from_id;
  const key = `chats/${fromId}`;
  try {
    const limits = await getChatsLimitsByUserId(fromId);
    if (limits.chats < 0)
      throw new Error(`User ${fromId} has reached the limit of chats`);
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("chats")
      .insert(chat)
      .select("*")
      .maybeSingle();
    if (error) {
      console.log(error);
      return c.json(null);
    } else {
      await redis.set(key, JSON.stringify(data), { ex: expire.day });
      return c.json(data);
    }
  } catch (error) {
    console.log(error);
    return c.json(null);
  }
});

chats.get("/:id", async (c) => {
  const id = c.req.param("id");
  const key = `chats/${id}`;
  try {
    const cache = await redis.get(key);
    if (cache) return c.json(cache);
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("chats")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) {
      console.log(error);
      return c.json(null);
    } else {
      return c.json(data);
    }
  } catch (error) {
    console.log(error);
    return c.json(null);
  }
});

chats.patch("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const key = `chats/${id}`;
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("chats")
      .update(body)
      .eq("id", id)
      .select("*")
      .maybeSingle();
    if (error) {
      console.log(error);
      return c.json(null);
    } else {
      await redis.set(key, JSON.stringify(data), { ex: expire.day });
      return c.json(data);
    }
  } catch (error) {
    console.log(error);
    return c.json(null);
  }
});

chats.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const key = `chats/${id}`;
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("chats")
      .delete()
      .eq("id", id)
      .select("*")
      .maybeSingle();
    if (error) {
      console.log(error);
      return c.json(null);
    } else {
      await redis.del(key);
      return c.json(data);
    }
  } catch (error) {
    console.log(error);
    return c.json(null);
  }
});

chats.get("/:id/messages", async (c) => {
  const offset = parseInt(c.req.query("offset") || "0");
  const filter = c.req.query("filter");
  const tag = c.req.query("tag");
  const byTag = filter === "tag";
  const id = c.req.param("id");
  if (tag && byTag) return c.json(await getChatMessagesByTag(id, tag, offset));
  else return c.json(await getChatMessages(id, offset));
});
chats.get("/:id/messages/:message_id", async (c) => {
  const id = c.req.param("id");
  const message_id = c.req.param("message_id");
  const message = await getChatMessage(id, message_id);
  return c.json(message);
});
chats.post("/:id/messages", async (c) => {
  const message = await c.req.json();
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("chats-messages")
      .insert(message)
      .select("*")
      .maybeSingle();
    if (error) {
      console.log(error);
      return c.json(null);
    } else return c.json(data);
  } catch (error) {
    console.log(error);
    return c.json(null);
  }
});
chats.patch("/:id/messages/:message_id", async (c) => {
  const id = c.req.param("id");
  const message_id = c.req.param("message_id");
  const message = await c.req.json();
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("chats-messages")
      .update(message)
      .eq("chat_id", id)
      .eq("id", message_id)
      .select("*")
      .maybeSingle();
    if (error) {
      console.log(error);
      return c.json(null);
    } else return c.json(data);
  } catch (error) {
    console.log(error);
    return c.json(null);
  }
});
chats.delete("/:id/messages/:message_id", async (c) => {
  const message_id = c.req.param("message_id");
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("chats-messages")
      .delete()
      .eq("id", message_id)
      .select("*")
      .maybeSingle();
    if (error) {
      console.log(error);
      return c.json(null);
    } else return c.json(data);
  } catch (error) {
    console.log(error);
    return c.json(null);
  }
});

chats.get("/:id/tasks", async (c) => {
  const filter = c.req.query("filter");
  const list = c.req.query("list");
  const byList = filter === "list";
  const id = c.req.param("id");
  if (list && byList) return c.json(await getChatTasksByListId(id, list));
  else return c.json(await getChatTasks(id));
});

chats.get("/:id/messages/:message_id", async (c) => {
  const id = c.req.param("id");
  const message_id = c.req.param("message_id");
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("chats-messages")
      .select("*")
      .eq("chat_id", id)
      .eq("id", message_id)
      .maybeSingle();
    if (error) {
      console.log(error);
      return c.json(null);
    } else return c.json(data);
  } catch (error) {
    console.log(error);
    return c.json(null);
  }
});

chats.get("/:id/tasks/:task_id", async (c) => {
  const id = c.req.param("id");
  const task_id = c.req.param("task_id");
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("chats-tasks")
      .select("*")
      .eq("chat_id", id)
      .eq("id", task_id)
      .maybeSingle();
    if (error) {
      console.log(error);
      return c.json(null);
    } else return c.json(data);
  } catch (error) {
    console.log(error);
    return c.json(null);
  }
});

chats.get("/user/:uid", async (c) => {
  const uid = c.req.param("uid");
  const key = `chats/user/${uid}`;
  const cache = await redis.get(key);
  if (cache) return c.json(cache);
  try {
    const chats = await getUserChat(uid);
    return c.json(chats);
  } catch (error) {
    console.log(error);
    return c.json([]);
  }
});

chats.get("/user/:uid/all", async (c) => {
  const uid = c.req.param("uid");
  const key = `chats/user/${uid}/all`;
  const cache = await redis.get(key);
  if (cache) return c.json(cache);
  const chats = await getUserChat(uid);
  const tags = chats.map((chat) => chat.tags).flat();
  const attachments = chats.map((chat) => chat.attachments).flat();
  const chatIds = chats.map((chat) => chat.id);
  const tasks = await Promise.all(
    chatIds.map(async (id) => {
      return await getChatTasks(id);
    }),
  );
  const messages = await Promise.all(
    chatIds.map(async (id) => {
      return await getChatMessages(id);
    }),
  );
  return c.json({
    tags,
    attachments,
    chats,
    tasks: tasks.flat(),
    messages: messages.flat(),
  });
});
