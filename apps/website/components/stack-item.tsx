import type { Stack } from "@yz13/registries";

export const StackItem = ({ item }: { item: Stack }) => {

  const Icon = item.icon;

  return (
    <div className="flex items-center gap-3">
      <div className="h-12 aspect-4/3 rounded-xl border bg-secondary flex items-center justify-center">
        <Icon className="fill-foreground size-8" />
      </div>
      <div className="flex flex-col">
        <span className="text-sm uppercase text-muted-foreground">{item.category}</span>
        <span className="text-base font-medium">{item.name}</span>
      </div>
    </div>
  )
}
