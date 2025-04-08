import { Hono } from "hono";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";

export const chats = new Hono();

const getLimits = () => {
  return {
    chats: 10,
    tags: 10,
    task_lists: 10,
  };
};
const getChatsCount = async (uid: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { count } = await supabase
    .from("chats")
    .select("*", { count: "exact" })
    .eq("from_id", uid);
  const chatsLimits = getLimits().chats;
  return chatsLimits - (count ?? 0);
};
chats.get("/limits", async (c) => {
  return c.json(getLimits());
});
chats.get("/limits/chats/:uid", async (c) => {
  const uid = c.req.param("uid");
  const chatsCount = await getChatsCount(uid);
  return c.json(chatsCount);
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

const getChatMessages = async (id: string, offset: number = 0) => {
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
const getChatMessagesByTag = async (id: string, tagId: string) => {
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
chats.get("/:id/messages", async (c) => {
  const filter = c.req.query("filter");
  const tag = c.req.query("tag");
  const byTag = filter === "tag";
  const id = c.req.param("id");
  if (tag && byTag) return c.json(await getChatMessagesByTag(id, tag));
  else return c.json(await getChatMessages(id));
});

const getChatTasks = async (id: string) => {
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
const getChatTasksByListId = async (id: string, listId: string) => {
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

const getUserChat = async (uid: string) => {
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
chats.get("/user/:uid", async (c) => {
  const uid = c.req.param("uid");
  return c.json(await getUserChat(uid));
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
