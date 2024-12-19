import { Logo } from "@/components/logo"
import User from "@/components/user"
import { Button } from "mono/components/button"
import Link from "next/link"
import { cn } from "yz13/cn"
import { workspaces } from "./const/workspaces"

const Dock = ({ id }: { id?: string }) => {
  const buttonClassName = cn(
    "!rounded-none gap-2",
    "first:!rounded-l-lg first:!rounded-r-none",
    "last:!rounded-r-lg last:!rounded-l-none"
  )
  return (
    <footer className="fixed flex items-center w-fit justify-between gap-4 bottom-0 left-0 right-0 mx-auto p-4 z-10">
      <Logo className="size-9" />
      <div className={cn(
        "flex items-center bg-background",
        "rounded-lg border flex items-center justify-center"
      )}>
        {
          workspaces
            .items
            .map(space => {
              const isActive = space.id === id
              const Icon = space.icon
              const link = `/workspace/${space.id}`
              return (
                <Button className={buttonClassName} variant={isActive ? "default" : "ghost"} asChild>
                  <Link href={link}>
                    {Icon && <Icon size={16} />}
                    {isActive && space.name}
                  </Link>
                </Button>
              )
            })
        }
      </div>
      <User />
    </footer>
  )
}

export default Dock