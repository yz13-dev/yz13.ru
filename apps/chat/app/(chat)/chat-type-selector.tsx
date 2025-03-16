"use client";
import { Skeleton } from "mono/components/skeleton";
import { useChatApi } from "./chat-api/chat-provider";
import ChatTypeButton from "./chat-type-button";

export const ChatTypeSelectorSkeleton = () => {
  return (
    <div className="flex items-start gap-1 flex-wrap">
      {Array.from({ length: 3 }).map((_, i) => (
        <ChatTypeButton key={i} type="chat">
          <Skeleton className="h-5 w-10" />
        </ChatTypeButton>
      ))}
    </div>
  );
};

const ChatTypeSelector = () => {
  const services = useChatApi((state) => state.services);
  return (
    <div className="flex items-start gap-1 flex-wrap">
      {services.map((service) => {
        return (
          <ChatTypeButton key={service.type} type={service.type as string}>
            {service.name}
          </ChatTypeButton>
        );
      })}
    </div>
  );
};

export default ChatTypeSelector;
