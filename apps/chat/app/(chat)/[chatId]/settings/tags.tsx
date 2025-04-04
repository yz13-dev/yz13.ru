"use client";
import { XIcon } from "lucide-react";
import { ChatTag } from "rest-api/types/chats";
import { useMemo, useState } from "react";
import { useChatApi } from "../../chat-api/chat-provider";
import { Button } from "mono/components/button";
import { getChatMessages, updateChatMessage } from "rest-api/messages";
import { setChat } from "../../chat-api/chat-api";

const Tags = ({ tagClassName = "" }: { tagClassName?: string }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const chat = useChatApi((state) => state.chat);
  const tags = useMemo(() => (chat ? chat.tags : []) as ChatTag[], [chat]);
  const handleDeleteTag = async (tag: ChatTag) => {
    if (!chat) return;
    setLoading(true);
    try {
      const { data } = await getChatMessages(chat.id, [
        { key: "filter", value: "tag" },
        { key: "tag", value: tag.id },
      ]);
      const filteredTags = tags.filter((t) => t.id !== tag.id);
      setChat({
        ...chat,
        tags: filteredTags,
      });
      const messages = data ?? [];
      if (messages.length === 0) return;
      await Promise.all(
        messages.map((message) => {
          return updateChatMessage(chat.id, {
            tags: message.tags.filter((t) => t !== tag.id),
          });
        }),
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ul className="w-full h-full grid grid-cols-2 gap-2">
      {tags.map((tag) => {
        return (
          <li
            className="w-full flex items-center justify-between gap-2 pl-3 pr-1 py-1 rounded-lg border bg-background/60"
            key={tag.id}
          >
            <span className="text-sm">{tag.tag}</span>
            <Button
              disabled={loading}
              variant="ghost"
              size="icon"
              onClick={() => handleDeleteTag(tag)}
            >
              <XIcon size={16} />
            </Button>
          </li>
        );
      })}
    </ul>
  );
};

export default Tags;
