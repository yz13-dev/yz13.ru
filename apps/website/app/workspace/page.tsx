import Events from "@/app/events"
import RoadMap from "@/app/road-map"
import Tasks from "@/app/tasks"
import AppSidebar from "@/components/app-sidebar/sidebar"
import { Logo } from "@/components/logo"
import { Separator } from "mono/components/separator"

type PageProps = {
  searchParams: {
    sidebar?: string
  }
}
const page = ({ searchParams }: PageProps) => {
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
        <Events />
        <Separator />
        <Tasks />
        <Separator />
        <RoadMap />
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
