import { Tables, TablesInsert, TablesUpdate } from "yz13/supabase/database";
import { ChatAttachment } from "./attachments";

export type ChatRoom = Tables<"chats">;
export type ChatMessage = Tables<"chats-messages">;
export type NewChatMessage = TablesInsert<"chats-messages">;
export type GroupedChatMessages = Record<string, ChatMessage[]>;
export type ChatTag = {
  id: number;
  tag: string;
};
export type SelectedChatMessage = {
  id: ChatMessage["id"];
  from_id: ChatMessage["from_id"];
};
export type ChatTask = Tables<"chats-tasks">;
export type NewChatTask = TablesInsert<"chats-tasks">;
export type UpdatedTask = TablesUpdate<"chats-tasks">;
export type ChatList = {
  id: number;
  name: string;
};
export type ChatData = {
  chats: ChatRoom[];
  messages: ChatMessage[];
  tasks: ChatTask[];
  tags: ChatTag[];
  attachments: ChatAttachment[];
};
