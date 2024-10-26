import { AppSidebar } from "@/components/sidebar/sidebar"
import { BriefcaseIcon, Trash2Icon } from "lucide-react"

const page = () => {
  return (
    <>
      <AppSidebar />
      <main className="w-full h-dvh">
        <div className="w-full h-full flex gap-4 flex-col items-center justify-center">
          <div className="size-12 rounded-lg border flex items-center justify-center">
            <BriefcaseIcon className="text-secondary" size={24} />
          </div>
          <span className="text-center text-sm text-secondary">
            Select a work to view
          </span>
        </div>
      </main>
    </>
  )
}

export default page
