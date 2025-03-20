"use client";
import { useState } from "react";
import { cn } from "yz13/cn";

type TopbarProps = {
  className?: string;
  children?: React.ReactNode;
};
const Topbar = ({ className = "", children }: TopbarProps) => {
  const [showSidebarTrigger, setShowSidebarTrigger] = useState<boolean>(false);
  return (
    <div className="top-0 z-20 h-14 bg-background border-b w-full sticky mb-6">
      <div
        className={cn(
          "px-4 py-2 flex items-center md:mx-0 mx-auto gap-2 h-full",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Topbar;
