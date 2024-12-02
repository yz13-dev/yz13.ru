import { Suspense } from "react"
import { SearchParams } from "../page"
import Loading from "./loading"
import PublicWorkspace from "./public-workspace"


type PageProps = {
  searchParams: SearchParams
}
const page = async (props: PageProps) => {
  const searchParams = props.searchParams;
  return (
    <>
      <div className="max-w-2xl w-full">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">Date</span>
          <span className="text-base">Today</span>
        </div>
      </div>
    </>
  )
  return (
    <Suspense fallback={<Loading />}>
      <PublicWorkspace searchParams={searchParams} />
    </Suspense>
  )
}
export default page
