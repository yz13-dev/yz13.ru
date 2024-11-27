import { Workspace as WorkspaceType } from "@/actions/workspace/get/action"
import { Logo } from "@/components/logo"
import { auth } from "@/lib/auth"
import { PlusIcon, SettingsIcon } from "lucide-react"
import { Button } from "mono/components/button"
import { Skeleton } from "mono/components/skeleton"
import Link from "next/link"
import { Suspense } from "react"
import User from "./user"
import WorkspacesDropdown from "./workspaces-dropdown"

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="space-y-12 w-full">
      {children}
    </div>
  )
}

type HeaderProps = {
  workspace?: WorkspaceType | null
  info?: React.ReactNode
  actions?: React.ReactNode
}
const Header = async ({ actions, info, workspace }: HeaderProps) => {
  const user = await auth()
  const isOwner = workspace?.user === user?.id
  const workspaceName = workspace?.name ?? "Untitled"
  return (
    <header className="px-8 pt-8 max-w-screen-2xl mx-auto w-full h-fit flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-3">
          <Logo className="size-7" />
          <span className="text-2xl font-pixel">YZ13</span>
        </Link>
        <WorkspacesDropdown currentWorkspace={workspace ?? null} userId={user?.id}>
          <Button size="sm" variant="outline" className="rounded-full">{workspaceName}</Button>
        </WorkspacesDropdown>
        {info}
        <Suspense fallback={<Skeleton className="size-8 rounded-full" />}>
          <User providedUser={user} />
        </Suspense>
      </div>
      <div className="flex items-center gap-2">
        {
          isOwner && (
            <>
              <Button size="icon" variant="outline" className="rounded-full"><PlusIcon size={16} /></Button>
              <Button size="icon" variant="outline" className="rounded-full"><SettingsIcon size={16} /></Button>
            </>
          )
        }
        {actions}
      </div>
    </header>
  )
}

export const Workspace = {
  Header,
  Wrapper,
}

export { Header, Wrapper }
