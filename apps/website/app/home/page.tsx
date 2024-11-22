import { Logo } from "@/components/logo"
import { Widget } from "@/types/widgets"
import User from "./user"
import Clock from "./widgets/clock"
import Notes from "./widgets/notes"
import QuickLink from "./widgets/quick-link"

const widgets: Widget[] = [
  {
    id: "clock",
    timeZone: 5,
    grid: {
      column: {
        start: 1,
        end: 3,
      },
      row: {
        start: 0,
        end: 0,
      }
    }
  },
  {
    id: "quick-link",
    link: {
      icon: "home",
      title: "Home",
      href: "/",
    },
    grid: {
      column: {
        start: 4,
        end: 4,
      },
      row: {
        start: 0,
        end: 0,
      }
    }
  },
  {
    id: "quick-link",
    link: {
      icon: "home",
      title: "Socials",
      href: "/socials",
    },
    grid: {
      column: {
        start: 5,
        end: 5,
      },
      row: {
        start: 0,
        end: 0,
      }
    }
  },
  {
    id: "notes",
    items: [
      "Note 1",
      "Note 2",
      "Note 3",
      "Note 4",
      "Note 5",
      "Note 6",
      "Note 7",
      "Note 8",
      "Note 9",
      "Note 10",
    ],
    grid: {
      column: {
        start: 1,
        end: 3,
      },
      row: {
        start: 2,
        end: 3,
      }
    }
  }
]

const getMaxRows = (widgets: Widget[]) => {
  let maxRows = 0
  for (const widget of widgets) {
    if (widget.grid.row.end > maxRows) {
      maxRows = widget.grid.row.end
    }
  }
  return maxRows
}

type PageProps = {
  searchParams: {}
}

const page = async ({ searchParams }: PageProps) => {
  const maxRows = getMaxRows(widgets)
  return (
    <div className="space-y-12 w-full">
      <header className="px-8 pt-8 max-w-screen-2xl mx-auto w-full h-fit flex items-center justify-start gap-4">
        <div className="flex items-center gap-3">
          <Logo className="size-7" />
          <span className="text-2xl font-pixel">YZ13</span>
        </div>
        <User />
      </header>
      <main
        style={{
          // @ts-expect-error
          "--rows": `${maxRows}`,
        }}
        className="px-8 page-width-limit widgets-grid w-full mx-auto"
      >
        {
          widgets.map((widget, index) => {
            if (widget.id === "quick-link") return <QuickLink widget={widget} key={`${widget.id}-${index}`} />
            if (widget.id === "clock") return <Clock widget={widget} key={`${widget.id}-${index}`} />
            if (widget.id === "notes") return <Notes widget={widget} key={`${widget.id}-${index}`} />
            return
          })
        }
      </main>
    </div>
  )
}
export default page
