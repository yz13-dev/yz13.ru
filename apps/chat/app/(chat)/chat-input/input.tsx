"use client";
import AutoTextarea from "@/components/auto-textarea";
import { ChatRoom } from "@/types/chat";
import { AnimatePresence } from "motion/react";
import { useRef } from "react";
import { cn } from "yz13/cn";
import AttachedFiles from "./attached-files";
import InputActions from "./input-actions";
import InputSendButton, { sendMessage } from "./input-send-button";
import useChatInput from "./input-store";
import TagsSelector from "./tags-selector";

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
  const ref = useRef<HTMLElement>(null);
  const value = useChatInput((state) => state.value);
  const setValue = useChatInput((state) => state.setValue);
  const files = useChatInput((state) => state.files);
  const showTags = useChatInput((state) => state.showTags);
  const loading = useChatInput((state) => state.loading);
  return (
    <footer
      ref={ref}
      id="chat-input"
      style={{
        bottom: `${bottomOffset}px`,
      }}
      className={cn(
        "fixed z-10 left-0 right-0 bottom-6 lg:max-w-xl sm:max-w-md max-w-dvw mx-auto px-2 w-full",
        containerClassName,
      )}
    >
      <div
        className={cn(
          "flex items-center h-fit p-2 rounded-3xl bg-background/60 backdrop-blur-md w-full justify-center",
          "border-1 focus-within:border-foreground ring-4 ring-transparent focus-within:ring-foreground/20",
          "hover:border-foreground",
          className,
        )}
      >
        <div className="w-full flex flex-col gap-2">
          <AnimatePresence>
            {files.length !== 0 && <AttachedFiles />}
          </AnimatePresence>
          <AnimatePresence>{showTags && <TagsSelector />}</AnimatePresence>
          <AutoTextarea
            autoFocus
            disabled={loading}
            onKeyDown={(e) => {
              const isSendAction = e.key === "Enter" && !e.ctrlKey;
              const isShiftEnter = e.key === "Enter" && e.shiftKey;
              if (isShiftEnter) {
                setValue(value + "\n");
              }
              if (isSendAction) {
                e.preventDefault();
                if (chatId) sendMessage(chatId);
              }
            }}
            placeholder="Пишите здесь"
            className="font-medium text-base text-foreground/80"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="w-full flex items-center justify-between">
            <InputActions chatId={chatId} />
            <InputSendButton chatId={chatId} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ChatInput;
