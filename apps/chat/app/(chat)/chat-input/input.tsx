"use client";
import { uploadAttachments } from "@/actions/chats/attachments";
import {
  createChat,
  createMessageInChat,
  updateChat,
  updateChatMessage,
} from "@/actions/chats/chats";
import AutoTextarea from "@/components/auto-textarea";
import { useUser } from "@/hooks/use-user";
import { ChatRoom } from "@/types/chat";
import { ArrowUpIcon, HashIcon, Loader2Icon, XIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { cn } from "yz13/cn";
import { getChatAttachments, setChat } from "../chat-api/chat-api";
import AttachedFiles from "./attached-files";
import { FileHandler } from "./file-handler";
import useChatInput, { setFiles, setTags } from "./input-store";
import TagsSelector from "./tags-selector";

type ChatInputProps = {
  containerClassName?: string;
  className?: string;
  bottomOffset?: number;
  chatId?: string;
  type?: ChatRoom["type"];
};

const ChatInput = ({
  chatId,
  containerClassName = "",
  className = "",
  type = "personal",
  bottomOffset = 8,
}: ChatInputProps) => {
  const [user, userLoading] = useUser();
  const ref = useRef<HTMLElement>(null);
  const value = useChatInput((state) => state.value);
  const setValue = useChatInput((state) => state.setValue);
  const [loading, setLoading] = useState<boolean>(false);
  const inputType = chatId ? "reply" : "new";
  const files = useChatInput((state) => state.files);
  const disabled = useMemo(() => {
    const cantBeSend = files.length !== 0 ? false : !value;
    return cantBeSend || loading || !user || userLoading;
  }, [value, loading, userLoading, user, files]);
  const router = useRouter();
  const [showTags, setShowTags] = useState<boolean>(false);
  const selectedTags = useChatInput((state) => state.tags);
  const handleSend = async () => {
    if (disabled) return;
    if (!user) return;
    setLoading(true);
    if (inputType === "new") {
      console.log("need to create new chat");
      const newChat = await createChat({
        from_id: user.id,
        name: value,
        type,
        chat_participants: [user.id],
      });
      if (newChat) {
        router.prefetch(`/${newChat.id}`);
        router.push(`/${newChat.id}`);
        setValue("");
      }
      console.log("new chat", newChat);
    } else {
      const newMessage = await createMessageInChat({
        chat_id: chatId,
        from_id: user.id,
        message: value,
        tags: selectedTags,
      });
      if (files.length > 0 && chatId) {
        const result = await uploadAttachments(chatId, files);
        const onlySuccessfull = result.filter((file) => file !== null);
        if (onlySuccessfull.length > 0) {
          if (newMessage) {
            const ids = onlySuccessfull.map((file) => file.id);
            await updateChatMessage(newMessage.id, { attachments: ids });
          }
          const currentAttachments = getChatAttachments();
          const attachments = [...currentAttachments, ...onlySuccessfull];
          const updatedChat = await updateChat(chatId, { attachments });
          if (updatedChat) setChat(updatedChat);
        }
        console.log("result", result);
      }
      if (newMessage) {
        setTags([]);
        setValue("");
        setShowTags(false);
        setFiles([]);
      }
    }
    setLoading(false);
  };
  return (
    <footer
      ref={ref}
      id="chat-input"
      style={{
        bottom: `${bottomOffset}px`,
      }}
      className={cn(
        "fixed z-10 left-0 right-0 bottom-6 lg:max-w-xl sm:max-w-md max-w-dvw mx-auto px-2 w-full",
        containerClassName,
      )}
    >
      <div
        className={cn(
          "flex items-center h-fit p-2 rounded-3xl bg-background/60 backdrop-blur-md w-full justify-center",
          "border-1 focus-within:border-foreground ring-4 ring-transparent focus-within:ring-foreground/20",
          "hover:border-foreground",
          className,
        )}
      >
        <div className="w-full flex flex-col gap-2">
          <AnimatePresence>
            {files.length !== 0 && <AttachedFiles />}
          </AnimatePresence>
          <AnimatePresence>{showTags && <TagsSelector />}</AnimatePresence>
          <AutoTextarea
            onKeyDown={(e) => {
              const isSendAction = e.key === "Enter" && !e.ctrlKey;
              const isShiftEnter = e.key === "Enter" && e.shiftKey;
              if (isShiftEnter) {
                setValue(value + "\n");
              }
              if (isSendAction) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={
              inputType === "new" ? "Напишите название чата" : "Пишите здесь"
            }
            className="font-medium text-base text-foreground/80"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-1">
              {chatId && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowTags(!showTags)}
                  className="gap-1 px-2 h-6"
                >
                  {showTags ? <XIcon size={14} /> : <HashIcon size={14} />}
                  <span className="text-sm">
                    {showTags ? "Скрыть тэги" : "Тэг"}
                  </span>
                </Button>
              )}
              {chatId && <FileHandler watchId="chat-input" />}
            </div>
            <Button
              onClick={handleSend}
              size="icon"
              className="rounded-full size-7"
              disabled={disabled}
            >
              {loading ? (
                <Loader2Icon size={16} className="animate-spin" />
              ) : (
                <ArrowUpIcon size={16} />
              )}
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ChatInput;
