import { Skeleton } from "mono/components/skeleton"
import { Workspace } from "../workspace"



const Loading = () => {
  return (
    <Workspace.Wrapper>
      <header className="px-8 pt-8 max-w-screen-2xl mx-auto w-full h-fit flex items-center justify-between gap-4">
        <Skeleton className="w-12 h-8" />
        <Skeleton className="w-12 h-8" />
      </header>
      <Skeleton className="w-full page-width-limit h-[calc(100dvh-128px)] mx-auto" />
    </Workspace.Wrapper>
  )
}

export default Loading