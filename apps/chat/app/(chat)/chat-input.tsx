"use client";
import { createChat, createMessageInChat } from "@/actions/chats/chats";
import AutoTextarea from "@/components/auto-textarea";
import { useUser } from "@/hooks/use-user";
import { ChatRoom, ChatTag } from "@/types/chat";
import {
  ArrowUpIcon,
  HashIcon,
  Loader2Icon,
  PaperclipIcon,
  XIcon,
} from "lucide-react";
import { Button } from "mono/components/button";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { cn } from "yz13/cn";
import { useChatApi } from "./chat-api/chat-provider";

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
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const inputType = chatId ? "reply" : "new";
  const disabled = useMemo(() => {
    return !value || loading || !user || userLoading;
  }, [value, loading, userLoading, user]);
  const router = useRouter();
  const [showTags, setShowTags] = useState<boolean>(false);
  const tags = useChatApi((state) => state.chat?.tags);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const handleSelectTag = (tagId: number) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };
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
      if (newMessage) {
        setSelectedTags([]);
        setValue("");
        setShowTags(false);
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
          "flex items-center h-fit p-2 rounded-3xl bg-background-secondary/60 backdrop-blur-md w-full justify-center",
          "border-1 focus-within:border-foreground ring-4 ring-transparent focus-within:ring-foreground/20",
          className,
        )}
      >
        <div className="w-full flex flex-col gap-2">
          {showTags && (
            <div className="w-full flex items-start gap-1 flex-wrap">
              {((tags ?? []) as ChatTag[]).map((tag) => {
                const selected = selectedTags.includes(tag.id);
                return (
                  <span
                    onClick={() => handleSelectTag(tag.id)}
                    key={tag.id}
                    className={cn(
                      "px-2 py-0.5 group/tag inline-flex items-center gap-1 text-xs text-secondary cursor-pointer rounded-full border",
                      selected
                        ? "!border-foreground bg-background-secondary"
                        : "bg-background-secondary",
                    )}
                  >
                    {tag.tag}
                  </span>
                );
              })}
            </div>
          )}
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
              {chatId && (
                <Button variant="secondary" size="sm" className="size-6 p-0.5">
                  <PaperclipIcon size={14} />
                </Button>
              )}
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
