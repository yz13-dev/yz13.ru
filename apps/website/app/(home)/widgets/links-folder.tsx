import { applyGrid } from "@/lib/grid"
import { LinksFolder as LinksFolderProps } from "@/types/widgets"
import { cn } from "yz13/cn"
import { Props } from "./props"


const LinksFolder = (props: Props<LinksFolderProps>) => {
  const { widget } = props
  const content = widget.content
  return (
    <div
      style={applyGrid(widget.grid)}
      className={cn(
        "widget-wrapper",
        "relative p-4 space-y-2 border rounded-2xl",
        "group"
      )}
    >

    </div>
  )
}
export default LinksFolder