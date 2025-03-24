"use client";
import { UserPlusIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Separator } from "mono/components/separator";
import { useMemo } from "react";
import { useChatApi } from "../chat-api/chat-provider";
import { ChatParticipants } from "../sidebar/chat-history-nav";

const GroupChatParticipants = () => {
  const chat = useChatApi((state) => state.chat);
  const chatParticipants = useMemo(
    () => (chat ? chat.chat_participants || [] : []),
    [chat],
  );
  const isGroupChat = useMemo(
    () => (chat ? chat.type === "group" : false),
    [chat],
  );
  if (!isGroupChat) return <></>;
  else
    return (
      <div className="flex w-fit items-center h-8 gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="gap-2 h-8 rounded-md text-xs"
        >
          <UserPlusIcon size={14} />
        </Button>
        <Separator orientation="vertical" className="h-7" />
        <ChatParticipants
          uids={chatParticipants}
          avatarClassName="size-9"
          className="h-9"
        />
      </div>
    );
};

export default GroupChatParticipants;
