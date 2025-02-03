"use server";

import { API_URL } from "@/const/api";
import { NewRelease, Release } from "@/const/releases";
import { revalidateTag } from "next/cache";

export const getProjects = async (): Promise<Release[]> => {
  try {
    const url = new URL("/works", API_URL);
    const res = await fetch(url.toString(), {
      next: {
        revalidate: 3600,
        tags: ["projects"],
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

export const createProject = async (
  body: NewRelease,
): Promise<Release | null> => {
  try {
    const url = new URL("/works", API_URL);
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const res = await fetch(url.toString(), {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error("Failed to create project");
    revalidateTag("projects");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
