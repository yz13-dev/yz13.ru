import client from "@/actions/client";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";
import { schema } from "./schema";

export const action = client
  .schema(schema)
  .action(async ({ parsedInput: { id } }) => {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      // @ts-expect-error
      .from("workspaces")
      .select("*")
      .eq("id", id)
      .limit(1)
      .maybeSingle();
    if (error) {
      return null;
    } else {
      return data;
    }
  });
