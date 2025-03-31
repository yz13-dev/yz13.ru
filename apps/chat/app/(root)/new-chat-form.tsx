"use client";

import { UserIcon, UsersIcon } from "lucide-react";
import { Label } from "mono/components/label";
import { Switch } from "mono/components/switch";
import { useState } from "react";
import { cn } from "yz13/cn";
import NewChatInput from "./new-chat-input";
import ChatTypeSwitch from "./chat-type-switch";

type NewChatFormProps = {
  defaultChecked?: boolean;
  showLabel?: boolean;
  label?: string;
};
const NewChatForm = ({
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
        type={checked ? "group" : "personal"}
        showLabel={showLabel}
        label={label}
      />
    </div>
  );
};

export default NewChatForm;
