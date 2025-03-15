"use client";
import { Input } from "mono/components/input";
import { useMemo } from "react";
import { useChatApi } from "../chat-api/chat-provider";

type TagInputProps = {};
const TagInput = () => {
  const chat = useChatApi((state) => state.chat);
  const chatTags = useMemo(() => (chat ? chat.tags : []), [chat]);
  const chatId = useMemo(() => (chat ? chat.id : null), [chat]);
  return (
    <div>
      <Input
        className="h-8 rounded-md text-xs"
        placeholder="Тэг для сообщения"
      />
    </div>
  );
};

export default TagInput;
