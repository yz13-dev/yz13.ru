import type { Project, Stack } from "@yz13/registries";
import { cn } from "@yz13/ui/cn";

export const StackItem = ({
  item,
  type = "project",
}: {
  item: Stack,
  type?: Project["type"]
}) => {

  const Icon = item.icon;

  return (
    <div className="flex items-center gap-3 group/stack">
      <div className={cn(
        "h-12 aspect-4/3 rounded-xl flex items-center justify-center border",
        "group-hover/stack:bg-background bg-secondary group-hover/stack:outline-2 group-hover/stack:outline-border transition-all"
      )}
      >
        <Icon className="fill-foreground size-8" />
      </div>
      <div className="flex flex-col">
        <span className="text-sm uppercase text-muted-foreground">{item.category}</span>
        <span className="text-base font-medium">{item.name}</span>
      </div>
    </div>
  )
}
