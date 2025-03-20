"use client";
import { useEffect, useState } from "react";
import { cn } from "yz13/cn";
import ChatSidebarTrigger from "./chat-sidebar-trigger";

type TopbarProps = {
  className?: string;
  children?: React.ReactNode;
};
const Topbar = ({ className = "", children }: TopbarProps) => {
  const [showSidebarTrigger, setShowSidebarTrigger] = useState<boolean>(false);
  useEffect(() => {
    const handleScroll = (e: Event) => {
      const scrollTop = window.scrollY;
      if (scrollTop > 48) {
        setShowSidebarTrigger(true);
      } else {
        setShowSidebarTrigger(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="top-0 z-20 h-14 bg-background border-b w-full sticky mb-6">
      <div
        className={cn(
          "px-4 py-2 flex items-center md:mx-0 mx-auto gap-2 h-full",
          className,
        )}
      >
        {showSidebarTrigger && <ChatSidebarTrigger />}
        {children}
      </div>
    </div>
  );
};

export default Topbar;
