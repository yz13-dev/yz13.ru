import { redirect } from "next/navigation"
import { Suspense } from "react"
import { workspaces } from "../const/workspaces"
import Loading from "./loading"

type PageProps = {
  params: {
    workspace: string
  }
}
const page = ({ params }: PageProps) => {
  const id = params.workspace
  const items = workspaces.items
  const target = items.find(item => item.id === id)
  if (!target) return redirect("/workspace")
  return (
    <Suspense fallback={<Loading />}>
      {target.component}
    </Suspense>
  )
}

export default page