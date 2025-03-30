"use client";

import { ChatTag } from "rest-api/types/chats";
import { useMemo } from "react";
import { useChatApi } from "../../chat-api/chat-provider";
import { BubbleTag } from "../chat-history";

const Tags = () => {
  const chat = useChatApi((state) => state.chat);
  const tags = useMemo(() => (chat ? chat.tags : []) as ChatTag[], [chat]);
  return (
    <div className="w-full h-full flex flex-wrap items-start gap-1">
      {tags.map((tag) => {
        return <BubbleTag key={tag.id} tag={tag} />;
      })}
    </div>
  );
};

export default Tags;
