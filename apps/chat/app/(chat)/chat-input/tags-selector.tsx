"use client";
import { ChatTag } from "@/types/chat";
import { motion } from "motion/react";
import { cn } from "yz13/cn";
import { useChatApi } from "../chat-api/chat-provider";
import useChatInput, { setTags } from "./input-store";

const TagsSelector = () => {
  const tags = useChatApi((state) => state.chat?.tags);
  const selectedTags = useChatInput((state) => state.tags);
  const handleSelectTag = (tagId: number) => {
    if (selectedTags.includes(tagId)) {
      setTags(selectedTags.filter((id) => id !== tagId));
    } else {
      setTags([...selectedTags, tagId]);
    }
  };
  return (
    <motion.div
      id="tags-selector"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="w-full flex items-start gap-1 flex-wrap"
    >
      {((tags ?? []) as ChatTag[]).map((tag) => {
        const selected = selectedTags.includes(tag.id);
        return (
          <span
            onClick={() => handleSelectTag(tag.id)}
            key={tag.id}
            className={cn(
              "px-2 py-0.5 group/tag inline-flex items-center gap-1 text-xs text-secondary cursor-pointer rounded-full border",
              selected
                ? "!border-foreground bg-background-secondary"
                : "bg-background-secondary",
            )}
          >
            {tag.tag}
          </span>
        );
      })}
    </motion.div>
  );
};

export default TagsSelector;
