"use client";

import { useState } from "react";
import ChatTypeSwitch from "./chat-type-switch";
import NewChatInput from "./new-chat-input";

type NewChatFormProps = {
  defaultChecked?: boolean;
  showLabel?: boolean;
  label?: string;
  limited?: boolean
};
const NewChatForm = ({
  limited = false,
  defaultChecked = false,
  showLabel = false,
  label = "Создать",
}: NewChatFormProps) => {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="space-y-6">
      <ChatTypeSwitch
        checked={checked}
        onCheckedChange={setChecked}
        defaultChecked={defaultChecked}
      />
      <NewChatInput
        disabled={limited}
        type={checked ? "group" : "personal"}
        showLabel={showLabel}
        label={label}
      />
      {
        limited &&
        <span className="text-xs text-muted-foreground">Похоже что вы достигли маскимального количества чатов.</span>
      }
    </div>
  );
};

export default NewChatForm;
