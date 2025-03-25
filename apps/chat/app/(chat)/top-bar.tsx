"use client";
import { Separator } from "mono/components/separator";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { cn } from "yz13/cn";
import { create } from "zustand";
import { useChatApi } from "./chat-api/chat-provider";
import ChatSidebarTrigger from "./chat-sidebar-trigger";

type TopbarProps = {
  className?: string;
  children?: React.ReactNode;
};

type State = {
  overscrolled: boolean;
};
type Actions = {
  setOverscrolled: (overscrolled: boolean) => void;
};

export const useTopbar = create<State & Actions>((set) => ({
  overscrolled: false,
  setOverscrolled: (overscrolled) => set({ overscrolled }),
}));
export const setOverscrolled = (overscrolled: boolean) =>
  useTopbar.setState({ overscrolled });

const Topbar = ({ className = "", children }: TopbarProps) => {
  const overscrolled = useTopbar((state) => state.overscrolled);
  const chat = useChatApi((state) => state.chat);
  const handleScroll = (e: Event) => {
    const scrollTop = window.scrollY;
    if (scrollTop >= 48) {
      setOverscrolled(true);
    } else {
      setOverscrolled(false);
    }
  };
  const handleInitialScroll = () => {
    if (typeof window !== "undefined") {
      const scrollTop = window.scrollY;
      if (scrollTop >= 48) {
        setOverscrolled(true);
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
        <AnimatePresence>
          {overscrolled && (
            <>
              <ChatSidebarTrigger />
              <motion.span
                layoutId="chat-name"
                className="md:text-lg text-base px-1.5 md:max-w-48 max-w-20 font-semibold line-clamp-1 shrink-0"
              >
                {chat?.name ?? "Без названия"}
              </motion.span>
              <Separator orientation="vertical" className="h-7" />
            </>
          )}
        </AnimatePresence>
        {children}
      </div>
    </div>
  );
};

export default Topbar;
