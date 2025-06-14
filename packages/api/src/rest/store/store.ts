"use server";

import { customFetch } from "@/const/fetch";
import type { Publication } from "@/types/store";

export async function getPublications() {
  return customFetch<Publication[]>("/store");
}

export async function getPublication(id: string) {
  return customFetch<Publication>(`/store/${id}`);
}
