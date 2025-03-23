"use client";

import { Label } from "mono/components/label";
import { Switch } from "mono/components/switch";
import { useState } from "react";
import { cn } from "yz13/cn";
import NewChatInput from "./new-chat-input";

const NewChatForm = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="space-y-6">
      <div className="flex group/form items-center gap-2">
        <Label
          htmlFor="group-chat-switch"
          className={cn(
            "text-base transition-colors",
            checked ? "text-secondary" : "text-foreground",
          )}
        >
          Личный чат
        </Label>
        <Switch
          id="group-chat-switch"
          checked={checked}
          onCheckedChange={setChecked}
        />
        <Label
          htmlFor="group-chat-switch"
          className={cn(
            "text-base transition-colors",
            checked ? "text-foreground" : "text-secondary",
          )}
        >
          Групповой чат
        </Label>
      </div>
      <NewChatInput type={checked ? "group" : "personal"} />
    </div>
  );
};

export default NewChatForm;
