"use client";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { HashIcon, Loader2Icon, MouseIcon, XIcon } from "lucide-react";
import { Badge } from "mono/components/badge";
import { Button } from "mono/components/button";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { getChatMessages } from "rest-api/messages";
import { ChatAttachment } from "rest-api/types/attachments";
import { ChatMessage, ChatTag } from "rest-api/types/chats";
import { UserObject } from "rest-api/types/user";
import { cn } from "yz13/cn";
import { getChatTags, getMessages, setMessages } from "../chat-api/chat-api";
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
    <Badge
      variant="outline"
      className={cn(
        "px-2 py-0.5 group/tag inline-flex items-center gap-1 text-xs text-foreground cursor-pointer rounded-full border",
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
    </Badge>
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
        <span className="text-sm text-muted-foreground bg-background-secondary/60 backdrop-blur-sm px-2 py-1 rounded-md shrink-0 capitalize">
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
  defaultOffset?: number;
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
  defaultOffset = 30,
  messages: providedMessages,
  user,
}: ChatHistoryProps) => {
  const chat = useChatApi((state) => state.chat);
  const [ready, setReady] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(defaultOffset);
  const [isAll, setIsAll] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const [loading, setLoading] = useState<boolean>(false);

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
  const handleNewMessages = async () => {
    const messages = getMessages();
    if (messages.length < 30) return;
    if (!chat) return;
    if (!inView) return;
    setLoading(true);
    try {
      const newOffset = offset + 30;
      const { data } = await getChatMessages(chat.id, [{ key: "offset", value: newOffset }]);
      const newMessages = data ?? [];
      if (newMessages.length === 0) setIsAll(true);
      else {
        setOffset(newOffset);
        const messages = getMessages();
        setMessages([...messages, ...newMessages]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    setReady(true);
  }, []);
  useEffect(() => {
    if (enableAutoScroll) handleScroll();
  }, [groupedMessages, enableAutoScroll]);
  useEffect(() => {
    if (providedMessages) setMessages(providedMessages);
  }, [providedMessages]);
  useEffect(() => {
    if (inView && ready) handleNewMessages();
  }, [inView, ready]);
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
      {loading && (
        <div className="w-full col-span-full flex items-center gap-2 justify-center">
          <Loader2Icon size={14} className="text-muted-foreground animate-spin" />
          <span className="text-xs text-muted-foreground">Подгружаем сообщения...</span>
        </div>
      )}
      {!isAll && <div ref={ref} className="w-full h-px col-span-full" />}
      {false && (
        <div className="absolute top-0 left-0 w-full h-full flex gap-2 items-center justify-center">
          <Loader2Icon size={16} className="animate-spin text-foreground" />
          <span className="text-center text-sm text-foreground">
            Загрузка сообщений...
          </span>
        </div>
      )}
      {groupKeys.length === 0 && (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-center text-sm text-foreground">
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
              const edited = !!message.edited_at;
              return (
                <ChatBubble
                  key={`${key}/message/${message.id}`}
                  delivered={isDelivered}
                  chatId={message.chat_id}
                  messageId={message.id}
                  edited={edited}
                  side={isMe ? "right" : "left"}
                  variant={isMe ? "secondary" : "outline"}
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
              variant="outline"
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
