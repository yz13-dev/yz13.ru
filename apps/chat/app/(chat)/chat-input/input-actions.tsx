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
  return (
    <div className="flex items-center gap-1">
      {chatId && (
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setShowTags(!showTags)}
          className="gap-1 has-[svg]:pl-1.5 pl-2 pr-2 h-6"
        >
          {showTags ? <XIcon size={14} /> : <HashIcon size={14} />}
          <span className="text-sm">{showTags ? "Скрыть тэги" : "Тэг"}</span>
        </Button>
      )}
      {chatId && <FileHandler watchId="chat-input" />}
    </div>
  );
};
export default InputActions;
