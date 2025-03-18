"use client";
import { updateChatMessage } from "@/actions/chats/chats";
import { useUser } from "@/hooks/use-user";
import { ChatMessage, ChatTag } from "@/types/chat";
import { cva, VariantProps } from "class-variance-authority";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { HashIcon, MouseIcon, XIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { cn } from "yz13/cn";
import { getMessage, setMessages } from "../chat-api/chat-api";
import { useChatApi } from "../chat-api/chat-provider";
import MessageCtxMenu from "../message-ctx-menu/message-ctx-menu";

dayjs.extend(customParseFormat);

const bubbleVariants = cva(
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
    <span
      className={cn(
        "px-2 py-0.5 group/tag inline-flex items-center gap-1 text-xs text-secondary cursor-pointer rounded-full border",
        "bg-background-secondary",
      )}
    >
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

const parseText = (text: string) => {
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
    <MessageCtxMenu
      message={children as string}
      messageId={messageId}
      onOpenChange={setIsCtxMenuOpen}
      className={cn(
        "w-full gap-1 px-6 h-fit",
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
        <div className="flex items-center gap-1">
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
      </motion.div>
    </MessageCtxMenu>
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
      <div className="flex sticky top-16 z-10 items-center gap-2 justify-center">
        <span className="text-sm text-secondary bg-background px-2 py-1 rounded-md shrink-0 capitalize">
          {isToday ? "Сегодня" : groupDate}
        </span>
      </div>
      <div className="w-full flex flex-col-reverse gap-3">{children}</div>
    </div>
  );
};

type ChatHistoryProps = {
  messages?: ChatMessage[];
};

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

const ChatHistory = ({ messages: providedMessages }: ChatHistoryProps) => {
  const chat = useChatApi((state) => state.chat);
  const chatTags = useMemo(() => (chat ? chat.tags : []) as ChatTag[], [chat]);
  const messages = useChatApi((state) => state.messages);
  const [user, loading] = useUser();
  const groupedMessages = groupChatMessages(messages);
  const groupKeys = Object.keys(groupedMessages).sort((a, b) => {
    const dateA = dayjs(a, "DD-MM-YYYY");
    const dateB = dayjs(b, "DD-MM-YYYY");
    return dateB.unix() - dateA.unix();
  });

  const [enableAutoScroll, setEnableAutoScroll] = useState<boolean>(true);
  const handleManualScroll = () => {
    if (enableAutoScroll) setEnableAutoScroll(false);
  };
  const handleEnableAutoScroll = () => {
    setEnableAutoScroll(true);
    handleScroll();
  };
  const handleScroll = () => {
    const wrapper = document.getElementById("chat-wrapper");
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
  useEffect(() => {
    if (providedMessages) setMessages(providedMessages);
  }, [providedMessages]);
  return (
    <div
      className={cn("w-full space-y-12 h-full", loading && "opacity-0")}
      onWheel={handleManualScroll}
      onTouchMove={handleManualScroll}
    >
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
                  const isMe = message.from_id === user?.id;
                  return (
                    <ChatBubble
                      messageId={message.id}
                      key={`${key}/${message.id}`}
                      side={isMe ? "right" : "left"}
                      variant={isMe ? "secondary" : "ghost"}
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
      {!enableAutoScroll && (
        <div className="w-full flex z-30 items-center justify-center sticky mx-auto bottom-32">
          <Button
            variant="secondary"
            className="rounded-full gap-1 text-xs"
            size="sm"
            onClick={handleEnableAutoScroll}
          >
            <MouseIcon size={14} />
            Включить автопрокрутку
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChatHistory;
