import { applyGrid } from "@/lib/grid";
import { Notes as NotesProps } from "@/types/widgets";
import { NotebookIcon } from "lucide-react";
import { Button } from "mono/components/button";
import Link from "next/link";
import { cn } from "yz13/cn";
import { Props } from "./props";




const Notes = (props: Props<NotesProps>) => {
  const { widget } = props
  const content = widget.content
  const id = widget.id
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
      <ul className="w-full h-[calc(100%-32px-8px)] space-y-1 overflow-y-auto">
        {
          content
            .items
            .map(
              (note, index) => {
                return <li key={widget.widget_id + `-${index}-` + note} className="w-full h-9">
                  <Link
                    href={`?note=${id}&index=${index}`}
                    className="flex w-full h-full items-center gap-2 hover:bg-yz-neutral-100 rounded-lg px-3"
                  >
                    <span className="text-sm text-secondary line-clamp-1">{note}</span>
                  </Link>
                </li>
              }
            )
        }
      </ul>
    </div>
  )
}

export default Notes