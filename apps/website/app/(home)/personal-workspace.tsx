import { PlusIcon, SettingsIcon } from "lucide-react"
import { Button } from "mono/components/button"
import { Skeleton } from "mono/components/skeleton"
import { Suspense } from "react"
import { UserGrid } from "./grid"
import { SearchParams } from "./page"
import { Workspace } from "./workspace"


type PageProps = {
  searchParams: SearchParams
}
const PersonalWorkspace = async ({ searchParams }: PageProps) => {
  return (
    <Workspace.Wrapper>
      <Workspace.Header
        actions={
          <>
            <Button size="icon" variant="outline" className="rounded-full"><PlusIcon size={16} /></Button>
            <Button size="icon" variant="outline" className="rounded-full"><SettingsIcon size={16} /></Button>

          </>
        }
      />
      <Suspense fallback={<Skeleton className="w-full page-width-limit h-[calc(100dvh-128px)] mx-auto" />}>
        <UserGrid searchParams={searchParams} />
      </Suspense>
    </Workspace.Wrapper>
  )
}
export default PersonalWorkspace