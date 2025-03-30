"use server";
import { customFetch } from "@/const/fetch";
import { Room } from "@/types/rooms";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { TablesInsert } from "yz13/supabase/database";
import { createClient } from "yz13/supabase/server";

export const getRoom = async (id: string) => {
  return await customFetch<Room | null>(`/rooms/${id}`, {
    method: "GET",
    next: {
      revalidate: 3600,
      tags: ["rooms"],
    },
  });
};

export const createRoom = async (body: TablesInsert<"rooms">) => {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("rooms")
      .insert({
        max_members: body.max_members,
        name: body.name,
        public: body.public,
        owner: body.owner,
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
    revalidateTag("rooms");
  }
};
