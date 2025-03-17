import { Tables, TablesInsert, TablesUpdate } from "yz13/supabase/database";

export type ChatRoom = Tables<"chats">;
export type ChatMessage = Tables<"chats-messages">;
export type ChatTag = {
  id: number;
  tag: string;
};
export type ChatTask = Tables<"chats-tasks">;
export type NewChatTask = TablesInsert<"chats-tasks">;
export type UpdatedTask = TablesUpdate<"chats-tasks">;
export type ChatList = {
  id: number;
  name: string;
};
