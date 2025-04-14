import { Hono } from "hono/quick";
import { cookies } from "next/headers";
import { createAdminClient } from "yz13/supabase/admin";
import { z } from "zod";

export const visitor_session = new Hono();

const sessionBodySchema = z.object({
  visitor_id: z.string(),
  duration: z.number(),
  user_id: z.string().optional(),
  user_agent: z.string().optional(),
});

visitor_session.post("/", async (c) => {
  try {
    const cookieStore = await cookies();
    const supabase = createAdminClient(cookieStore);
    const body = await c.req.json();
    sessionBodySchema.parse(body);
    const { data, error } = await supabase
      .from("visitor-session")
      .insert({
        visitor_id: body.visitor_id,
        duration: body.duration,
        user_id: body.user_id ?? null,
        user_agent: body.user_agent ?? null,
      })
      .select();
    if (error) throw new Error(error.message);
    return c.json({ status: "ok" }, 200);
  } catch (error) {
    return c.json({ status: "error" }, 400);
  }
});
