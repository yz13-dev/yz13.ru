import { applyGrid } from "@/lib/grid";
import { Notes as NotesProps } from "@/types/widgets";
import { NotebookIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { cn } from "yz13/cn";
import { Props } from "./props";




const Notes = (props: Props<NotesProps>) => {
  const { widget } = props
  return (
    <div
      style={applyGrid(widget.grid)}
      className={cn(
        "widget-wrapper",
        "relative p-4 space-y-2 border rounded-2xl",
        "group"
      )}
    >
      <div className="flex items-center justify-between gap-2 h-8">
        <span className="text-sm inline-flex items-center gap-1">
          <NotebookIcon size={14} />
          Notes
        </span>
        <Button variant="secondary" size="sm">Add note</Button>
      </div>
      <ul className="w-full h-[calc(100%-32px-8px)] space-y-2 overflow-y-auto">
        {
          widget.items.map((note, index) => {
            return <li key={widget.id + `-${index}-` + note} className="w-full h-8">
              <span className="text-sm text-secondary">{note}</span>
            </li>
          })
        }
      </ul>
    </div>
  )
}

export default Notes