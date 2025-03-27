"use server";
import { API_URL } from "@/const/api";
import { makeUserObj } from "@/lib/make-user-obj";
import { cookies } from "next/headers";
import { UserObject } from "types/user";
import { createClient } from "yz13/supabase/server";

export const getUserById = async (id: string): Promise<UserObject | null> => {
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

export const getAuthorizedUser = async (): Promise<UserObject | null> => {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;
    else return makeUserObj(user);
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const getAuthorizedUserFromServer =
  async (): Promise<UserObject | null> => {
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
