import { action, Workspace as WorkspaceType } from "@/actions/workspace/get/action"
import { auth } from "@/lib/auth"
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
  const workspace = await action({ userId: user?.id, workspaceId: searchParams?.workspace })
  const workspaceData = workspace?.data as WorkspaceType | null
  if (!workspaceData) return redirect("/public")
  const workspaceId = workspaceData.id as string
  const workspaceName = workspaceData?.name ?? "Untitled"
  return (
    <Workspace.Wrapper>
      <Workspace.Header
        workspace={workspaceData}
      />
      <Suspense fallback={<Skeleton className="w-full page-width-limit h-[calc(100dvh-128px)] mx-auto" />}>
        <UserGrid workspaceId={workspaceId} searchParams={searchParams} />
      </Suspense>
    </Workspace.Wrapper>
  )
}
export default PersonalWorkspace