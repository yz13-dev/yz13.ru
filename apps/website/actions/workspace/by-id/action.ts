import client from "@/actions/client";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";
import { schema } from "./schema";

const API_URL = "https://api.yz13.dev/";

export const action = client
  .schema(schema)
  .action(async ({ parsedInput: { id } }) => {
    const url = new URL(``, API_URL);
    const cookieStore = await cookies();
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
