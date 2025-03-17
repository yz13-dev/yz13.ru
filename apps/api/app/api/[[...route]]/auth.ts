import { User } from "@supabase/supabase-js";
import { Hono } from "hono/quick";
import { decodeJwt } from "jose/jwt/decode";
import { cookies } from "next/headers";
import { isDev } from "yz13/env";
import { createClient } from "yz13/supabase/server";

export const auth = new Hono();

export const makeUserObj = (user: User) => {
  const role = user.user_metadata.role as string;
  const username = user.user_metadata.username as string;
  return {
    id: user.id,
    email: user.email,
    email_confirmed_at: user.email_confirmed_at,
    phone: user.phone,
    created_at: user.created_at,
    updated_at: user.updated_at,
    last_signin_at: user.last_sign_in_at,
    role,
    username,
  };
};

auth.get("/callback", async (c) => {
  const code = c.req.query("code");
  const next = c.req.query("continue") || "/";
  const nextIsExternalLink =
    next.startsWith("http://") || next.startsWith("https://");

  const cookieStore = cookies();
  const origin = isDev ? "http://localhost:3001" : "https://yz13.ru";

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

auth.get("/current", async (c) => {
  try {
    const cookieStore = cookies();
    // const cookie = getCookie(c);
    const supabase = createClient(cookieStore);
    const auth = supabase.auth;
    // console.log(cookieStore.getAll(), cookie);
    const {
      data: { user },
      error,
    } = await auth.getUser();
    console.log(user, error);
    if (error) {
      // console.log(error);
      return c.json(null);
    } else {
      if (user) {
        return c.json(makeUserObj(user));
      } else return c.json(null);
    }
  } catch (error) {
    console.log(error);
    return c.json(null);
  }
});

auth.post("/login", async (c) => {
  const token = await c.req.text();
  const decoded = decodeJwt(token);
  const email = decoded.email as string | undefined;
  const password = decoded.password as string | undefined;
  if (email && password) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return c.json(null);
    else return c.json(data);
  } else return c.json(null);
});

auth.post("/signup", async (c) => {
  const email = await c.req.text();
  const password = await c.req.text();
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) return c.json(null);
  else return c.json(data);
});
