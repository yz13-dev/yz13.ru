"use client";
import { updateChatMessage } from "@/actions/chats/chats";
import { ChatMessage, ChatTag } from "@/types/chat";
import { cva, VariantProps } from "class-variance-authority";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { HashIcon, XIcon } from "lucide-react";
import { Separator } from "mono/components/separator";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { cn } from "yz13/cn";
import { getMessage } from "../chat-api/chat-api";
import { useChatApi } from "../chat-api/chat-provider";
import MessageCtxMenu from "../message-ctx-menu/message-ctx-menu";

dayjs.extend(customParseFormat);

const bubbleVariants = cva(
  "max-w-md text-sm px-3 py-1.5 rounded-3xl w-fit flex border border-transparent",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background hover:bg-foreground/90",
        outline:
          "border border-border bg-background hover:bg-neutral-200 hover:text-foreground",
        secondary: "bg-neutral-200 text-foreground/70 hover:bg-neutral-200/80",
        ghost: "hover:bg-neutral-200 hover:text-foreground",
        link: "text-foreground underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type ChatBubbleProps = {
  side?: "left" | "right";
  variant?: "default" | "secondary" | "outline" | "ghost" | "link";
  children?: React.ReactNode;
  date?: string;
  isShortMessage?: boolean;
  messageId?: string;
  tags?: ChatTag[];
} & VariantProps<typeof bubbleVariants>;

const BubbleTag = ({
  tag,
  messageId,
}: {
  tag: ChatTag;
  messageId?: string;
}) => {
  const id = tag.id;
  const handleDeleteTag = async () => {
    if (!messageId) return;
    const message = getMessage(messageId);
    if (message) {
      const messageTags = message.tags.filter((tagId) => tagId !== id);
      await updateChatMessage(messageId, {
        tags: messageTags,
      });
    }
  };
  return (
    <span className="px-2 py-0.5 group/tag inline-flex items-center gap-1 text-xs text-secondary cursor-pointer rounded-full border">
      <HashIcon
        size={14}
        className={messageId ? "group-hover/tag:hidden flex" : ""}
      />
      <XIcon
        onClick={handleDeleteTag}
        size={14}
        className={
          messageId
            ? "group-hover/tag:flex hidden hover:text-foreground"
            : "hidden"
        }
      />
      {tag.tag}
    </span>
  );
};

const ChatBubble = ({
  side = "right",
  variant = "secondary",
  messageId,
  date,
  isShortMessage = false,
  tags = [],
  children,
}: ChatBubbleProps) => {
  const [isCtxMenuOpen, setIsCtxMenuOpen] = useState<boolean>(false);
  const bubbleVariant = isCtxMenuOpen ? "outline" : variant;
  return (
    <motion.div
      className="overflow-hidden w-full h-fit"
      exit={{ opacity: 0, height: 0 }}
    >
      <MessageCtxMenu
        message={children as string}
        messageId={messageId}
        onOpenChange={setIsCtxMenuOpen}
        className={cn(
          "w-full gap-1 px-6",
          isShortMessage
            ? side === "left"
              ? "flex flex-row justify-start items-center"
              : "flex flex-row-reverse items-center justify-start"
            : side === "left"
              ? "flex flex-col items-start"
              : "flex flex-col items-end",
        )}
      >
        <span
          className={cn(
            "text-pretty break-words select-none",
            bubbleVariants({ variant: bubbleVariant }),
          )}
        >
          {children}
        </span>
        <div className="flex items-center gap-2">
          {tags.length !== 0 && (
            <div className="w-full flex flex-wrap gap-1 items-start">
              {tags.map((tag) => {
                return (
                  <BubbleTag key={tag.id} tag={tag} messageId={messageId} />
                );
              })}
            </div>
          )}
          {date && (
            <span className="text-xs shrink-0 px-1.5 py-1 select-none text-secondary">
              {date}
            </span>
          )}
        </div>
      </MessageCtxMenu>
    </motion.div>
  );
};

type ChatBubbleGroupProps = {
  date: string;
  children?: React.ReactNode;
};
const ChatBubbleGroup = ({ date, children }: ChatBubbleGroupProps) => {
  const groupDate = dayjs(date, "DD-MM-YYYY")
    .locale("ru")
    .format("dddd, DD MMMM");
  const isToday = dayjs().isSame(dayjs(date, "DD-MM-YYYY"), "day");
  return (
    <div className="space-y-12">
      <div className="flex items-center gap-2 justify-center">
        <Separator className="shrink" />
        <span className="text-sm text-secondary shrink-0 capitalize">
          {isToday ? "Сегодня" : groupDate}
        </span>
        <Separator className="shrink" />
      </div>
      <div className="w-full flex flex-col-reverse gap-3">{children}</div>
    </div>
  );
};

type ChatHistoryProps = {};

const groupChatMessages = (messages: ChatMessage[]) => {
  const groups: Record<string, ChatMessage[]> = {};
  messages.forEach((message) => {
    const date = dayjs(message.created_at).locale("ru").format("DD-MM-YYYY");
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
  });
  return groups;
};

const ChatHistory = ({}: ChatHistoryProps) => {
  const chat = useChatApi((state) => state.chat);
  const chatTags = useMemo(() => (chat ? chat.tags : []) as ChatTag[], [chat]);
  const messages = useChatApi((state) => state.messages);
  const groupedMessages = groupChatMessages(messages);
  const groupKeys = Object.keys(groupedMessages).sort((a, b) => {
    const dateA = dayjs(a, "DD-MM-YYYY");
    const dateB = dayjs(b, "DD-MM-YYYY");
    return dateB.unix() - dateA.unix();
  });

  const [enableAutoScroll, setEnableAutoScroll] = useState<boolean>(true);
  const handleScroll = () => {
    const wrapper = document.getElementById("root");
    // console.log(enableAutoScroll, !!wrapper);
    if (wrapper) {
      console.log("height", wrapper.scrollHeight);
      window.scrollTo({
        top: wrapper.scrollHeight,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    if (enableAutoScroll) handleScroll();
  }, [messages, enableAutoScroll]);
  return (
    <div className="w-full space-y-12 h-full">
      {groupKeys.reverse().map((key) => {
        const messages = groupedMessages[key] ?? [];
        return (
          <ChatBubbleGroup key={key} date={key}>
            <AnimatePresence>
              {messages
                .sort((a, b) => {
                  const dateA = dayjs(a.created_at);
                  const dateB = dayjs(b.created_at);
                  return dateB.unix() - dateA.unix();
                })
                .map((message) => {
                  const messageDate = dayjs(message.created_at).format("HH:mm");
                  const isShortMessage = message.message.length <= 10;
                  const tags = message.tags
                    .map((tagId) => {
                      const tag = chatTags.find((tag) => tag.id === tagId);
                      return tag;
                    })
                    .filter((tag) => !!tag);
                  return (
                    <ChatBubble
                      messageId={message.id}
                      key={`${key}/${message.id}`}
                      side="right"
                      variant="secondary"
                      date={messageDate}
                      isShortMessage={isShortMessage}
                      tags={tags}
                    >
                      {message.message}
                    </ChatBubble>
                  );
                })}
            </AnimatePresence>
          </ChatBubbleGroup>
        );
      })}
    </div>
  );
};

export default ChatHistory;
