"use client";
import { createChat, createMessageInChat } from "@/actions/chats/chats";
import AutoTextarea from "@/components/auto-textarea";
import { useUser } from "@/lib/use-auth";
import {
  ArrowUpIcon,
  BriefcaseBusinessIcon,
  Loader2Icon,
  PaperclipIcon,
} from "lucide-react";
import { Button } from "mono/components/button";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { cn } from "yz13/cn";
import { useChatApi } from "./chat-api/chat-provider";

type ChatInputProps = {
  className?: string;
  bottomOffset?: number;
  chatId?: string;
};

const ChatInput = ({
  chatId,
  className = "",
  bottomOffset = 8,
}: ChatInputProps) => {
  const [user, userLoading] = useUser();
  const ref = useRef<HTMLElement>(null);
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const type = useChatApi((state) => state.type);
  const services = useChatApi((state) => state.services);
  const inputType = chatId ? "reply" : "new";
  const typeLabel = useMemo(() => {
    return services.find((service) => service.type === type);
  }, [services, type]);
  const disabled = useMemo(() => {
    return !type || !value || loading || !user || userLoading;
  }, [value, type, loading, userLoading, user]);
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
        service_type: type,
      });
      if (newChat) {
        const newMessage = await createMessageInChat({
          chat_id: newChat.id,
          from_id: user.id,
          message: value,
        });
        if (newMessage) {
          router.push(`/chat/${newChat.id}`);
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
      className="sticky z-10 left-0 right-0 max-w-xl mx-auto px-2 w-full"
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
            <div className="flex items-center gap-1">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full text-secondary size-7"
              >
                <PaperclipIcon size={16} />
              </Button>
              <Button
                variant="ghost"
                className="rounded-full px-2 gap-1.5 h-7 text-secondary"
                disabled={!typeLabel}
              >
                <BriefcaseBusinessIcon size={16} />
                {typeLabel && <span className="text-sm">{typeLabel.name}</span>}
              </Button>
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
