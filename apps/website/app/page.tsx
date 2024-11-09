import { Logo } from "@/components/logo"
import { Separator } from "@yz13/mono/components/separator"
import { cn } from "yz13/cn"
import Card from "./roadmap/card"
import { list } from "@/const/road-map"
import { Calendar } from "@yz13/mono/components/calendar"
import Tasks from "./tasks"
import AppSidebar from "@/components/app-sidebar/sidebar"

const page = () => {
  return (
    <>
      <AppSidebar />
      <main className="w-full h-dvh space-y-8 max-w-xl mx-auto md:!p-6 p-4">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-sm text-foreground">YZ13</h1>
            <span className="text-sm text-secondary">Fullstack Developer</span>
          </div>
          <span className="text-sm">Available for work</span>
        </div>
        <span className="text-xs text-secondary">Today, 5 November 2025</span>
        <div className="w-full h-fit flex lg:!flex-row flex-col gap-2">
          <div className="w-full space-y-1.5">
            <ul>
              <li>
                <div className="p-2 rounded-xl flex items-start gap-2 border hover:bg-yz-neutral-100 hover:border-foreground">
                  <div className="size-8 rounded-md border"></div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-foreground">Event 1</span>
                    <span className="text-xs text-secondary">Mon, 11 Nov 2024</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="h-full shrink-0 rounded-xl border">
            <Calendar className="w-full" />
          </div>
        </div>
        <Separator />
        <Tasks />
        <Separator />
        <div className="w-full">
          <ul className="*:transition-colors grid sm:!grid-cols-2 grid-cols-1 auto-rows-auto gap-2">
            {
              list
                .filter((_, i) => i <= 4)
                .map(item => {
                  return (
                    <li
                      key={`pr-${item}`}
                      className={cn(
                        "w-full peer rounded-xl border transition-colors",
                        "hover:border-foreground hover:bg-yz-neutral-100"
                      )}
                    >
                      <Card item={item} />
                    </li>
                  )
                })
            }
          </ul>
        </div>
        <Separator />
        <footer className="w-full h-fit flex justify-center mx-auto">
          <div className="w-fit h-fit flex items-center gap-2 bg-background">
            <div className="size-10 rounded-xl relative opacity-20 p-1">
              <div className="w-full h-full relative">
                <Logo className="w-full h-full" />
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
export default page
