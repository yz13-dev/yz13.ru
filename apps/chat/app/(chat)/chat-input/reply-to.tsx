"use client";

import { getChatMessage } from "@/actions/chats/chats";
import { getUserById } from "@/actions/user/user";
import { ChatAttachment, ChatMessage } from "@/types/chat";
import { useEffect, useMemo, useState } from "react";
import { UserObject } from "types/user";
import { getMessage } from "../chat-api/chat-api";
import { useChatApi } from "../chat-api/chat-provider";
import { AttachmentsPreviews } from "./attachments-preview-row";

const ReplyTo = ({ chatId, replyTo }: { replyTo: string; chatId?: string }) => {
  const [user, setUser] = useState<UserObject | null>(null);
  const [message, setMessage] = useState<ChatMessage | null>(null);
  const handleReplyMessage = async (id: string) => {
    if (!chatId) return;
    const localMessage = getMessage(id);
    if (localMessage) {
      setMessage(localMessage);
    } else {
      const message = await getChatMessage(chatId, id);
      if (message) setMessage(message);
    }
  };
  const handleReplyUser = async (id: string) => {
    if (!chatId) return;
    const user = await getUserById(id);
    if (user) setUser(user);
  };
  const replyMessageLabel = useMemo(() => {
    if (!message) return "Ответить";
    const { message: text, attachments } = message;
    if (text !== "") return text;
    if (attachments && attachments.length === 1) return "Вложение";
    if (attachments && attachments.length > 1) return "Вложения";
    return "Ответить";
  }, [message]);
  const chat = useChatApi((state) => state.chat);
  const chatAttachments = useMemo(
    () => (chat?.attachments ?? []) as ChatAttachment[],
    [chat],
  );
  const attachments = useMemo(() => {
    if (!message) return [];
    return (message.attachments ?? [])
      .map((attachement) => {
        const attachment = chatAttachments.find(
          (item) => item.id === attachement,
        );
        return attachment;
      })
      .filter((attachment) => !!attachment);
  }, [message, chatAttachments]);
  useEffect(() => {
    if (message?.from_id) {
      handleReplyUser(message?.from_id);
    }
  }, [message?.from_id]);
  useEffect(() => {
    if (replyTo) {
      handleReplyMessage(replyTo);
    }
  }, [replyTo]);
  if (!message) return null;
  return (
    <div className="w-full flex items-center border h-fit p-1 rounded-xl bg-background-secondary">
      {attachments.length === 0 ? null : (
        <AttachmentsPreviews
          attachments={attachments}
          className="shrink-0"
          previewClassName="bg-neutral-200/80 rounded-lg border"
        />
      )}
      <div className="flex flex-col px-2">
        <span className="text-sm font-medium text-foreground/60">
          {user?.username || "Пользователь"}
        </span>
        <span className="text-xs text-secondary line-clamp-1">
          {replyMessageLabel}
        </span>
      </div>
    </div>
  );
};

export default ReplyTo;
