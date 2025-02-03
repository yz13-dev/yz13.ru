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

export const createDraft = async (draft: Draft): Promise<Draft | null> => {
  try {
    const url = new URL("/drafts", API_URL);
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const res = await fetch(url.toString(), {
      method: "POST",
      headers,
      body: JSON.stringify(draft),
    });
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
