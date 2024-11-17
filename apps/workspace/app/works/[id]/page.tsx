import action from "@/actions/work/action"
import { AppSidebar } from "@/components/sidebar/sidebar"
import { MoreVerticalIcon, StarIcon } from "lucide-react"
import { Button } from "mono/components/button"
import { redirect } from "next/navigation"

type PageProps = {
  params: {
    id: string
  }
}
const page = async ({ params }: PageProps) => {
  const { id } = params
  const work = await action({ id })
  const data = work?.data
  if (!data) return redirect("/all-works")
  const name = data.name
  return (
    <>
      <AppSidebar workId={id} />
      <main className="w-full h-dvh p-6">
        <div className="max-w-lg space-y-4 w-full rounded-xl border h-full p-4">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="secondary">Share</Button>
              <span className="text-sm text-secondary">This work is private</span>
            </div>
            <div className="flex items-center gap-2">
              <Button className="rounded-full" size="icon" variant="secondary"><StarIcon size={16} /></Button>
              <Button className="rounded-full" size="icon" variant="secondary"><MoreVerticalIcon size={16} /></Button>
            </div>
          </div>
          <h1 className="text-2xl font-bold">{name}</h1>
          <textarea
            className="w-full resize-none outline-none"
            placeholder="Start typing or type '/' to choose a different content type"
          />
        </div>
      </main>
    </>
  )
}

export default page
