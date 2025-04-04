"use client";
import { ChatMessage, ChatTag } from "rest-api/types/chats";
import { ChatAttachment } from "rest-api/types/attachments";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { HashIcon, Loader2Icon, MouseIcon, XIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { UserObject } from "rest-api/types/user";
import { cn } from "yz13/cn";
import { getChatTags, setMessages } from "../chat-api/chat-api";
import { useChatApi } from "../chat-api/chat-provider";
import ChatBubble, {
  CopyMessageButton,
  PinMessageButton,
  ReplyMessageButton,
} from "./chat-bubble";

dayjs.extend(customParseFormat);

export const BubbleTag = ({
  tag,
  messageId,
  onClick,
  className = "",
}: {
  className?: string;
  tag: ChatTag;
  onClick?: (messageId: string | null, tagId: number) => void;
  messageId?: string;
}) => {
  return (
    <span
      className={cn(
        "px-2 py-0.5 group/tag inline-flex items-center gap-1 text-xs text-secondary cursor-pointer rounded-full border",
        "bg-background-secondary",
        className,
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
    <div className={cn("space-y-6", className)}>
      <div className="flex sticky top-16 z-10 items-center gap-2 justify-center">
        <span className="text-sm text-secondary bg-background-secondary/60 backdrop-blur-sm px-2 py-1 rounded-md shrink-0 capitalize">
          {isToday ? "Сегодня" : groupDate}
        </span>
      </div>
      <AnimatePresence>
        <div className="w-full flex flex-col-reverse">{children}</div>
      </AnimatePresence>
    </div>
  );
};

type ChatHistoryProps = {
  messages?: ChatMessage[];
  user: UserObject;
};

export const groupChatMessages = (messages: ChatMessage[]) => {
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

const ChatHistory = ({
  messages: providedMessages,
  user,
}: ChatHistoryProps) => {
  const chat = useChatApi((state) => state.chat);
  // const chatTags = useMemo(() => (chat ? chat.tags : []) as ChatTag[], [chat]);
  const chatPinnedMessageId = useMemo(
    () => chat?.["pinned-message"] ?? null,
    [chat],
  );
  const chatAttachments = useMemo(
    () => (chat?.attachments ?? []) as ChatAttachment[],
    [chat],
  );
  const groupedMessages = useChatApi((state) => state.grouped_messages);
  const groupKeys = Object.keys(groupedMessages).sort((a, b) => {
    const dateA = dayjs(a, "DD-MM-YYYY");
    const dateB = dayjs(b, "DD-MM-YYYY");
    return dateB.unix() - dateA.unix();
  });
  const selectedMessages = useChatApi((state) => state.selectedMessages);
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
      // console.log("height", wrapper.scrollHeight);
      window.scrollTo({
        top: wrapper.scrollHeight,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    if (enableAutoScroll) handleScroll();
  }, [groupedMessages, enableAutoScroll]);
  useEffect(() => {
    if (providedMessages) setMessages(providedMessages);
  }, [providedMessages]);
  return (
    <div
      onLoad={() => {
        if (enableAutoScroll) handleScroll();
      }}
      onCanPlay={() => {
        if (enableAutoScroll) handleScroll();
      }}
      onWheel={(e) => {
        if (e.deltaY < 0) handleManualScroll();
      }}
      onTouchMove={handleManualScroll}
      className={cn("w-full *:py-6 h-full")}
    >
      {false && (
        <div className="absolute top-0 left-0 w-full h-full flex gap-2 items-center justify-center">
          <Loader2Icon size={16} className="animate-spin text-secondary" />
          <span className="text-center text-sm text-secondary">
            Загрузка сообщений...
          </span>
        </div>
      )}
      {groupKeys.length === 0 && (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-center text-sm text-secondary">
            Нет сообщений
          </span>
        </div>
      )}
      {groupKeys.reverse().map((key) => {
        const messages = sortMessages(groupedMessages[key] ?? []);
        return (
          <ChatBubbleGroup key={key} date={key}>
            {messages.map((message) => {
              const isShortMessage = message.message.length <= 10;
              const tags = getTags(message.tags);
              const isMe = message.from_id === user?.id;
              const pinned = message.id === chatPinnedMessageId;
              const attachments = (message.attachments ?? [])
                .map((attachement) => {
                  const attachment = chatAttachments.find(
                    (item) => item.id === attachement,
                  );
                  return attachment;
                })
                .filter((attachment) => !!attachment);
              const isDelivered = !!message.delivered_at;
              const messageDate = dayjs(message.created_at).format("HH:mm");
              const selected = !!selectedMessages.find(
                (msg) => msg.id === message.id,
              );
              return (
                <ChatBubble
                  key={`${key}/message/${message.id}`}
                  delivered={isDelivered}
                  chatId={message.chat_id}
                  messageId={message.id}
                  side={isMe ? "right" : "left"}
                  variant={isMe ? "secondary" : "ghost"}
                  date={messageDate}
                  pinned={pinned}
                  selected={selected}
                  replyTo={message.reply_to}
                  isShortMessage={isShortMessage}
                  tags={tags}
                  from_id={user.id}
                  attachments={attachments}
                  messageActions={[
                    <PinMessageButton
                      key={`${key}/message/${message.id}/pin`}
                      messageId={message.id}
                    />,
                    <CopyMessageButton
                      key={`${key}/message/${message.id}/copy`}
                      message={message.message}
                    />,
                    <ReplyMessageButton
                      key={`${key}/message/${message.id}/reply`}
                      messageId={message.id}
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
      <AnimatePresence>
        {!enableAutoScroll && (
          <motion.div
            className="w-full overflow-hidden !p-0 flex z-30 items-center justify-center sticky mx-auto bottom-32"
            exit={{ opacity: 0, height: 0 }}
          >
            <Button
              variant="secondary"
              className="rounded-full gap-1 text-xs"
              size="sm"
              onClick={handleEnableAutoScroll}
            >
              <MouseIcon size={14} />
              Включить автопрокрутку
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatHistory;
