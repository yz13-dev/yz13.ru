import { getWorkspacesByUser } from "@/actions/workspace/by-user/action"
import { Workspace } from "@/actions/workspace/get/action"
import { PlusIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "mono/components/dropdown-menu"
import Link from "next/link"



type Props = {
  children?: React.ReactNode
  currentWorkspace: Workspace | null
  userId?: string
}
const WorkspacesDropdown = async ({ children, currentWorkspace, userId }: Props) => {
  const workspaces = userId && await getWorkspacesByUser({ id: userId })
  const workspacesData = workspaces ? workspaces?.data as unknown as Workspace[] : []
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild={!!children}>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="gap-2" asChild>
          <Link href="/new">
            <PlusIcon size={16} />
            <span>Create new</span>
          </Link>
        </DropdownMenuItem>
        {
          currentWorkspace &&
          <DropdownMenuItem asChild>
            <Link href={`/?workspace=${currentWorkspace.id}`}>
              <span>{currentWorkspace.name || `Untitled#${currentWorkspace.id.slice(0, 6)}`}</span>
            </Link>
          </DropdownMenuItem>
        }
        {
          workspacesData.map((workspace) => {
            return (
              <DropdownMenuItem key={workspace.id} asChild>
                <Link href={`/?workspace=${workspace.id}`}>
                  <span>{workspace.name || `Untitled#${workspace.id.slice(0, 6)}`}</span>
                </Link>
              </DropdownMenuItem>
            )
          })
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default WorkspacesDropdown