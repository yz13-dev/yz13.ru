import { Hono } from "hono";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";

export const chats = new Hono();

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
  const id = c.req.param("id");
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
      return c.json([]);
    } else return c.json(data);
  } catch (error) {
    console.log(error);
    return c.json([]);
  }
});

chats.get("/:id/tasks", async (c) => {
  const id = c.req.param("id");
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("chats-tasks")
      .select("*")
      .eq("chat_id", id);
    if (error) {
      console.log(error);
      return c.json([]);
    } else return c.json(data);
  } catch (error) {
    console.log(error);
    return c.json([]);
  }
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
      return c.json([]);
    } else {
      return c.json(data);
    }
  } catch (error) {
    console.log(error);
    return c.json([]);
  }
});
