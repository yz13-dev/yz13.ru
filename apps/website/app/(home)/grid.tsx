import { action as getGrid } from "@/actions/grid/get/action"
import { action, Workspace } from "@/actions/workspace/get/action"
import { auth } from "@/lib/auth"
import { Widget } from "@/types/widgets"
import { redirect } from "next/navigation"
import NotesModal from "./modals/notes-modal"
import { SearchParams } from "./page"
import Calendar from "./widgets/calendar"
import Clock from "./widgets/clock"
import Notes from "./widgets/notes"
import QuickLink from "./widgets/quick-link"

const getMaxRows = (widgets: Widget[]) => {
  let maxRows = 0
  for (const widget of widgets) {
    if (widget.grid.row.end > maxRows) {
      maxRows = widget.grid.row.end
    }
  }
  return maxRows
}

type GridProps = {
  searchParams?: SearchParams
}

const Grid = async ({ searchParams }: GridProps) => {
  const user = await auth()
  if (user === null) return null
  const workspace = await action({ userId: user?.id })
  const workspaceData = workspace?.data as Workspace | null
  if (!workspaceData) {
    return redirect("/home/new")
  }
  const workspaceId = workspaceData.id as string
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
              return
            })
        }
      </main>
    </>
  )
}
export default Grid