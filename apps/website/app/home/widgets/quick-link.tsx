import { QuickLink as QuickLinkProps } from "@/types/widgets"
import Link from "next/link"
import { cn } from "yz13/cn"
import { Props } from "./props"


const QuickLink = (props: Props<QuickLinkProps>) => {
  const { widget } = props
  return (
    <div
      style={{
        // @ts-expect-error
        "--column-start": `${widget.grid.column.start}`,
        "--column-end": `${widget.grid.column.end}`,
        "--row-start": `${widget.grid.row.start}`,
        "--row-end": `${widget.grid.row.end}`,
      }}
      className={cn(
        "widget-wrapper",
        "relative p-2 flex flex-col justify-evenly items-center",
        "group"
      )}
    >
      <Link href={widget.link.href} className="w-full absolute left-0 top-0 h-full" />
      <div className="size-12 rounded-xl border group-hover:border-foreground transition-colors">
      </div>
      <span className="text-xs">{widget.link.title}</span>
    </div>
  )
}
export default QuickLink