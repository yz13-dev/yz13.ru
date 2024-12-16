"use client"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { Button } from "mono/components/button"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useMemo, WheelEvent } from "react"
import { workspaces } from "./const/workspaces"
import useTimeStore from "./store/time.store"
import useWorkspaceStore from "./store/workspace.store"


const Header = ({ workspace }: { workspace?: string }) => {
  return (
    <header className="w-full h-9 p-1 flex items-center justify-between gap-2 sticky top-0 bg-background z-30">
      <WorspaceSelector workspace={workspace} />
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

const WorspaceSelector = ({ workspace }: { workspace?: string }) => {
  const { active, switchWorkspace } = useWorkspaceStore()
  const config = workspaces
  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    e.stopPropagation()
    const shiftPressed = e.shiftKey === true
    if (shiftPressed) {
      const flow = e.deltaY > 0 ? 1 : -1
      if (flow === 1) return switchForward(1)
      else return switchBack(1)
    }
  }
  const switchBack = (offset: number) => {
    switchTo(-offset)
  }
  const switchForward = (offset: number) => {
    switchTo(offset)
  }
  const switchTo = (offset: number) => {
    const index = config.items.findIndex((item) => item.id === active)
    const nextIndex = index + offset
    if (nextIndex < 0 || nextIndex > config.items.length) return
    else {
      const newWorkspace = config.items[nextIndex]
      if (newWorkspace) switchWorkspace(newWorkspace.id)
    }
  }
  const prefix = "/workspace"
  const router = useRouter()
  const pathName = usePathname()
  const activeWorkspace = useMemo(() => config.items.find((item) => item.id === active), [active])
  const isFirst = useMemo(() => activeWorkspace?.id === config.items[0]?.id, [activeWorkspace])
  const isLast = useMemo(() => activeWorkspace?.id === config.items[config.items.length - 1]?.id, [activeWorkspace])
  useEffect(() => {
    const target = workspaces.items.find((item) => item.id === workspace)
    const isWorkspace = target !== undefined
    const isDefault = workspace === "default"
    if (isWorkspace) switchWorkspace(target.id)
    else if (isDefault) switchWorkspace(workspaces.defaultId)
  }, [workspace])
  useEffect(() => {
    if (active === workspace) return
    const isDefault = active === "default"
    const isWorkspace = workspaces.items.find((item) => item.id === active) && !isDefault
    const path = `${prefix}/${active}`
    const withOutPrefix = pathName.replace(prefix, "")
    const providedAsPath = "/" + workspace
    if (withOutPrefix === providedAsPath) return
    if (isDefault && !isWorkspace && pathName !== prefix) router.push(prefix)
    if (!isDefault && isWorkspace && pathName !== path) router.push(path)
  }, [active, workspace])
  return (
    <div
      className="h-full w-fit border rounded-lg flex items-center justify-center gap-1 overflow-hidden"
      onWheel={handleWheel}
    >
      <Button disabled={isFirst} size="icon" variant="ghost" className="size-7 flex items-center justify-center !rounded-r-none"
        onClick={() => switchBack(1)}
      >
        <ChevronLeftIcon size={12} />
      </Button>
      <span className="text-xs w-12 text-center line-clamp-1 capitalize">{activeWorkspace?.name}</span>
      <Button disabled={isLast} size="icon" variant="ghost" className="size-7 flex items-center justify-center !rounded-l-none"
        onClick={() => switchForward(1)}
      >
        <ChevronRightIcon size={12} />
      </Button>
    </div>
  )
}

export default Header