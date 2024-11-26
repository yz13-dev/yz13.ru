import { action as getGrid } from "@/actions/grid/get/action"
import { Widget } from "@/types/widgets"
import NotesModal from "./modals/notes-modal"
import { SearchParams } from "./page"
import Calendar from "./widgets/calendar"
import Clock from "./widgets/clock"
import LinksFolder from "./widgets/links-folder"
import Notes from "./widgets/notes"
import QuickLink from "./widgets/quick-link"

export const getMaxRows = (widgets: Widget[]) => {
  let maxRows = 0
  for (const widget of widgets) {
    if (widget.grid.row.end > maxRows) {
      maxRows = widget.grid.row.end
    }
  }
  return maxRows
}

type GridProps = {
  workspaceId: string
  searchParams?: SearchParams
}

export const UserGrid = async ({ workspaceId, searchParams }: GridProps) => {
  const grid = await getGrid({ workspace: workspaceId })
  const gridData = grid?.data as any[]
  const maxRows = getMaxRows(gridData)

  const showNotesModal = searchParams?.note && searchParams?.index
  const targetNote = showNotesModal ? gridData.find((widget) => widget.id === searchParams?.note) : null
  const targetIndex = showNotesModal ? parseInt(searchParams?.index ?? "0") : null
  return (
    <>
      {
        showNotesModal && targetNote && targetIndex !== null &&
        <NotesModal note={targetNote} index={targetIndex} />
      }
      <main
        style={{
          // @ts-expect-error
          "--rows": `${maxRows}`,
        }}
        className="px-8 page-width-limit widgets-grid w-full mx-auto"
      >
        {
          gridData
            .map((widget, index) => {
              if (widget.widget_id === "quick-link") return <QuickLink widget={widget} key={`${widget.id}-${index}`} />
              if (widget.widget_id === "clock") return <Clock widget={widget} key={`${widget.id}-${index}`} />
              if (widget.widget_id === "notes") return <Notes widget={widget} key={`${widget.id}-${index}`} />
              if (widget.widget_id === "calendar") return <Calendar widget={widget} key={`${widget.id}-${index}`} />
              if (widget.widget_id === "links-folder") return <LinksFolder widget={widget} key={`${widget.id}-${index}`} />
              return
            })
        }
      </main>
    </>
  )
}

export const Grid = ({ widgets = [] }: { widgets?: Widget[] }) => {
  const maxRows = getMaxRows(widgets)

  return (
    <main
      style={{
        // @ts-expect-error
        "--rows": `${maxRows}`,
      }}
      className="px-8 page-width-limit widgets-grid w-full mx-auto"
    >
      {
        widgets
          .map((widget, index) => {
            if (widget.widget_id === "quick-link") return <QuickLink widget={widget} key={`${widget.id}-${index}`} />
            if (widget.widget_id === "clock") return <Clock widget={widget} key={`${widget.id}-${index}`} />
            if (widget.widget_id === "notes") return <Notes widget={widget} key={`${widget.id}-${index}`} />
            if (widget.widget_id === "calendar") return <Calendar widget={widget} key={`${widget.id}-${index}`} />
            if (widget.widget_id === "links-folder") return <LinksFolder widget={widget} key={`${widget.id}-${index}`} />
            return
          })
      }
    </main>
  )
}