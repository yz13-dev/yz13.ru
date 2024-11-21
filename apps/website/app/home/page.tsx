import { Logo } from "@/components/logo"
import { HomeWidget } from "@/types/widgets"
import { Button } from "mono/components/button"
import Link from "next/link"
import { cn } from "yz13/cn"

const widgets: HomeWidget[] = [
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
      title: "Home",
      href: "/",
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
        start: 2,
        end: 2,
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
        start: 5,
        end: 5,
      },
      row: {
        start: 2,
        end: 2,
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
        start: 1,
        end: 3,
      },
      row: {
        start: 2,
        end: 4,
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
        start: 6,
        end: 9,
      },
      row: {
        start: 1,
        end: 2,
      }
    }
  }
]

const getMaxRows = (widgets: HomeWidget[]) => {
  let maxRows = 0
  for (const widget of widgets) {
    if (widget.grid.row.end > maxRows) {
      maxRows = widget.grid.row.end
    }
  }
  return maxRows
}

const page = () => {
  const maxRows = getMaxRows(widgets)
  return (
    <div className="space-y-12 w-full">
      <header className="px-8 pt-8 max-w-screen-2xl mx-auto w-full h-fit flex items-center justify-start gap-4">
        <div className="flex items-center gap-3">
          <Logo className="size-7" />
          <span className="text-2xl font-pixel">YZ13</span>
        </div>
        <Button className="rounded-full" variant="outline" size="sm">Sign in</Button>
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
            if (widget.id === "quick-link") {
              return (
                <Link
                  key={`${widget.id}-${index}`}
                  href={widget.link.href}
                  style={{
                    // @ts-expect-error
                    "--column-start": `${widget.grid.column.start}`,
                    "--column-end": `${widget.grid.column.end}`,
                    "--row-start": `${widget.grid.row.start}`,
                    "--row-end": `${widget.grid.row.end}`,
                  }}
                  className={cn(
                    "widget-wrapper",
                    "rounded-xl border p-2 flex items-center justify-center",
                    "hover:border-foreground"
                  )}
                >

                </Link>
              )
            } else if (widget.id === "clock") {
              return (
                <div
                  key={`${widget.id}-${index}`}
                  style={{
                    // @ts-expect-error
                    "--column-start": `${widget.grid.column.start}`,
                    "--column-end": `${widget.grid.column.end}`,
                    "--row-start": `${widget.grid.row.start}`,
                    "--row-end": `${widget.grid.row.end}`,
                  }}
                  className={cn(
                    "widget-wrapper",
                    widget.id === "clock" ? "clock-widget" : "",
                  )}
                >
                  <span>13:08</span>
                </div>
              )
            }
          })
        }
      </main>
    </div>
  )
}
export default page
