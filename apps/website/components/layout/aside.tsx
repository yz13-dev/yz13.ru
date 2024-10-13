"use client"

import { cn } from "yz13/cn"


const Aside = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => {
  return (
    <aside
      //     style={{ width: "var(--container-nav-sidebar-width)" }}
      className={cn(
        "h-fit lg:!w-44 md:!w-36 shrink-0 w-fit sticky lg:!top-6 top-3 space-y-1 flex flex-col",
        "z-10", className
      )}
    >
      {children}
    </aside>
  )
}
export { Aside }
