"use server";
import { customFetch } from "@/const/fetch";
import { NewRelease, Release } from "@/types/projects";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";

export const getProjects = async () => {
  return await customFetch<Release[]>("/works", {
    method: "GET",
  });
};

export const getProject = async (id: string) => {
  return await customFetch<Release | null>(`/works/${id}`, {
    method: "GET",
  });
};

export const createProject = async (
  body: NewRelease,
): Promise<Release | null> => {
  try {
    const cookieStore = await cookies();
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
    } else return data;
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
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("works")
      .update({
        description: body.description,
        icon: body.icon,
        name: body.name,
        stage: body.stage || "in_plans",
        type: body.type || "app",
      })
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

export const deleteProject = async (id: string): Promise<Release | null> => {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("works")
      .delete()
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
