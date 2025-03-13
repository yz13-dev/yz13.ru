"use client";
import { PanelLeftIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { useSidebar } from "mono/components/sidebar";

const ChatSidebarTrigger = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <Button variant="ghost" size="icon" onClick={toggleSidebar}>
      <PanelLeftIcon size={18} className="shrink-0" />
    </Button>
  );
};

export default ChatSidebarTrigger;
