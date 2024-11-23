import { QuickLink as QuickLinkProps } from "@/types/widgets"
import Image from "next/image"
import Link from "next/link"
import { cn } from "yz13/cn"
import { Props } from "./props"

const QuickLink = (props: Props<QuickLinkProps>) => {
  const { widget } = props
  const content = widget.content
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
      <Link href={content.href} className="w-full absolute left-0 top-0 h-full" />
      <div className="size-12 rounded-xl border group-hover:border-foreground transition-colors">
        {
          content.icon &&
          <Image src={content.icon ?? ""} alt={content.title} width={24} height={24} />
        }
      </div>
      <span className="text-xs">{content.title}</span>
    </div>
  )
}
export default QuickLink