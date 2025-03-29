"use client";
import { updateChat, updateChatMessage } from "@/actions/chats/chats";
import { randomNumberId } from "@/lib/random-id";
import { ChatTag } from "@/types/chat";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Input } from "mono/components/input";
import { useMemo, useState } from "react";
import { getMessage, setChat } from "../chat-api/chat-api";
import { useChatApi } from "../chat-api/chat-provider";

type TagInputProps = {
  messageId?: string;
};

const Tag = ({ tag, messageId }: { tag: ChatTag; messageId?: string }) => {
  const handleAddTag = async () => {
    if (!messageId) return;
    const message = await getMessage(messageId);
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

const TagInput = ({ messageId }: TagInputProps) => {
  const chat = useChatApi((state) => state.chat);
  const chatTags = useMemo(() => (chat ? chat.tags : []) as ChatTag[], [chat]);
  const [loading, setLoading] = useState<boolean>(false);
  const [tag, setTag] = useState<string>("");
  const alreadyExists = useMemo(() => {
    const lowerCaseTag = tag.toLowerCase();
    if (tag.length === 0) return false;
    else
      return chatTags.some((tag) => {
        const tabName = (tag as { id: number; tag: string }).tag.toLowerCase();
        return tabName === lowerCaseTag;
      });
  }, [chatTags, tag]);
  const handleAddTag = async () => {
    if (alreadyExists) return;
    if (!chat) return;
    setLoading(true);
    try {
      const chatId = chat.id;
      const newTag: ChatTag = {
        id: randomNumberId(10),
        tag,
      };
      const tags = [...(chat.tags as ChatTag[]), newTag] as ChatTag[];
      const updatedChat = await updateChat(chatId, { tags });
      if (updatedChat) {
        setChat(updatedChat);
        if (messageId) {
          const message = await getMessage(messageId);
          if (message) {
            const isTagExists = message.tags.includes(newTag.id);
            if (isTagExists) return;
            const messageTags = [...message.tags, newTag.id];
            await updateChatMessage(messageId, {
              tags: messageTags,
            });
          }
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setTag("");
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Input
          className="h-8 rounded-md text-xs"
          placeholder="Тэг для сообщения"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        {tag.length > 0 && (
          <Button
            onClick={handleAddTag}
            disabled={alreadyExists || loading}
            size="icon"
            variant="ghost"
            className="shrink-0 size-8"
          >
            {loading ? (
              <Loader2Icon size={16} className="animate-spin" />
            ) : (
              <PlusIcon size={16} />
            )}
          </Button>
        )}
      </div>
      {alreadyExists && (
        <span className="text-xs text-secondary">Такой тэг уже существует</span>
      )}
      <div className="w-full flex flex-wrap gap-1 items-start">
        {chatTags.map((tag) => {
          return <Tag key={tag.id} tag={tag} messageId={messageId} />;
        })}
      </div>
    </div>
  );
};

export default TagInput;
