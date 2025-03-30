"use server";
import { API_URL } from "@/const/api";
import { Pricing, ShortPricing } from "rest-api/types/pricing";

export const getFullPricing = async (): Promise<Pricing[]> => {
  try {
    const url = new URL("/pricing", API_URL);
    const res = await fetch(url.toString(), {
      next: {
        revalidate: 3600,
        tags: ["pricing"],
      },
    });
    if (!res.ok) throw new Error("Failed to fetch projects");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getShortPricing = async (): Promise<ShortPricing[]> => {
  try {
    const url = new URL("/pricing/short", API_URL);
    const res = await fetch(url.toString(), {
      next: {
        revalidate: 3600,
        tags: ["pricing"],
      },
    });
    if (!res.ok) throw new Error("Failed to fetch projects");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
