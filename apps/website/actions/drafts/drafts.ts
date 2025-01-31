"use server";

import { API_URL } from "@/const/api";
import { Draft } from "@/types/drafts";

export const getDrafts = async (): Promise<Draft[]> => {
  try {
    const url = new URL("/drafts", API_URL);
    const res = await fetch(url.toString());
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getDraft = async (id: string): Promise<Draft | null> => {
  try {
    const url = new URL(`/drafts/${id}`, API_URL);
    const res = await fetch(url.toString());
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
