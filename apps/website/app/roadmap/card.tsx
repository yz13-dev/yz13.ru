import { LockIcon } from "lucide-react"
import { Separator } from "mono/components/separator"
import { cn } from "yz13/cn"

export type RoadMap = {
  id: string,
  title: string
  href: string | null
  status: "plan" | "dev" | "approval" | "prod"
  created_at: string
  icon: string | null
}

const Card = ({ item }: { item: RoadMap }) => {
  const status = item.status
  const statuses = ["plan", "dev", "approval", "prod"]
  const statusIndex = statuses.indexOf(status)
  return (
    <div className="p-2.5 h-fit flex gap-3 flex-col">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <div className="size-5 border rounded-full" />
          <div className="flex flex-col">
            <h3 className="text-sm line-clamp-2">{item.title}</h3>
          </div>
        </div>
        {
          item.href &&
          <span className="inline-flex hover:underline text-xs hover:text-foreground text-secondary items-center gap-1.5">
            <LockIcon size={12} className="text-inherit" />
            https://example.dev
          </span>
        }
      </div>
      <div className="flex w-full items-center justify-between">
        <span
          className={cn(
            "text-xs shrink-0 px-2 py-0.5 rounded-md border text-secondary",
            statusIndex === 0 ? "border-foreground text-foreground" : ""
          )}
        >
          Plan
        </span>
        <Separator className="sm:!w-4 w-6 inline-block" />
        <span
          className={cn(
            "text-xs shrink-0 px-2 py-0.5 rounded-md border text-secondary",
            statusIndex === 1 ? "border-foreground text-foreground" : ""
          )}
        >
          Dev
        </span>
        <Separator className="sm:!w-4 w-6 inline-block" />
        <span
          className={cn(
            "text-xs shrink-0 px-2 py-0.5 rounded-md border text-secondary",
            statusIndex === 2 ? "border-foreground text-foreground" : ""
          )}
        >
          Approval
        </span>
        <Separator className="sm:!w-4 w-6 inline-block" />
        <span
          className={cn(
            "text-xs shrink-0 px-2 py-0.5 rounded-md border text-secondary",
            statusIndex === 3 ? "border-foreground text-foreground" : ""
          )}
        >
          Prod
        </span>
      </div>
    </div>
  )
}
export default Card
