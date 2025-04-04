"use client";

import { useMemo } from "react";
import { useChatApi } from "../chat-api/chat-provider";
import { ChatTag } from "rest-api/types/chats";
import { updateChatMessage } from "rest-api/messages";
import { getMessage } from "../chat-api/chat-api";

export const Tag = ({
  tag,
  messageId,
}: {
  tag: ChatTag;
  messageId?: string;
}) => {
  const handleAddTag = async () => {
    if (!messageId) return;
    const message = getMessage(messageId);
    if (message) {
      const isTagExists = message.tags.includes(tag.id);
      if (isTagExists) return;
      const messageTags = [...message.tags, tag.id];
      await updateChatMessage(messageId, {
        tags: messageTags,
      });
    }
  };
  return (
    <span
      onClick={handleAddTag}
      className="px-2 py-0.5 text-xs text-secondary cursor-pointer rounded-full border"
    >
      {tag.tag}
    </span>
  );
};

const Tags = ({ messageId }: { messageId?: string }) => {
  const chat = useChatApi((state) => state.chat);
  const chatTags = useMemo(() => (chat ? chat.tags : []) as ChatTag[], [chat]);
  return chatTags.map((tag) => {
    return <Tag key={tag.id} tag={tag} messageId={messageId} />;
  });
};

export default Tags;
