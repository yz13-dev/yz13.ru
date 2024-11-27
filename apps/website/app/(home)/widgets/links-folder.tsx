import { applyGrid } from "@/lib/grid"
import { LinksFolder as LinksFolderProps } from "@/types/widgets"
import { LinkIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "yz13/cn"
import { Props } from "./props"


const LinksFolder = (props: Props<LinksFolderProps>) => {
  const { widget } = props
  const content = widget.content
  const size = content.size
  const links = content.links
  return (
    <div
      style={applyGrid(widget.grid)}
      className={cn(
        "widget-wrapper",
        "relative p-4 gap-4 border rounded-2xl",
        size === "small" && "folder-small",
        size === "medium" && "folder-medium",
        size === "large" && "folder-large"
      )}
    >
      {
        links.map(async (item, index) => {
          const content = item
          // const favicon = isIconLink && hostname && await fetchFavicon({ hostname })
          return (
            <div key={widget.id + `-${item.href}-` + index} className="relative aspect-square group flex flex-col justify-start items-start group">
              <Link href={content.href} className="w-full absolute left-0 top-0 h-full" />
              <div className="size-full rounded-xl border block content-center group-hover:border-foreground transition-colors">
                {
                  content.icon
                    ? <Image src={content.icon ?? ""} className="mx-auto" alt={content.title} width={24} height={24} />
                    : <LinkIcon size={16} className="mx-auto" />
                }
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
export default LinksFolder