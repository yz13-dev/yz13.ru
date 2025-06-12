import { makeUserObj } from "@yz13/api/lib/make-user-obj";
import { createClient } from "@yz13/supabase/server";
import { Hono } from "hono/quick";
import { cookies } from "next/headers";

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
    }

    if (user) {
      return c.json(makeUserObj(user));
    }
    return c.json(null);

  } catch (error) {
    console.log(error);
    return c.json(null);
  }
});

auth.get("/current/session", async (c) => {
  try {
    const cookieStore = await cookies();
    // const cookie = getCookie(c);
    const supabase = createClient(cookieStore);
    const auth = supabase.auth;
    // console.log(cookieStore.getAll(), cookie);
    const {
      data: { session },
      error,
    } = await auth.getSession();
    if (error) {
      // console.log(error);
      return c.json(null);
    }

    if (session) {
      return c.json(session);
    }
    return c.json(null);

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
    }

    if (user) {
      return c.json({ user: makeUserObj(user) });
    }
    return c.json({ error: "Invalid Credentials" });

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
    }

    if (user) {
      return c.json({ user: makeUserObj(user) });
    } return c.json({ error: "Invalid Credentials" });

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
    }

    if (!error) return c.json({ status: true });
    return c.json({ error, status: false });

  } catch (error) {
    console.log(error);
    return c.json({ error });
  }
});
