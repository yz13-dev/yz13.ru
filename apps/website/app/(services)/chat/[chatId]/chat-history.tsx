"use client";
import { ChatMessage } from "@/types/chat";
import { cva, VariantProps } from "class-variance-authority";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { cn } from "yz13/cn";
import { useChatApi } from "../chat-api/chat-provider";
dayjs.extend(customParseFormat);

const bubbleVariants = cva(
  "max-w-md text-sm px-3 py-1.5 rounded-3xl w-fit flex",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background hover:bg-foreground/90",
        outline:
          "border bg-background hover:bg-neutral-200 hover:text-foreground",
        secondary: "bg-neutral-200 text-foreground/70 hover:bg-neutral-200/80",
        ghost: "hover:bg-neutral-200 hover:text-foreground",
        link: "text-foreground underline-offset-4 hover:underline",
      },
      side: {
        left: "text-end",
        right: "text-start",
      },
    },
    defaultVariants: {
      variant: "default",
      side: "left",
    },
  },
);

type ChatBubbleProps = {
  side?: "left" | "right";
  variant?: "default" | "secondary" | "outline" | "ghost" | "link";
  children?: React.ReactNode;
  date?: string;
} & VariantProps<typeof bubbleVariants>;

const ChatBubble = ({
  side = "right",
  variant = "default",
  date,
  children,
}: ChatBubbleProps) => {
  return (
    <div
      className={cn(
        "w-full flex flex-col px-6",
        side === "left" ? "items-start" : "items-end",
      )}
    >
      <span className={cn(bubbleVariants({ side, variant }))}>{children}</span>
      {date && (
        <span className="text-xs px-1.5 py-1 text-secondary">{date}</span>
      )}
    </div>
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
  return (
    <div className="space-y-3 py-6">
      <div className="flex items-center justify-center">
        <span className="text-sm text-secondary capitalize">{groupDate}</span>
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
  const messages = useChatApi((state) => state.messages);
  const groupedMessages = groupChatMessages(messages);
  const groupKeys = Object.keys(groupedMessages);
  return (
    <div className="w-full flex flex-col-reverse h-full">
      {groupKeys.map((key) => {
        const messages = groupedMessages[key] ?? [];
        return (
          <ChatBubbleGroup key={key} date={key}>
            {messages
              .sort((a, b) => {
                const dateA = dayjs(a.created_at);
                const dateB = dayjs(b.created_at);
                return dateB.unix() - dateA.unix();
              })
              .map((message) => {
                const messageDate = dayjs(message.created_at).format("HH:mm");
                return (
                  <ChatBubble
                    key={`${key}/${message.id}`}
                    side="right"
                    variant="secondary"
                    date={messageDate}
                  >
                    {message.message}
                  </ChatBubble>
                );
              })}
          </ChatBubbleGroup>
        );
      })}
    </div>
  );
};

export default ChatHistory;
