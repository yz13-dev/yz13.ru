"use server";
import client from "@/actions/client";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";
import { schema } from "./schema";

export type Workspace = {
  id: string;
  user: string;
  created_at: string;
  updated_at: string;
};

export const action = client
  .schema(schema)
  .action(async ({ parsedInput: { userId } }) => {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      // @ts-expect-error
      .from("workspaces")
      .select("*")
      .eq("user", userId)
      .limit(1)
      .maybeSingle();
    if (error) {
      return null;
    } else {
      return data;
    }
  });
