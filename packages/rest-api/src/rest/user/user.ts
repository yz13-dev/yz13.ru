"use server";
import { UserObject } from "@/types/user";
import { customFetch } from "@/const/fetch";

export const getUserById = async (id: string) => {
  return await customFetch<UserObject | null>(`/user/${id}`, {
    method: "GET",
    next: { revalidate: 3600, tags: [`user/${id}`] },
  });
};

export const getUsersById = async (uids: string[]) => {
  return await Promise.all(uids.map(async (id) => await getUserById(id)));
};
