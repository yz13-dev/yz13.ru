"use client";
import { updateChat, updateChatMessage } from "rest-api/chats";
import { cdn } from "@/lib/cdn";
import { ChatMessage, ChatTag } from "rest-api/types/chats";
import { ChatAttachment } from "rest-api/types/attachments";
import { cva, VariantProps } from "class-variance-authority";
import {
  CheckIcon,
  ClockIcon,
  CopyIcon,
  Loader2Icon,
  PinIcon,
  PinOffIcon,
  ReplyIcon,
  XIcon,
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "yz13/cn";
import {
  addSelectedMessage,
  getMessage,
  removeSelectedMessage,
  setAttachmentPreview,
  setChat,
} from "../chat-api/chat-api";
import { useChatApi } from "../chat-api/chat-provider";
import useChatInput, { setReplyTo } from "../chat-input/input-store";
import ReplyTo from "../chat-input/reply-to";
import MessageCtxMenu from "../message-ctx-menu/message-ctx-menu";
import { BubbleTag } from "./chat-history";
import { Checkbox } from "mono/components/checkbox";

export const bubbleVariants = cva(
  "max-w-md text-sm transition-colors rounded-3xl w-fit border border-transparent",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background hover:bg-foreground/90",
        outline:
          "border border-border bg-background hover:bg-neutral-200 hover:text-foreground",
        secondary: "bg-neutral-200 text-foreground/70 hover:bg-neutral-200/80",
        ghost: "text-foreground/70 hover:text-foreground/90",
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
  from_id: string;
  isShortMessage?: boolean;
  delivered?: boolean;
  messageId?: string;
  selected?: boolean;
  tags?: ChatTag[];
  chatId: string;
  pinned?: boolean;
  replyTo?: ChatMessage["reply_to"];
  messageActions?: React.ReactNode;
  attachments?: ChatAttachment[];
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

type PreviewProps = {
  attachment: ChatAttachment;
  onClick?: (attachment: ChatAttachment) => void;
};
export const ImagePreview = ({ onClick, attachment }: PreviewProps) => {
  const url = cdn(`/chats/${attachment.path}`);
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <div
      onClick={() => onClick && onClick(attachment)}
      className="w-full relative min-w-[200px] min-h-[100px]"
    >
      {loading && (
        <div className="w-full h-full absolute top-0 left-0 rounded-xl bg-neutral-200" />
      )}
      <Image
        onLoadedMetadata={(metadata) => {
          console.log(metadata);
        }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 75vw"
        src={url}
        fill
        onLoad={() => setLoading(false)}
        className={cn("!static block rounded-xl", loading && "opacity-0")}
        alt={attachment.name}
      />
    </div>
  );
};

export const VideoPreview = ({ attachment, onClick }: PreviewProps) => {
  const url = cdn(`/chats/${attachment.path}`);
  const ref = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [playing, setPlaying] = useState<boolean>(false);
  const isInView = useInView(ref);
  useEffect(() => {
    const video = ref.current;
    if (isInView) {
      if (video) video.play().catch(() => setPlaying(false));
    } else {
      if (video) video.pause();
    }
  }, [isInView]);
  return (
    <div
      onClick={() => onClick && onClick(attachment)}
      className="w-full relative min-w-[200px] min-h-[100px]"
    >
      {loading && (
        <div className="w-full h-full absolute top-0 left-0 rounded-xl bg-neutral-200" />
      )}
      <video
        ref={ref}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        autoPlay
        loop
        muted
        controls={false}
        playsInline
        src={url}
        onCanPlay={() => setLoading(false)}
        onLoad={() => setLoading(false)}
        className={cn("!static block rounded-xl", loading && "opacity-0")}
      />
    </div>
  );
};

const AttachmentsPreviews = ({
  attachments,
  withNoText = false,
}: {
  withNoText?: boolean;
  attachments: ChatAttachment[];
}) => {
  return (
    <div className={cn("w-full", withNoText ? "p-1.5" : " pt-1.5 px-1.5")}>
      <AnimatePresence>
        {attachments.map((attachment) => {
          if (attachment.type.startsWith("image")) {
            return (
              <ImagePreview
                key={attachment.id}
                onClick={(attachment) => setAttachmentPreview(attachment)}
                attachment={attachment}
              />
            );
          }
          if (attachment.type.startsWith("video")) {
            return (
              <VideoPreview
                key={attachment.id}
                onClick={(attachment) => setAttachmentPreview(attachment)}
                attachment={attachment}
              />
            );
          }
          return null;
        })}
      </AnimatePresence>
    </div>
  );
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
  from_id,
  chatId,
  delivered = false,
  selected = false,
  replyTo,
  children,
  attachments = [],
}: ChatBubbleProps) => {
  const [isCtxMenuOpen, setIsCtxMenuOpen] = useState<boolean>(false);
  const bubbleVariant = isCtxMenuOpen ? "outline" : variant;
  const showAsShortMessage = attachments.length !== 0 ? false : isShortMessage;
  return (
    <MessageCtxMenu
      message={children as string}
      messageId={messageId}
      from_id={from_id}
      selected={selected}
      onOpenChange={setIsCtxMenuOpen}
      className={cn(
        "w-full gap-1 group/bubble h-fit",
        "md:pl-6 md:pr-6 pl-4 pr-2 py-3",
        selected && "bg-neutral-200 first:rounded-b-lg last:rounded-t-lg",
        showAsShortMessage
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
        <div
          className={cn(
            "w-full h-fit flex flex-col",
            bubbleVariants({ variant: bubbleVariant }),
          )}
        >
          {replyTo && (
            <div className="px-1.5 pt-1.5">
              <ReplyTo replyTo={replyTo} chatId={chatId} />
            </div>
          )}
          {attachments.length !== 0 && (
            <AttachmentsPreviews
              attachments={attachments}
              withNoText={!children}
            />
          )}
          {children && (
            <span
              className={cn(
                "w-full shrink-0 *:select-none block overflow-clip text-content *:inline",
                "whitespace-pre-wrap break-words relative px-3 py-1.5",
              )}
            >
              {parseText(children as string)}
            </span>
          )}
        </div>
        <div
          className={cn(
            "flex w-full items-center justify-between gap-2",
            side === "left" ? "flex-row-reverse" : "flex-row",
          )}
        >
          <div className="flex items-center gap-1">
            <Checkbox
              checked={selected}
              onClick={() => {
                if (!messageId) return;
                if (selected) removeSelectedMessage(messageId);
                else addSelectedMessage({ id: messageId, from_id });
              }}
              className={cn(
                !selected
                  ? "group-hover/bubble:opacity-100 opacity-0"
                  : "opacity-100",
                "",
              )}
            />
          </div>
          <div
            className={cn(
              "flex items-center gap-2",
              side === "left" ? "flex-row-reverse" : "flex-row",
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
                {delivered ? (
                  <CheckIcon size={14} className="text-secondary" />
                ) : (
                  <ClockIcon size={14} className="text-secondary" />
                )}
              </div>
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
        <PinOffIcon size={14} />
      ) : (
        <PinIcon size={14} />
      )}
    </button>
  );
};
export { PinMessageButton };
const ReplyMessageButton = ({ messageId }: { messageId: string }) => {
  const replyTo = useChatInput((state) => state.reply_to);
  const isSelected = useMemo(() => replyTo === messageId, [replyTo, messageId]);
  const handleReply = async () => {
    if (!messageId) return;
    if (isSelected) return setReplyTo(null);
    else setReplyTo(messageId);
  };
  return (
    <button
      className="text-secondary size-6 flex items-center justify-center"
      onClick={handleReply}
    >
      {isSelected ? <XIcon size={14} /> : <ReplyIcon size={14} />}
    </button>
  );
};
export { ReplyMessageButton };

export default ChatBubble;
