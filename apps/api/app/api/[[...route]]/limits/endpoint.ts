import { Hono } from "hono";
import { chatsLimits, getChatsLimitsByUserId } from "./actions";


export const limits = new Hono()

limits.get("/chats", (c) => {
  return c.json(chatsLimits)
})

limits.get("/chats/:uid", async (c) => {
  const uid = c.req.param("uid")
  const limits = await getChatsLimitsByUserId(uid)
  return c.json(limits)
})
