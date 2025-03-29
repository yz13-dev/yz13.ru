"use server";
import { API_URL } from "@/const/api";
import { User } from "@supabase/supabase-js";
import { cookies } from "next/headers";

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
    const headers = new Headers();
    const cookieStore = cookies();
    const str = cookieStore.toString();
    headers.set("Cookie", str);
    headers.set("Access-Control-Allow-Origin", "https://localhost:3001");
    headers.set("Access-Control-Allow-Credentials", "true");
    const res = await fetch(url.toString(), {
      method: "GET",
      headers,
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
