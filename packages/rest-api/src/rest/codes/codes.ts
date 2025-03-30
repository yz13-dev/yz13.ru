"use server";
import { customFetch } from "@/const/fetch";

export const getCountryCodes = async () => {
  return await customFetch<string[]>("/news/codes", {
    method: "GET",
  });
};
