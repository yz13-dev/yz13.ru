import { getWorkspacesByUser } from "@/actions/workspace/by-user/action"
import { Workspace } from "@/actions/workspace/get/action"
import { CheckIcon, PlusIcon } from "lucide-react"
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
  const isLimit = workspacesData.length >= 3
  console.log(currentWorkspace)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild={!!children}>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {
          !isLimit &&
          <DropdownMenuItem className="gap-2" asChild>
            <Link href="/new">
              <PlusIcon size={16} />
              <span>Create new</span>
            </Link>
          </DropdownMenuItem>
        }
        {
          currentWorkspace &&
          <DropdownMenuItem asChild className="bg-yz-neutral-100 gap-2">
            <Link href={`/?workspace=${currentWorkspace.id}`}>
              <CheckIcon size={16} />
              <span>{currentWorkspace.name || `Untitled#${currentWorkspace.id.slice(0, 6)}`}</span>
            </Link>
          </DropdownMenuItem>
        }
        {
          workspacesData
            .filter(space => space.id !== currentWorkspace?.id)
            .map((workspace) => {
              return (
                <DropdownMenuItem key={workspace.id} asChild className="gap-2">
                  <Link href={`/?workspace=${workspace.id}`}>
                    <CheckIcon size={16} className="opacity-0" />
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