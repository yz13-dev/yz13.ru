import { applyGrid } from "@/lib/grid";
import { Grid } from "@/types/widgets";
import { cn } from "yz13/cn";


export const Wrapper = ({ grid, children }: { grid: Grid["grid"], children: React.ReactNode }) => {
  return (
    <div
      style={applyGrid(grid)}
      className={cn(
        "widget-wrapper",
        "relative p-4 space-y-2 border rounded-2xl",
        "group"
      )}
    >
      {children}
    </div>
  )
}