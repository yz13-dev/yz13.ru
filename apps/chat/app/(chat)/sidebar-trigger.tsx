"use client";
import { ArrowLeftIcon, ArrowRightIcon, PanelLeftIcon } from "lucide-react";
import { useSidebar } from "mono/components/sidebar";
import { motion } from "motion/react";

const ChatSidebarTrigger = () => {
  const { toggleSidebar, open } = useSidebar();
  return (
    <motion.button
      layoutId="chat-sidebar-trigger"
      className="size-9 flex items-center justify-center "
      onClick={toggleSidebar}
    >
      <PanelLeftIcon size={16} />
    </motion.button>
  );
};

export default ChatSidebarTrigger;
