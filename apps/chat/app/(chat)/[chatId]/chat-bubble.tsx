"use client";
import { updateChat, updateChatMessage } from "@/actions/chats/chats";
import { ChatTag } from "@/types/chat";
import { cva, VariantProps } from "class-variance-authority";
import { CheckIcon, CopyIcon, Loader2Icon, PinIcon } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { cn } from "yz13/cn";
import { getMessage, setChat } from "../chat-api/chat-api";
import { useChatApi } from "../chat-api/chat-provider";
import MessageCtxMenu from "../message-ctx-menu/message-ctx-menu";
import { BubbleTag } from "./chat-history";

export const bubbleVariants = cva(
  "max-w-md text-sm px-3 transition-colors py-1.5 rounded-3xl w-fit border border-transparent",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background hover:bg-foreground/90",
        outline:
          "border border-border bg-background hover:bg-neutral-200 hover:text-foreground",
        secondary: "bg-neutral-200 text-foreground/70 hover:bg-neutral-200/80",
        ghost:
          "hover:bg-neutral-50 text-foreground/70 hover:text-foreground/90",
        link: "text-foreground underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export const parseText = (text: string) => {
  const parts = text.split(/(".*?")/g); // Разделяем текст по кавычкам, включая кавычки

  return parts.map((part, index) => {
    if (part.startsWith('"') && part.endsWith('"')) {
      return (
        <code
          key={index}
          className="px-1.5 rounded-sm whitespace-pre-wrap py-0.5 bg-neutral-300"
        >
          {part.replaceAll(/"/g, "")}
        </code>
      );
    } else return part;
  });
};

export type ChatBubbleProps = {
  side?: "left" | "right";
  variant?: "default" | "secondary" | "outline" | "ghost" | "link";
  children?: React.ReactNode;
  date?: string;
  isShortMessage?: boolean;
  messageId?: string;
  tags?: ChatTag[];
  pinned?: boolean;
  messageActions?: React.ReactNode;
} & VariantProps<typeof bubbleVariants>;

const handleDeleteTag = async (messageId: string | null, tagId: number) => {
  if (!messageId) return;
  const id = tagId;
  const message = getMessage(messageId);
  if (message) {
    const messageTags = message.tags.filter((tagId) => tagId !== id);
    await updateChatMessage(messageId, {
      tags: messageTags,
    });
  }
};

const ChatBubble = ({
  side = "right",
  variant = "secondary",
  messageId,
  date,
  isShortMessage = false,
  pinned = false,
  tags = [],
  messageActions,
  children,
}: ChatBubbleProps) => {
  const [isCtxMenuOpen, setIsCtxMenuOpen] = useState<boolean>(false);
  const bubbleVariant = isCtxMenuOpen ? "outline" : variant;
  return (
    <MessageCtxMenu
      message={children as string}
      messageId={messageId}
      onOpenChange={setIsCtxMenuOpen}
      className={cn(
        "w-full gap-1 group/bubble md:px-6 px-2 h-fit",
        isShortMessage
          ? side === "left"
            ? "flex flex-row justify-start items-center"
            : "flex flex-row-reverse items-center justify-start"
          : side === "left"
            ? "flex flex-col items-start"
            : "flex flex-col items-end",
      )}
    >
      <motion.div
        className="overflow-hidden w-full h-fit"
        exit={{ opacity: 0, height: 0 }}
      >
        <span
          className={cn(
            "w-full *:select-none inline-block overflow-clip text-content *:inline",
            "whitespace-pre-wrap break-words relative",
            bubbleVariants({ variant: bubbleVariant }),
          )}
        >
          {parseText(children as string)}
        </span>
        <div
          className={cn(
            "flex w-full items-center gap-2",
            side === "left"
              ? "justify-end flex-row-reverse"
              : "justify-end flex-row",
          )}
        >
          <div
            className={cn(
              "flex items-center gap-1 group-hover/bubble:opacity-100 opacity-0",
              side === "left" ? "flex-row" : "flex-row-reverse",
            )}
          >
            {messageActions}
          </div>
          <div className="flex items-center gap-1">
            {tags.length !== 0 && (
              <div className="w-full flex flex-wrap gap-1 items-start">
                {tags.map((tag) => {
                  return (
                    <BubbleTag
                      key={tag.id}
                      tag={tag}
                      messageId={messageId}
                      onClick={handleDeleteTag}
                    />
                  );
                })}
              </div>
            )}
            <div className="flex items-center gap-1">
              {pinned && <PinIcon size={14} className="text-secondary" />}
              {date && (
                <span className="text-xs shrink-0 px-1.5 py-1 select-none text-secondary">
                  {date}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </MessageCtxMenu>
  );
};

const CopyMessageButton = ({ message }: { message: string }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const handleCopyText = async () => {
    if (!message) return;
    await navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  return (
    <button
      className="text-secondary size-6 flex items-center justify-center"
      onClick={handleCopyText}
    >
      {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
    </button>
  );
};
export { CopyMessageButton };
const PinMessageButton = ({ messageId }: { messageId: string }) => {
  const chat = useChatApi((state) => state.chat);
  const [loading, setLoading] = useState<boolean>(false);
  const pinnedMessageId = useMemo(
    () => chat?.["pinned-message"] ?? null,
    [chat],
  );
  const pinned = useMemo(
    () => pinnedMessageId === messageId,
    [pinnedMessageId, messageId],
  );
  const handlePinMessage = async () => {
    if (!messageId) return;
    if (chat) {
      setLoading(true);
      try {
        const updatedChat = await updateChat(chat.id, {
          "pinned-message": pinned ? null : messageId,
        });
        if (updatedChat) setChat(updatedChat);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <button
      className="text-secondary size-6 flex items-center justify-center"
      onClick={handlePinMessage}
    >
      {loading ? (
        <Loader2Icon size={14} className="animate-spin" />
      ) : pinned ? (
        <CheckIcon size={14} />
      ) : (
        <PinIcon size={14} />
      )}
    </button>
  );
};
export { PinMessageButton };

export default ChatBubble;
