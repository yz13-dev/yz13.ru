"use client";
import { createChat, createMessageInChat } from "@/actions/chats/chats";
import AutoTextarea from "@/components/auto-textarea";
import { useUser } from "@/hooks/use-user";
import { ChatRoom } from "@/types/chat";
import { ArrowUpIcon, Loader2Icon } from "lucide-react";
import { Button } from "mono/components/button";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { cn } from "yz13/cn";

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
  const handleSend = async () => {
    if (disabled) return;
    if (!user) return;
    setLoading(true);
    console.log("send", value);
    if (inputType === "new") {
      console.log("need to create new chat");
      const newChat = await createChat({
        from_id: user.id,
        type,
        chat_participants: [user.id],
      });
      if (newChat) {
        router.prefetch(`/${newChat.id}`);
        const newMessage = await createMessageInChat({
          chat_id: newChat.id,
          from_id: user.id,
          message: value,
        });
        if (newMessage) {
          router.push(`/${newChat.id}`);
          setValue("");
        }
      }
      console.log("new chat", newChat);
    } else {
      console.log("need to reply to chat");
      const newMessage = await createMessageInChat({
        chat_id: chatId,
        from_id: user.id,
        message: value,
      });
      if (newMessage) {
        setValue("");
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
        "fixed z-10 left-0 right-0 bottom-6 max-w-xl mx-auto px-2 w-full",
        containerClassName,
      )}
    >
      <div
        className={cn(
          "flex items-center h-fit p-2 rounded-3xl bg-background-secondary/60 backdrop-blur-md border w-full justify-center",
          className,
        )}
      >
        <div className="w-full flex flex-col gap-2">
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
            placeholder="Пишите здесь"
            className="font-medium text-base text-foreground/80"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-1"></div>
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
