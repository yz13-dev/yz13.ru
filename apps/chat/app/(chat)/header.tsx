import User from "@/components/user";
import { Skeleton } from "mono/components/skeleton";
import { Suspense } from "react";
import ChatSidebarTrigger from "./chat-sidebar-trigger";

const Header = () => {
  return (
    <header className="w-full h-14 flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <ChatSidebarTrigger />
      </div>
      <Suspense fallback={<Skeleton className="h-9 w-[75px]" />}>
        <User />
      </Suspense>
    </header>
  );
};

export default Header;
