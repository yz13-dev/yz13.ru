"use client";
import AutoTextarea from "@/components/auto-textarea";
import {
  ArrowUpIcon,
  BriefcaseBusinessIcon,
  PaperclipIcon,
} from "lucide-react";
import { Button } from "mono/components/button";
import { useMemo, useState } from "react";
import { useChatApi } from "./chat-provider";

const ChatInput = () => {
  const [value, setValue] = useState<string>("");
  const type = useChatApi((state) => state.type);
  const services = useChatApi((state) => state.services);
  const typeLabel = useMemo(() => {
    return services.find((service) => service.type === type);
  }, [services, type]);
  const disabled = useMemo(() => {
    return !type || !value;
  }, [value, type]);

  return (
    <footer className="flex items-center max-w-xl h-fit p-2 rounded-3xl bg-background-secondary border w-full justify-center absolute bottom-8 left-0 right-0 mx-auto">
      <div className="w-full flex flex-col gap-2">
        <AutoTextarea
          placeholder="Пишите здесь"
          className="font-medium text-base"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full text-secondary size-7"
            >
              <PaperclipIcon size={16} />
            </Button>
            <Button
              variant="ghost"
              className="rounded-full px-2 gap-1.5 h-7 text-secondary"
              disabled={!typeLabel}
            >
              <BriefcaseBusinessIcon size={16} />
              {typeLabel && <span className="text-sm">{typeLabel.name}</span>}
            </Button>
          </div>
          <Button
            size="icon"
            className="rounded-full size-7"
            disabled={disabled}
          >
            <ArrowUpIcon size={16} />
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default ChatInput;
