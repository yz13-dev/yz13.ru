"use client"
import { Button } from "@yz13/mono/components/button"
import { Separator } from "@yz13/mono/components/separator"
import { Tooltip, TooltipContent, TooltipTrigger } from "@yz13/mono/components/tooltip"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "yz13/cn"
import { NavGroup as NavGroupType, navMap } from "../const/nav-map"

const NavList = ({ className }: { className?: string }) => {
  const pathname = usePathname()
  return (
    <nav className={cn("flex flex-col", className)}>
      {
        navMap.map((item) => {
          if (item.type === "item") {
            const Icon = item.icon
            return <NavItem selected={pathname === item.path} path={item.path} label={item.label}><Icon size={18} /></NavItem>
          } else if (item.type === "group") {
            return <NavGroup group={item} />
          } else if (item.type === "separator") {
            return <Separator />
          }
        })
      }
    </nav>
  )
}

const NavGroup = ({ group }: { group: NavGroupType }) => {
  const pathname = usePathname()
  const [expanded, setExpanded] = useState<boolean>(false)
  return (
    <div className={cn(
      "flex flex-col",
      expanded ? "border rounded-xl" : ""
    )}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center h-9 md:px-2 px-0 gap-2 text-secondary text-sm"
      >
        <ChevronDown size={18} className={cn(expanded ? "rotate-180" : "")} />
        <span className="lg:!inline md:!inline hidden text-inherit">{group.groupTitle}</span>
      </button>
      {
        expanded && group.items.map((item) => {
          const Icon = item.icon
          return <NavItem
            className="first:rounded-b-none first:rounded-t-xl rounded-none last-of-type:rounded-t-none last-of-type:rounded-b-xl"
            selected={pathname === item.path}
            path={item.path}
            label={item.label}
          >
            <Icon size={18} />
          </NavItem>
        })
      }
    </div>
  )
}

const NavItem = ({
  children,
  path,
  label,
  selected = false,
  className = ""
}: {
  className?: string
  selected?: boolean,
  children?: React.ReactNode
  path: string,
  label: string
}) => {
  return (
    <Tooltip delayDuration={100}>
      <TooltipTrigger asChild>
        <Button
          className={cn(
            "md:!w-full md:px-2 px-0 justify-center w-9 md:!justify-start gap-2 font-normal",
            selected ? "text-foreground" : "text-secondary hover:text-foreground",
            className
          )}
          variant={selected ? "secondary" : "ghost"}
          asChild
        >
          <Link href={path}>
            {children}
            <span className="lg:!inline md:!inline hidden text-inherit">{label}</span>
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent
        className="border lg:!hidden inline !z-10 bg-yz-neutral-50"
        side="right" sideOffset={12}
        align="start"
      >
        <span>{label}</span>
      </TooltipContent>
    </Tooltip>
  )
}

export { NavList }
