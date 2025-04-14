import { Hono } from "hono/quick";
import { cookies } from "next/headers";
import { makeUserObj } from "rest-api/lib/make-user-obj";
import { createClient } from "yz13/supabase/server";

export const auth = new Hono();

auth.get("/current", async (c) => {
  try {
    const cookieStore = await cookies();
    // const cookie = getCookie(c);
    const supabase = createClient(cookieStore);
    const auth = supabase.auth;
    // console.log(cookieStore.getAll(), cookie);
    const {
      data: { user },
      error,
    } = await auth.getUser();
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
  try {
    const cookieStore = await cookies();
    const { email, password } = await c.req.json();
    const supabase = createClient(cookieStore);
    const auth = supabase.auth;
    const {
      data: { user },
      error,
    } = await auth.signInWithPassword({ email, password });
    if (error) {
      console.log(error);
      return c.json({ error: error.message });
    } else {
      if (user) {
        return c.json({ user: makeUserObj(user) });
      } else return c.json({ error: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    return c.json({ error });
  }
});

auth.post("/signup", async (c) => {
  try {
    const { email, password } = await c.req.json();
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const auth = supabase.auth;
    const {
      data: { user },
      error,
    } = await auth.signUp({ email, password });
    if (error) {
      console.log(error);
      return c.json({ error });
    } else {
      if (user) {
        return c.json({ user: makeUserObj(user) });
      } else return c.json({ error: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    return c.json({ error });
  }
});

auth.post("/logout", async (c) => {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const auth = supabase.auth;
    const { error } = await auth.signOut();
    if (error) {
      console.log(error);
      return c.json({ error });
    } else {
      if (!error) return c.json({ status: true });
      else return c.json({ error, status: false });
    }
  } catch (error) {
    console.log(error);
    return c.json({ error });
  }
});
