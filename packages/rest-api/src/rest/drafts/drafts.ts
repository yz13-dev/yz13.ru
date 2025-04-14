"use server";

import { customFetch } from "@/const/fetch";
import { Draft } from "@/types/drafts";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { TablesInsert } from "yz13/supabase/database";
import { createClient } from "yz13/supabase/server";

export const getDrafts = async () => {
  return await customFetch<Draft[]>("/drafts", {
    method: "GET",
  });
};

export const getDraft = async (id: string) => {
  return await customFetch<Draft | null>(`/drafts/${id}`, {
    method: "GET",
  });
};

const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const uploadAttachment = async (id: string, file: File) => {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const storage = supabase.storage;
    const randomId = uuid();
    const path = `/${id}/attachments/${randomId}.${file.name.split(".").pop()}`;
    const { data, error } = await storage.from("drafts").upload(path, file);
    if (error) {
      return null;
    } else return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createDraft = async (
  body: TablesInsert<"drafts">,
): Promise<Draft | null> => {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("drafts")
      .insert({
        title: body.title,
        description: body.description,
        tags: body.tags,
        attachments: body.attachments,
        thumbnail: body.thumbnail,
        by: body.by,
        animated: body.animated,
        published_at: body.published_at,
      })
      .select()
      .limit(1)
      .single();
    if (error) {
      return null;
    } else return data as Draft | null;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    revalidateTag("drafts");
  }
};

export const deleteDraft = async (id: string) => {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { error, data } = await supabase.from("drafts").delete().eq("id", id);
    if (error) {
      return null;
    } else return data as Draft | null;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    revalidateTag("drafts");
  }
};
