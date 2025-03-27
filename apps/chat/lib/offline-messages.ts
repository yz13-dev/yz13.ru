import { ChatMessage, NewChatMessage } from "@/types/chat";
import dayjs from "dayjs";
import randomId from "./random-id";

export const makeOfflineMessage = (message: NewChatMessage): ChatMessage => {
  console.log(message);
  if (!message.chat_id) throw new Error("Chat id is required");
  if (!message.from_id) throw new Error("From id is required");
  else
    return {
      ...message,
      id: randomId(20),
      created_at: dayjs().toISOString(),
      attachments: message.attachments ?? [],
      delivered_at: null,
      edited_at: null,
      message: message.message ?? "",
      reply_to: message.reply_to ?? null,
      tags: message.tags ?? [],
      from_id: message.from_id,
      chat_id: message!.chat_id,
    };
};
