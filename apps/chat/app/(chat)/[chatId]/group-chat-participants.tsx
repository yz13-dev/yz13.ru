"use client";
import { useMemo } from "react";
import { useChatApi } from "../chat-api/chat-provider";
import { ChatParticipants } from "../sidebar/chat-history-nav";

const GroupChatParticipants = () => {
  const chat = useChatApi((state) => state.chat);
  const chatParticipants = useMemo(
    () => (chat ? chat.chat_participants || [] : []),
    [chat],
  );
  return (
    <div className="flex w-fit items-center h-9 gap-2">
      <ChatParticipants
        uids={chatParticipants}
        avatarClassName="size-9"
        className="h-9"
      />
    </div>
  );
};

export default GroupChatParticipants;
