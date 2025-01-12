import { Hono } from "hono/quick";
import { cookies } from "next/headers";
import { createAdminClient } from "yz13/supabase/admin";
import { z } from "zod";

export const visitor_session = new Hono();

const sessionBodySchema = z.object({
  visitor_id: z.string(),
  duration: z.number(),
});

visitor_session.post("/", async (c) => {
  try {
    const cookieStore = cookies();
    const supabase = createAdminClient(cookieStore);
    const body = await c.req.json();
    sessionBodySchema.parse(body);
    const { data, error } = await supabase
      // @ts-expect-error
      .from("visitor-session")
      .insert({
        // @ts-expect-error
        visitor_id: body.visitor_id,
        duration: body.duration,
      })
      .select();
    console.log(body, data, error);
    if (error) throw new Error(error.message);
    return c.json({ status: "ok" }, 200);
  } catch (error) {
    return c.json({ status: "error" }, 400);
  }
});
