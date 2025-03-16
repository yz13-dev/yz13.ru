import { Tables } from "yz13/supabase/database";

export type ChatRoom = Tables<"chats">;
export type ChatMessage = Tables<"chats-messages">;
export type ChatTag = {
  id: number;
  tag: string;
};
