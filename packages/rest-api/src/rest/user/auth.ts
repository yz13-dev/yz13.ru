"use server";
import { API_URL } from "../../const/api";
import { UserObject } from "../../types/user";
import { cookies } from "next/headers";

export const getAuthorizedUser = async (): Promise<UserObject | null> => {
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
    return data as UserObject | null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
