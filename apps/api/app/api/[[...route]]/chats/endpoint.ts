import { Hono } from "hono";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";
import {
  getChatById,
  getChatMessage,
  getChatMessages,
  getChatMessagesByTag,
  getChatsCount,
  getChatTasks,
  getChatTasksByListId,
  getLimits,
  getUserChat,
} from "@/app/api/[[...route]]/chats/actions";

export const chats = new Hono();

chats.get("/limits", async (c) => {
  return c.json(getLimits());
});
chats.get("/limits/user/:uid", async (c) => {
  const uid = c.req.param("uid");
  const chatsCount = await getChatsCount(uid);
  const response = {
    chats: chatsCount,
  };
  return c.json(response);
});
chats.get("/limits/chat/:chatId", async (c) => {
  const chatId = c.req.param("chatId");
  const chat = await getChatById(chatId);
  const limits = getLimits();
  const tags = chat ? (chat.tags?.length ?? 0) : 0;
  const taskLists = chat ? (chat.task_lists?.length ?? 0) : 0;
  const response = {
    tags: limits.tags - tags,
    task_lists: limits.task_lists - taskLists,
  };
  return c.json(response);
});

chats.get("/:id", async (c) => {
  const id = c.req.param("id");
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
      return c.json(null);
    } else {
      return c.json(data);
    }
  } catch (error) {
    console.log(error);
    return c.json(null);
  }
});

chats.get("/:id/messages", async (c) => {
  const filter = c.req.query("filter");
  const tag = c.req.query("tag");
  const byTag = filter === "tag";
  const id = c.req.param("id");
  if (tag && byTag) return c.json(await getChatMessagesByTag(id, tag));
  else return c.json(await getChatMessages(id));
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
    const cookieStore = cookies();
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
    const cookieStore = cookies();
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
    const cookieStore = cookies();
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
    const cookieStore = cookies();
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
    const cookieStore = cookies();
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
  const chats = await getUserChat(uid);
  return c.json(chats);
});

chats.get("/user/:uid/all", async (c) => {
  const uid = c.req.param("uid");
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
