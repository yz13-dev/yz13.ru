"use server";
import client from "@/actions/client";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";
import { schema } from "./schema";

export const action = client
  .schema(schema)
  .action(async ({ parsedInput: { workspace } }) => {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      // @ts-expect-error
      .from("grids")
      .select("*")
      .eq("workspace", workspace);
    if (error) {
      return null;
    } else {
      return data;
    }
  });
