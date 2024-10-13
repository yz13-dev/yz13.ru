"use client"
import { Button } from "@yz13/mono/components/button"
import { Popover, PopoverContent, PopoverTrigger } from "@yz13/mono/components/popover"
import { Separator } from "@yz13/mono/components/separator"
import { Tooltip, TooltipContent, TooltipTrigger } from "@yz13/mono/components/tooltip"
import { ArrowLeftIcon, ChevronRightIcon, FoldersIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMemo, useState } from "react"
import { cn } from "yz13/cn"
import { NavGroup as NavGroupType, navMap } from "../const/nav-map"

const NavList = ({ className }: { className?: string }) => {
  const pathname = usePathname()
  const isRoot = pathname === "/"
  const filtered = useMemo(() => {
    return navMap.filter((item) => {
      if (pathname === "/") {
        return true
      } else {
        if (item.type === "item") {
          return pathname === item.path
        } else return false
      }
    })
  }, [navMap])
  return (
    <nav className={cn("flex flex-col", className)}>
      {
        !isRoot &&
        <NavItem path="/" label="Back">
          <ArrowLeftIcon size={18} />
        </NavItem>
      }
      {
        filtered
          .map((item, index) => {
            if (item.type === "item") {
              const Icon = item.icon
              const items = item.items
              return (
                <>
                  <NavItem key={item.id} selected={pathname === item.path} path={item.path} label={item.label}><Icon size={18} /></NavItem>
                  {
                    !!items.length &&
                    items.map(
                      subItem => {
                        const SubIcon = subItem.icon
                        return <NavItem key={subItem.id} selected={pathname === subItem.path} path={subItem.path} label={subItem.label}><SubIcon size={18} className="shrink-0" /></NavItem>
                      }
                    )
                  }
                </>
              )
            } else if (item.type === "group") {
              return <NavGroup key={item.id} group={item} />
            } else if (item.type === "separator") {
              return <Separator key={`separator-${index}`} />
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
    <Popover open={expanded} onOpenChange={setExpanded}>
      <PopoverTrigger
        asChild
      >
        <button
          onClick={() => setExpanded(!expanded)}
          className={cn(
            "flex items-center h-9 md:px-2 px-0 gap-2 text-secondary text-sm border",
            expanded ? "rounded-xl" : "border-transparent"
          )}
        >
          <FoldersIcon size={18} />
          <span className="lg:!inline md:!inline hidden text-inherit">{group.groupTitle}</span>
          <ChevronRightIcon className="ml-auto" size={18} />
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="right" sideOffset={12}
        align="start"
        className="flex flex-col gap-0 w-56 rounded-xl p-0"
      >
        {
          group.items.map((item) => {
            const Icon = item.icon
            return <NavItem
              key={item.id}
              className="first:rounded-b-none first:rounded-t-xl rounded-none last-of-type:rounded-t-none last-of-type:rounded-b-xl"
              selected={pathname === item.path}
              path={item.path}
              label={item.label}
            >
              <Icon size={18} />
            </NavItem>
          })
        }
      </PopoverContent>
    </Popover>
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
            <span className="lg:!inline md:!inline hidden line-clamp-1 text-inherit">{label}</span>
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
