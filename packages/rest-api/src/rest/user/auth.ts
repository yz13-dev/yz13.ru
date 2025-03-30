"use server";
import { customFetch } from "@/const/fetch";
import { UserObject } from "@/types/user";

export const getAuthorizedUser = async () => {
  return await customFetch<UserObject | null>("/auth/current", {
    method: "GET",
  });
};
