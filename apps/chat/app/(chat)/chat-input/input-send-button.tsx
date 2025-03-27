"use client";
import { uploadAttachments } from "@/actions/chats/attachments";
import {
  createMessageInChat,
  updateChat,
  updateChatMessage,
} from "@/actions/chats/chats";
import { useUser } from "@/hooks/use-user";
import { makeOfflineMessage } from "@/lib/offline-messages";
import { ChatMessage } from "@/types/chat";
import { ArrowUpIcon, Loader2Icon } from "lucide-react";
import { Button } from "mono/components/button";
import { useMemo } from "react";
import { cn } from "yz13/cn";
import {
  getChatAttachments,
  pushMessage,
  replaceMessage,
  setChat,
} from "../chat-api/chat-api";
import useChatInput, {
  getFiles,
  getReplyTo,
  getTags,
  getValue,
  setFiles,
  setLoading,
  setReplyTo,
  setShowTags,
  setTags,
  setValue,
} from "./input-store";

type InputSendButtonProps = {
  chatId?: string;
};

const sendOfflineMessage = async (chatId: string, userId: string) => {
  const value = getValue();
  const tags = getTags();
  const reply_to = getReplyTo();
  const offlineMessage = makeOfflineMessage({
    chat_id: chatId,
    from_id: userId,
    message: value,
    reply_to,
    tags,
  });
  pushMessage(offlineMessage);
  clearInput();
  return offlineMessage;
};
const clearInput = () => {
  setLoading(false);
  setTags([]);
  setValue("");
  setShowTags(false);
  setFiles([]);
  setReplyTo(null);
};
export const sendMessage = async (
  chatId: string,
  userId: string,
): Promise<ChatMessage | null> => {
  const offlineMessage = await sendOfflineMessage(chatId, userId);
  const tags = offlineMessage.tags;
  const reply_to = offlineMessage.reply_to;
  try {
    const newMessage = await createMessageInChat({
      chat_id: chatId,
      from_id: userId,
      message: offlineMessage.message,
      reply_to,
      tags,
    });
    if (newMessage) {
      await uploadMessageAttachments(newMessage);
      replaceMessage(offlineMessage.id, newMessage);
      return newMessage;
    } else return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const uploadMessageAttachments = async (message: ChatMessage) => {
  const files = getFiles();
  if (files.length === 0) return;
  const result = await uploadAttachments(message.chat_id, files);
  const onlySuccessfull = result.filter((file) => file !== null);
  if (onlySuccessfull.length > 0) {
    if (message) {
      const ids = onlySuccessfull.map((file) => file.id);
      await updateChatMessage(message.id, { attachments: ids });
    }
    const currentAttachments = getChatAttachments();
    const attachments = [...currentAttachments, ...onlySuccessfull];
    const updatedChat = await updateChat(message.chat_id, { attachments });
    if (updatedChat) setChat(updatedChat);
  }
};

const InputSendButton = ({ chatId }: InputSendButtonProps) => {
  const [user, userLoading] = useUser();
  const value = useChatInput((state) => state.value);
  const loading = useChatInput((state) => state.loading);
  const files = useChatInput((state) => state.files);
  const disabled = useMemo(() => {
    const cantBeSend = files.length !== 0 ? false : !value;
    return cantBeSend || loading || !user || userLoading;
  }, [value, loading, userLoading, user, files]);
  const handleSend = async () => {
    if (disabled) return;
    if (!user) return;
    if (!chatId) return;
    console.log(chatId, user.id);
    setLoading(true);
    await sendMessage(chatId, user.id);
  };
  return (
    <Button
      onClick={handleSend}
      className={cn(
        "rounded-full min-w-7 gap-1.5 h-7",
        !disabled && value.length ? "px-2" : "p-1",
      )}
      disabled={disabled}
    >
      {!disabled && value.length !== 0 && (
        <span className="pl-1.5">Отправить</span>
      )}
      {loading ? (
        <Loader2Icon size={16} className="animate-spin" />
      ) : (
        <ArrowUpIcon size={16} />
      )}
    </Button>
  );
};
export default InputSendButton;
