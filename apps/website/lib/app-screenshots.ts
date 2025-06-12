"use server";
import { createClient } from "@yz13/supabase/server";
import { cookies } from "next/headers";

export async function getAppScreenshots(appId: string) {
  const folder = `${appId}/screenshots`;
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const storage = supabase.storage.from("apps");
    const { data, error } = await storage.list(folder, { limit: 100 });
    if (error) {
      console.error(error);
      return [];
    } else {
      const paths = data?.map(
        (item) => `/apps/${appId}/screenshots/${item.name}`,
      );
      return paths;
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}
