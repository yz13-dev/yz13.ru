"use server";
import { API_URL } from "@/const/api";
import { NewRelease, Release } from "@/const/releases";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";

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

export const getProject = async (id: string): Promise<Release | null> => {
  try {
    const url = new URL(`/works/${id}`, API_URL);
    const res = await fetch(url.toString(), {
      next: {
        revalidate: 3600,
        tags: ["projects"],
      },
    });
    if (!res.ok) throw new Error("Failed to fetch project");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createProject = async (
  body: NewRelease,
): Promise<Release | null> => {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("works")
      .insert({
        icon: body.icon,
        description: body.description,
        type: body.type || "app",
        name: body.name,
        stage: body.stage || "in_plans",
      })
      .select()
      .limit(1)
      .single();
    if (error) {
      return null;
    } else return data as Release | null;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    revalidateTag("projects");
  }
};

export const updateProject = async (
  id: string,
  body: Partial<NewRelease>,
): Promise<Release | null> => {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("works")
      .update(body)
      .eq("id", id)
      .select()
      .single();
    if (error) {
      return null;
    } else return data as Release | null;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    revalidateTag("projects");
  }
};
