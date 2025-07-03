import { createClient } from "@yz13/supabase/server";
import { cookies } from "next/headers";



export default async function (code: string) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    if (code) {
      const { data, error } = await supabase
        .from("news_sources")
        .select()
        .eq("country_code", code.toUpperCase());

      if (error) {
        return [];
      }
      return data || [];
    }

    const { data, error } = await supabase.from("news_sources").select();
    if (error) {
      return [];
    }
    return data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
}
