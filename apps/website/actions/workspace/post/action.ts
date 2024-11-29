"use server";
import client from "@/actions/client";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";
import { schema } from "./schema";

export const action = client
  .schema(schema)
  .action(async ({ parsedInput: { userId } }) => {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      // @ts-expect-error
      .from("workspaces")
      // @ts-expect-error
      .insert([{ user: userId }])
      .select();
    console.log(data, error);
    if (error) {
      return null;
    } else {
      return data;
    }
  });
