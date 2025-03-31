"use client";
import { ArrowLeftIcon, ArrowRightIcon, PanelLeftIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { useSidebar } from "mono/components/sidebar";
import { motion } from "motion/react";

const ChatSidebarTrigger = () => {
  const { toggleSidebar, open } = useSidebar();
  return (
    <Button
      variant="outline"
      size="icon"
      className="gap-2 rounded-md text-xs"
      onClick={toggleSidebar}
    >
      <PanelLeftIcon size={18} />
    </Button>
  );
};

export default ChatSidebarTrigger;
