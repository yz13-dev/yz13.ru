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
    <header
      className={cn(
        "top-0 z-20 h-14 shrink-0 w-full sticky p-2 transition-colors duration-700",
        overscrolled ? "bg-transparent" : "bg-background",
      )}
    >
      <div
        className={cn(
          "px-2 flex items-center bg-background/80 backdrop-blur-sm rounded-lg justify-center gap-2 h-full",
          "mx-auto transition-all",
          overscrolled ? "max-w-4xl" : "max-w-full",
          className,
        )}
      >
        <ChatSidebarTrigger />
        {!hideBreadcrumbs && <TopBarBreadcrumbs />}
        {children}
      </div>
    </header>
  );
};

export const TopBarBreadcrumbs = () => {
  const chat = useChatApi((state) => state.chat);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Чаты</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbPage>{chat?.name ?? "Без названия"}</BreadcrumbPage>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Topbar;
