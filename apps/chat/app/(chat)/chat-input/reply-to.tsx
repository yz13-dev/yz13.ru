"use client";
import { getChatMessage } from "rest-api/messages";
import { getUserById } from "rest-api/user";
import { ChatMessage } from "rest-api/types/chats";
import { ChatAttachment } from "rest-api/types/attachments";
import { XIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { useEffect, useMemo, useState } from "react";
import { UserObject } from "rest-api/types/user";
import { getMessage } from "../chat-api/chat-api";
import { useChatApi } from "../chat-api/chat-provider";
import { AttachmentsPreviews } from "./attachments-preview-row";
import { setReplyTo } from "./input-store";

const ReplyTo = ({
  chatId,
  replyTo,
  showClose = false,
}: {
  replyTo: string;
  chatId?: string;
  showClose?: boolean;
}) => {
  const [user, setUser] = useState<UserObject | null>(null);
  const [message, setMessage] = useState<ChatMessage | null>(null);
  const handleReplyMessage = async (id: string) => {
    if (!chatId) return;
    const localMessage = getMessage(id);
    if (localMessage) {
      setMessage(localMessage);
    } else {
      const { data: message } = await getChatMessage(chatId, id);
      if (message) setMessage(message);
    }
  };
  const handleReplyUser = async (id: string) => {
    if (!chatId) return;
    const { data: user } = await getUserById(id);
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
    <div className="w-full flex justify-between items-center gap-2 border h-fit p-1 rounded-xl bg-background-secondary">
      <div className="w-fit flex items-center">
        {attachments.length === 0 ? null : (
          <AttachmentsPreviews
            attachments={attachments}
            className="shrink-0"
            previewClassName="bg-neutral-200/80 rounded-lg border"
            lowQuality
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
      {showClose && (
        <Button size="icon" variant="ghost" onClick={() => setReplyTo(null)}>
          <XIcon size={16} />
        </Button>
      )}
    </div>
  );
};

export default ReplyTo;
