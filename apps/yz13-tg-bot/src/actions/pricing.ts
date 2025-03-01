"use server";
import { API_URL } from "../const/api";
import { Pricing, PricingShort } from "../types/pricing";

export const getPricing = async (): Promise<Pricing[]> => {
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

export const getShortPricing = async (): Promise<PricingShort[]> => {
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
