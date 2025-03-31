"use client";
import { UserIcon, UsersIcon } from "lucide-react";
import { Label } from "mono/components/label";
import { Switch } from "mono/components/switch";
import { useState } from "react";
import { cn } from "yz13/cn";

type ChatTypeSwitchProps = {
  defaultChecked?: boolean;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};
const ChatTypeSwitch = ({
  defaultChecked = false,
  checked,
  onCheckedChange,
}: ChatTypeSwitchProps) => {
  const [localChecked, setLocalChecked] = useState<boolean>(defaultChecked);
  return (
    <div className="flex group/form items-center gap-2">
      <Label
        htmlFor="group-chat-switch"
        className={cn(
          "peer text-base inline-flex items-center gap-1.5 transition-colors",
          localChecked ? "text-secondary" : "text-foreground",
        )}
      >
        <UserIcon size={16} />
        Личный чат
      </Label>
      <Switch
        id="group-chat-switch"
        className="peer"
        defaultChecked={defaultChecked}
        checked={checked}
        onCheckedChange={(checked) => {
          setLocalChecked(checked);
          if (onCheckedChange) onCheckedChange(checked);
        }}
      />
      <Label
        htmlFor="group-chat-switch"
        className={cn(
          "peer text-base inline-flex items-center gap-1.5 transition-colors",
          localChecked ? "text-foreground" : "text-secondary",
        )}
      >
        <UsersIcon size={16} />
        Групповой чат
      </Label>
    </div>
  );
};

export default ChatTypeSwitch;
