import { createClient } from "yz13/supabase/client";

export async function uploadFile(bucket: string, path: string, file: File) {
  try {
    const supabase = createClient();

    const storage = supabase.storage.from(bucket);

    const { data, error } = await storage.upload(path, file);
    if (error) {
      throw error;
    } else return data;
  } catch (error) {
    return null;
  }
}
