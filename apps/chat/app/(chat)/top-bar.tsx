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
  const handleScroll = (e: Event) => {
    const scrollTop = window.scrollY;
    if (scrollTop >= 48) {
      setShowSidebarTrigger(true);
    } else {
      setShowSidebarTrigger(false);
    }
  };
  const handleInitialScroll = () => {
    if (typeof window !== "undefined") {
      const scrollTop = window.scrollY;
      if (scrollTop >= 48) {
        setShowSidebarTrigger(true);
      }
    }
  };
  useEffect(() => {
    handleInitialScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="top-0 z-20 h-12 shrink-0 bg-background border-b w-full sticky">
      <div
        className={cn(
          "px-4 py-1 flex items-center md:mx-0 mx-auto gap-2 h-full",
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
