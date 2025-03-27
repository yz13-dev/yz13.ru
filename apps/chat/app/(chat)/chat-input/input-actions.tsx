"use client";
import { HashIcon, XIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { FileHandler } from "./file-handler";
import useChatInput, { setShowTags } from "./input-store";

type InputActionsProps = {
  chatId?: string;
};
const InputActions = ({ chatId }: InputActionsProps) => {
  const showTags = useChatInput((state) => state.showTags);
  if (!chatId) return null;
  return (
    <div className="flex items-center gap-1">
      <FileHandler watchId="chat-input" />
      <Button
        onClick={() => setShowTags(!showTags)}
        variant="secondary"
        size="sm"
        className="size-7 p-0.5"
      >
        {showTags ? <XIcon size={16} /> : <HashIcon size={16} />}
      </Button>
    </div>
  );
};
export default InputActions;
