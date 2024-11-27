import { action, Workspace as WorkspaceType } from "@/actions/workspace/get/action"
import { auth } from "@/lib/auth"
import { PlusIcon, SettingsIcon } from "lucide-react"
import { Button } from "mono/components/button"
import { Skeleton } from "mono/components/skeleton"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import { UserGrid } from "./grid"
import { SearchParams } from "./page"
import { Workspace } from "./workspace"


type PageProps = {
  searchParams: SearchParams
}
const PersonalWorkspace = async ({ searchParams }: PageProps) => {
  const user = await auth()
  if (user === null) return redirect("/auth/login/anon")
  const workspace = await action({ userId: user?.id })
  const workspaceData = workspace?.data as WorkspaceType | null
  if (!workspaceData) {
    return redirect("/public")
  }
  const workspaceId = workspaceData.id as string
  const workspaceName = workspaceData?.name ?? "Untitled"
  return (
    <Workspace.Wrapper>
      <Workspace.Header
        info={
          <Button size="sm" variant="outline" className="rounded-full">{workspaceName}</Button>
        }
        actions={
          <>
            <Button size="icon" variant="outline" className="rounded-full"><PlusIcon size={16} /></Button>
            <Button size="icon" variant="outline" className="rounded-full"><SettingsIcon size={16} /></Button>

          </>
        }
      />
      <Suspense fallback={<Skeleton className="w-full page-width-limit h-[calc(100dvh-128px)] mx-auto" />}>
        <UserGrid workspaceId={workspaceId} searchParams={searchParams} />
      </Suspense>
    </Workspace.Wrapper>
  )
}
export default PersonalWorkspace