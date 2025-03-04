import { Tables, TablesInsert } from "@/src/supabase/database";
import { revalidateTag } from "next/cache";
import { customFetch } from "../custom-fetch";

export const getRoom = async (id: string) => {
  return customFetch<Tables<"rooms">>(`/rooms/${id}`, {
    next: {
      revalidate: 3600,
      tags: ["rooms"],
    },
  });
};

export const createRoom = async (body: TablesInsert<"rooms">) => {
  return customFetch<Tables<"rooms">>("/rooms/new", {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      max_members: body.max_members,
      name: body.name,
      public: body.public,
      owner: body.owner,
    }),
  }).finally(() => {
    revalidateTag("rooms");
  });
};
