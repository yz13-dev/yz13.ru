"use client";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
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
      {open ? (
        <ArrowLeftIcon size={18} className="shrink-0" />
      ) : (
        <ArrowRightIcon size={18} className="shrink-0" />
      )}
    </motion.button>
  );
};

export default ChatSidebarTrigger;
