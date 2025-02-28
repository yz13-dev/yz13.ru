"use server";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";

export const getPricing = async () => {
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase.from("pricing").select("*");
    if (error) return [];
    else return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getShortPricing = async () => {
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("pricing")
      .select("id, price, created_at, name, description, type");
    if (error) return [];
    else return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
