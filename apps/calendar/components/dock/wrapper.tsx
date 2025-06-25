"use client";

import { cn } from "@yz13/ui/cn";
import { useEffect, useRef } from "react";

export default function ({ children, className = "" }: { className?: string, children?: React.ReactNode }) {

  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = ref.current;
    if (!footer) return;

    const height = footer.scrollHeight;

    const body = document.getElementById("root")

    if (body) {
      body.style.setProperty("--dock-height", `${height}px`)
    }

  }, [])
  return (
    <footer
      ref={ref}
      className={cn(
        "max-w-screen min-w-sm fixed left-0 right-0 bottom-0 p-2 rounded-t-xl mx-auto bg-card w-fit border-x border-t h-fit",
        className,
      )}
    >
      {children}
    </footer>
  )
}
