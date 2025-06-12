"use server";
import { customFetch } from "@/const/fetch";
import type { UserObject } from "@/types/user";
import type { UserAttributes } from "@yz13/supabase/extra";

export const getUserById = async (id: string) => {
  return await customFetch<UserObject | null>(`/user/${id}`, {
    method: "GET",
  });
};

export const getUsersById = async (uids: string[]) => {
  const response = await Promise.all(uids.map(async (id) => await getUserById(id)));


  const result = response.map(item => item.data).filter(item => !!item)

  return result
};

export const updateUser = async (id: string, data: Partial<UserAttributes>) => {
  return await customFetch<UserAttributes>(`/user/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};
