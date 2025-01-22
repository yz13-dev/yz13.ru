"use server";
import { API_URL } from "@/const/api";

export const getUser = async (uid: string) => {
  try {
    const url = new URL(`/user/${uid}`, API_URL);
    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
