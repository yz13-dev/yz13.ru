import { Logo } from "@/components/logo";
import User from "@/components/user";
import { Skeleton } from "mono/components/skeleton";
import { Suspense } from "react";

const Header = () => {
  return (
    <header className="w-full h-14 flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Logo size={{ width: 36, height: 36 }} type="only-icon" />
          <span className="font-pixel text-3xl">Chat</span>
        </div>
      </div>
      <Suspense fallback={<Skeleton className="h-9 w-[75px]" />}>
        <User />
      </Suspense>
    </header>
  );
};

export default Header;
