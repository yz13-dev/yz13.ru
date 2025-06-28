import { expire, redis } from "@/extensions/redis";
import type { Publication, PublicationInsert } from "@/schemas/publications";
import { createClient } from "@yz13/supabase/server";
import { cookies } from "next/headers";

const isDev = process.env.NODE_ENV === "development";

export const getPublications = async (): Promise<Publication[]> => {
  const key = `store/10`;
  const cookieStore = await cookies();
  try {
    const cache = isDev ? null : await redis.get<Publication[]>(key);
    if (cache) {
      return cache;
    } else {
      const supabase = createClient(cookieStore);
      const { data, error } = await supabase
        .from("publications")
        .select("*")
        .eq("is_archived", false)
        .order("created_at", { ascending: false })
        .limit(10);
      if (error) {
        return [];
      } else {
        if (!isDev) await redis.set(key, data, { ex: expire.hour });
        return data || [];
      }
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const createPublication = async (body: PublicationInsert): Promise<Publication | null> => {
  const cookieStore = await cookies();
  try {
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase.from("publications").insert(body).select().maybeSingle();
    if (error) {
      console.log(error);
      return null;
    } else return data;
  } catch (error) {
    return null;
  }
};

export const getPublicationById = async (id: string): Promise<Publication | null> => {
  const cookieStore = await cookies();
  const key = `store/${id}`;
  try {
    const cache = await redis.get<Publication>(key);
    if (cache) {
      return cache;
    } else {
      const supabase = createClient(cookieStore);
      const { data, error } = await supabase
        .from("publications")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) {
        console.log(error);
        return null;
      } else {
        if (data) await redis.set(key, data, { ex: expire.hour });
        return data;
      }
    }
  } catch (error) {
    return null;
  }
}; 