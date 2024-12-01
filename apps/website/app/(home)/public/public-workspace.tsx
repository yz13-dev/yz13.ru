import { action as getGrid } from "@/actions/grid/get/action"
import { action as getWorkspace } from "@/actions/workspace/by-id/action"
import { Workspace as WorkspaceType } from "@/actions/workspace/get/action"
import { LayoutGridIcon } from "lucide-react"
import { Button } from "mono/components/button"
import { Grid } from "../grid"
import { SearchParams } from "../page"
import { Workspace } from "../workspace"



type PageProps = {
  searchParams: SearchParams
}
const PublicWorkspace = async ({ searchParams }: PageProps) => {
  const workspaceId = "ea5c4189-3134-472e-8ba5-f033132b623e"
  const workspace = await getWorkspace({ id: workspaceId })
  const workspaceData = workspace?.data as WorkspaceType | null
  const grid = await getGrid({ workspace: workspaceId })
  const gridData = grid?.data as any[]

  const showNotesModal = searchParams?.note && searchParams?.index
  const targetNote = showNotesModal ? gridData.find((widget) => widget.id === searchParams?.note) : null
  const targetIndex = showNotesModal ? parseInt(searchParams?.index ?? "0") : null

  const workspaceName = workspaceData?.name ?? "Untitled"
  return (
    <Workspace.Wrapper>
      <Workspace.Header
        workspace={workspaceData}
        actions={
          <Button size="icon" variant="outline" className="rounded-full size-9">
            <LayoutGridIcon size={16} />
            <span className="sr-only">Services</span>
          </Button>
        }
      />
      <Grid widgets={gridData} />
    </Workspace.Wrapper>
  )
}
export default PublicWorkspace
