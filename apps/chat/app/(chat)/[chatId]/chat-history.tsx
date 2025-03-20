"use client";
import { useUser } from "@/hooks/use-user";
import { ChatMessage, ChatTag } from "@/types/chat";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { HashIcon, Loader2Icon, MouseIcon, XIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { AnimatePresence } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { cn } from "yz13/cn";
import { getChatTags, setMessages } from "../chat-api/chat-api";
import { useChatApi } from "../chat-api/chat-provider";
import ChatBubble, { CopyMessageButton, PinMessageButton } from "./chat-bubble";

dayjs.extend(customParseFormat);

export const BubbleTag = ({
  tag,
  messageId,
  onClick,
}: {
  tag: ChatTag;
  onClick?: (messageId: string | null, tagId: number) => void;
  messageId?: string;
}) => {
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
        onClick={() => {
          if (onClick) onClick(messageId ?? null, tag.id);
        }}
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

type ChatBubbleGroupProps = {
  date: string;
  children?: React.ReactNode;
  className?: string;
};
const ChatBubbleGroup = ({
  date,
  children,
  className = "",
}: ChatBubbleGroupProps) => {
  const groupDate = dayjs(date, "DD-MM-YYYY")
    .locale("ru")
    .format("dddd, DD MMMM");
  const isToday = dayjs().isSame(dayjs(date, "DD-MM-YYYY"), "day");
  return (
    <div className={cn("space-y-12", className)}>
      <div className="flex sticky top-32 z-10 items-center gap-2 justify-center">
        <span className="text-sm text-secondary bg-background-secondary/60 backdrop-blur-sm px-2 py-1 rounded-md shrink-0 capitalize">
          {isToday ? "Сегодня" : groupDate}
        </span>
      </div>
      <div className="w-full flex flex-col-reverse gap-3">
        <AnimatePresence>{children}</AnimatePresence>
      </div>
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

const getTags = (messageTags: number[]) => {
  const chatTags = getChatTags();
  return messageTags
    .map((tagId) => {
      const tag = chatTags.find((tag) => tag.id === tagId);
      return tag;
    })
    .filter((tag) => !!tag);
};

const sortMessages = (messages: ChatMessage[]) => {
  return messages.sort((a, b) => {
    const dateA = dayjs(a.created_at);
    const dateB = dayjs(b.created_at);
    return dateB.unix() - dateA.unix();
  });
};

const ChatHistory = ({ messages: providedMessages }: ChatHistoryProps) => {
  const chat = useChatApi((state) => state.chat);
  // const chatTags = useMemo(() => (chat ? chat.tags : []) as ChatTag[], [chat]);
  const chatPinnedMessageId = useMemo(
    () => chat?.["pinned-message"] ?? null,
    [chat],
  );
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
      className={cn("w-full space-y-12 h-full")}
      onWheel={(e) => {
        if (e.deltaY < 0) handleManualScroll();
      }}
      onTouchMove={handleManualScroll}
    >
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full flex gap-2 items-center justify-center">
          <Loader2Icon size={16} className="animate-spin text-secondary" />
          <span className="text-center text-sm text-secondary">
            Загрузка сообщений...
          </span>
        </div>
      )}
      {!loading && messages.length === 0 && (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-center text-sm text-secondary">
            Нет сообщений
          </span>
        </div>
      )}
      {groupKeys.reverse().map((key) => {
        const messages = sortMessages(groupedMessages[key] ?? []);
        return (
          <ChatBubbleGroup
            key={key}
            date={key}
            className={loading ? "opacity-0" : ""}
          >
            {messages.map((message) => {
              const messageDate = dayjs(message.created_at).format("HH:mm");
              const isShortMessage = message.message.length <= 10;
              const tags = getTags(message.tags);
              const isMe = message.from_id === user?.id;
              const pinned = message.id === chatPinnedMessageId;
              return (
                <ChatBubble
                  key={`${key}/message/${message.id}`}
                  messageId={message.id}
                  side={isMe ? "right" : "left"}
                  variant={isMe ? "secondary" : "ghost"}
                  date={messageDate}
                  pinned={pinned}
                  isShortMessage={isShortMessage}
                  tags={tags}
                  messageActions={[
                    <PinMessageButton
                      key={`${key}/message/${message.id}/pin`}
                      messageId={message.id}
                    />,
                    <CopyMessageButton
                      key={`${key}/message/${message.id}/copy`}
                      message={message.message}
                    />,
                  ]}
                >
                  {message.message}
                </ChatBubble>
              );
            })}
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
