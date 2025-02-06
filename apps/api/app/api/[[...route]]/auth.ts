import { Hono } from "hono/quick";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";

export const auth = new Hono();

auth.get("/callback", async (c) => {
  const code = c.req.query("code");
  const next = c.req.query("continue") || "/";
  const nextIsExternalLink =
    next.startsWith("http://") || next.startsWith("https://");

  const cookieStore = cookies();
  const origin =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001"
      : "https://yz13.ru";

  console.log(code, next, origin);

  if (code) {
    const supabase = createClient(cookieStore);
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      if (nextIsExternalLink) {
        return c.redirect(next);
      } else return c.redirect(`${origin}${next}`);
    }
  }

  return c.redirect(`${origin}/auth/auth-code-error`);
});
