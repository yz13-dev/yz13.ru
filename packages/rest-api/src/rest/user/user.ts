"use server";
import { UserObject } from "../../types/user";
import { API_URL } from "../../const/api";

export const getUserById = async (id: string): Promise<UserObject | null> => {
  try {
    const url = new URL(`/user/${id}`, API_URL);
    const res = await fetch(url.toString(), {
      method: "GET",
      next: { revalidate: 3600, tags: [`user/${id}`] },
    });
    const data = await res.json();
    return data as UserObject | null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getUsersById = async (
  uids: string[],
): Promise<(UserObject | null)[]> => {
  try {
    return await Promise.all(uids.map(async (id) => await getUserById(id)));
  } catch (error) {
    console.error(error);
    return [];
  }
};
