import { wrapUser } from "@/lib/wrap-user";
import type { UserObject } from "@/schemas/user";
import { createClient } from "@yz13/supabase/server";
import { cookies } from "next/headers";

export const getCurrentUser = async (): Promise<UserObject | null> => {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const auth = supabase.auth;

    const {
      data: { user },
      error,
    } = await auth.getUser();

    if (error) {
      return null;
    }

    if (user) {
      return wrapUser(user);
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getCurrentSession = async () => {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const auth = supabase.auth;

    const {
      data: { session },
      error,
    } = await auth.getSession();

    if (error) {
      return null;
    }

    if (session) {
      return session;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const loginUser = async (email: string, password: string): Promise<{ user?: UserObject; error?: string }> => {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const auth = supabase.auth;

    const {
      data: { user },
      error,
    } = await auth.signInWithPassword({ email, password });

    if (error) {
      return { error: error.message };
    }

    if (user) {
      return { user: wrapUser(user) };
    }
    return { error: "Invalid Credentials" };
  } catch (error) {
    console.log(error);
    return { error: "An error occurred" };
  }
};

export const signupUser = async (email: string, password: string): Promise<{ user?: UserObject; error?: string }> => {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const auth = supabase.auth;

    const {
      data: { user },
      error,
    } = await auth.signUp({ email, password });

    if (error) {
      return { error: error.message };
    }

    if (user) {
      return { user: wrapUser(user) };
    }
    return { error: "Invalid Credentials" };
  } catch (error) {
    console.log(error);
    return { error: "An error occurred" };
  }
};

export const logoutUser = async (): Promise<{ status: boolean; error?: string }> => {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const auth = supabase.auth;

    const { error } = await auth.signOut();

    if (error) {
      return { error: error.message, status: false };
    }

    return { status: true };
  } catch (error) {
    console.log(error);
    return { error: "An error occurred", status: false };
  }
};
