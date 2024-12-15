import { redirect } from "next/navigation"
import { workspaces } from "../const/workspaces"


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
  return target.component
}

export default page