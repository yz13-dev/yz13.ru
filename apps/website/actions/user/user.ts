"use server";
import { API_URL } from "@/const/api";
import { User } from "@supabase/supabase-js";
import dayjs from "dayjs";
import { SignJWT } from "jose";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const url = new URL(`/user/${id}`, API_URL);
    const res = await fetch(url.toString(), {
      method: "GET",
      next: { revalidate: 3600, tags: [`user/${id}`] },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAuthorizedUser = async (): Promise<User | null> => {
  try {
    const url = new URL("/auth/current", API_URL);
    const res = await fetch(url.toString(), {
      method: "GET",
      credentials: "include",
      // next: { revalidate: 3600, tags: ["user"] },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const signOut = async () => {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    return await supabase.auth.signOut();
  } catch (error) {
    console.error(error);
    return { error: null };
  } finally {
    revalidateTag("user");
  }
};

const makeSignInToken = (email: string, password: string) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? "");
  const exp = dayjs().add(5, "minute").unix();
  return new SignJWT({ email, password })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setExpirationTime(exp)
    .sign(secret);
};

export const signInWithPassword = async (email: string, password: string) => {
  try {
    const token = await makeSignInToken(email, password);
    if (!token) throw new Error("Failed to make sign in token");
    const url = new URL("/auth/login", API_URL);
    const headers = new Headers();
    headers.set("Content-Type", "text/plain");
    const res = await fetch(url.toString(), {
      method: "POST",
      headers,
      body: token,
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const signUpwithPassword = async (email: string, password: string) => {
  try {
    const token = await makeSignInToken(email, password);
    if (!token) throw new Error("Failed to make sign in token");
    const url = new URL("/auth/signup", API_URL);
    const headers = new Headers();
    headers.set("Content-Type", "text/plain");
    const res = await fetch(url.toString(), {
      method: "POST",
      headers,
      body: token,
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
