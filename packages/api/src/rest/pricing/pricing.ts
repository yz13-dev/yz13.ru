"use server";
import { customFetch } from "@/const/fetch";
import { Pricing, ShortPricing } from "@/types/pricing";

export const getFullPricing = async () => {
  return await customFetch<Pricing[]>("/pricing", {
    method: "GET",
  });
};

export const getShortPricing = async () => {
  return await customFetch<ShortPricing[]>("/pricing/short", {
    method: "GET",
  });
};
