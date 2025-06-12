import { createClient } from "@yz13/supabase/server";
import { cookies } from "next/headers";



export const getDefaultCalendar = async (uid: string) => {
  try {
    const cookieStore = await cookies();

    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from("calendar")
      .select()
      .eq("user_id", uid)
      .eq("is_default", true)
      .maybeSingle()
    if (error) {
      console.log(error)
      return null;
    } return data;

  } catch (error) {
    console.log(error)
    return null;
  }
}

export const getCalendars = async (uid: string) => {
  try {
    const cookieStore = await cookies();

    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from("calendar")
      .select()
      .eq("user_id", uid)
    if (error) {
      console.log(error)
      return [];
    } return data;

  } catch (error) {
    console.log(error)
    return [];
  }
}


export const getCalendar = async (id: string) => {
  try {
    const cookieStore = await cookies();

    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from("calendar")
      .select()
      .eq("id", id)
      .maybeSingle()
    if (error) {
      console.log(error)
      return null;
    } return data;

  } catch (error) {
    console.log(error)
    return null;
  }
}
