"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "mono/components/breadcrumb";
import { useEffect } from "react";
import { cn } from "yz13/cn";
import { create } from "zustand";
import { useChatApi } from "../chat-api/chat-provider";
import ChatSidebarTrigger from "../sidebar-trigger";

type TopbarProps = {
  className?: string;
  children?: React.ReactNode;
  hideBreadcrumbs?: boolean;
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

const Topbar = ({
  className = "",
  children,
  hideBreadcrumbs = false,
}: TopbarProps) => {
  const overscrolled = useTopbar((state) => state.overscrolled);
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
    <header
      className={cn(
        "top-0 z-20 h-fit group/topbar shrink-0 w-full sticky transition-all",
        overscrolled ? "p-2" : "p-0 min-h-16",
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-2 backdrop-blur-sm h-full",
          "mx-auto transition-all p-1 duration-500 border-b",
          overscrolled
            ? "max-w-4xl rounded-lg bg-neutral-200/60 border-transparent"
            : "max-w-full rounded-none bg-background border-border",
          className,
        )}
      >
        {children}
      </div>
    </header>
  );
};

export const ChatName = () => {
  const chat = useChatApi((state) => state.chat);
  return (
    <span className="text-sm shrink-0 px-4 font-medium">
      {chat?.name ?? "Без названия"}
    </span>
  );
};

export default Topbar;
