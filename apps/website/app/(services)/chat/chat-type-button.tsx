"use client";

import { cn } from "yz13/cn";
import { setChatType } from "./chat-api/chat-api";
import { useChatApi } from "./chat-api/chat-provider";

const ChatTypeButton = ({
  type,
  children,
}: {
  type: string;
  children?: React.ReactNode;
}) => {
  const current = useChatApi((state) => state.type);
  return (
    <button
      onClick={() => setChatType(type)}
      className={cn(
        "px-2.5 py-1 rounded-full text-sm text-secondary cursor-pointer",
        "border transition-colors",
        current === type
          ? "border-foreground text-background bg-foreground hover:bg-foreground/90"
          : "hover:border-foreground/25 hover:text-foreground/60 hover:bg-foreground/10",
      )}
    >
      {children}
    </button>
  );
};
export default ChatTypeButton;
