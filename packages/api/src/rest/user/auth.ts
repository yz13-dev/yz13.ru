"use server";
import { customFetch } from "@/const/fetch";
import type { Session, UserObject } from "@/types/user";

export const getAuthorizedUser = async () => {
  return await customFetch<UserObject | null>("/auth/current", {
    method: "GET",
  });
};


export const getAuthorizedSession = async () => {
  return await customFetch<Session | null>("/auth/current/session");
}
