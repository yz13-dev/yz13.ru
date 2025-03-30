import { ChatAttachment, FileWithId } from "@/types/attachments";
import { createClient } from "yz13/supabase/client";

export const uploadAttachment = async (
  chatId: string,
  file: FileWithId,
): Promise<ChatAttachment | null> => {
  try {
    const supabase = createClient();
    const storage = supabase.storage;
    const fileExtension = file.name.split(".").pop();
    if (!fileExtension) throw new Error("File extension not found");
    const path = `/${chatId}/${file.id}.${fileExtension}`;
    const { data, error } = await storage.from("chats").upload(path, file);
    if (error) {
      console.error(error);
      return null;
    }
    return {
      path: data.path,
      name: file.name,
      id: data.id,
      created_at: file.lastModified,
      size: file.size,
      type: file.type,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const uploadAttachments = async (
  chatId: string,
  files: FileWithId[],
): Promise<(ChatAttachment | null)[]> => {
  return Promise.all(files.map((file) => uploadAttachment(chatId, file)));
};

export const removeAttachments = async (paths: string[]) => {
  try {
    const supabase = createClient();
    const storage = supabase.storage;
    const { data, error } = await storage.from("chats").remove(paths);
    if (error) {
      console.error(error);
      return null;
    } else return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
