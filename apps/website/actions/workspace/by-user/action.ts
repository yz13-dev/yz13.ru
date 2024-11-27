import client from "@/actions/client";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";
import { schema } from "./schema";

export const getWorkspacesByUser = client
  .schema(schema)
  .action(async ({ parsedInput: { id } }) => {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      // @ts-expect-error
      .from("workspaces")
      .select("*")
      .eq("user", id)
      .order("created_at", { ascending: false })
      .limit(10);
    if (error) return [];
    else return data;
  });
