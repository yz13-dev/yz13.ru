"use client"

import { WheelEvent } from "react"
import { cn } from "yz13/cn"
import { workspaces } from "./const/workspaces"
import useTimeStore from "./store/time.store"
import useWorkspaceStore from "./store/workspace.store"


const Header = () => {
  return (
    <header className="w-full h-9 p-1 flex items-center justify-between gap-2">
      <WorspaceSelector />
      <Date />
      <div className="h-full w-fit border rounded-lg px-2 flex items-center justify-center gap-1">
        <span className="text-xs">EN</span>
      </div>
    </header>
  )
}

const Date = () => {
  const { time } = useTimeStore()
  return (
    <div className="h-full w-fit border rounded-lg px-2 flex items-center justify-center gap-1">
      <span className="text-xs">{time.format("DD MMMM YYYY")}</span>
    </div>
  )
}

const WorspaceSelector = () => {
  const { active, switchWorkspace } = useWorkspaceStore()
  const config = workspaces
  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    e.stopPropagation()
    const shiftPressed = e.shiftKey === true
    if (shiftPressed) {
      const activeIndex = config.items.findIndex((item) => item.id === active)
      const flow = e.deltaY > 0 ? 1 : -1
      const nextIndex = activeIndex + flow
      console.log(nextIndex, flow)
      if (nextIndex < 0 || nextIndex > config.items.length) return
      else {
        const newWorkspace = config.items[nextIndex]
        if (newWorkspace) switchWorkspace(newWorkspace.id)
      }
    }
  }
  return (
    <div
      className="h-full w-fit border rounded-lg px-2 flex items-center justify-center gap-1"
      onWheel={handleWheel}
    >
      {
        config.items.map((item) => (
          <div
            key={item.id}
            className={cn(
              "w-2 h-2 rounded-full bg-yz-neutral-300 transition-all duration-700 delay-150",
              active === item.id
                ? "w-6 h-2.5 bg-foreground"
                : ""
            )}
            onClick={() => switchWorkspace(item.id)}
          />
        ))
      }
    </div>
  )
}

export default Header