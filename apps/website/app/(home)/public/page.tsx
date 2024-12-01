import { Suspense } from "react"
import { SearchParams } from "../page"
import PublicWorkspace from "./public-workspace"
import Loading from "./loading"


type PageProps = {
  searchParams: SearchParams
}
const page = async (props: PageProps) => {
  const searchParams = props.searchParams;
  return (
    <Suspense fallback={<Loading />}>
      <PublicWorkspace searchParams={searchParams} />
    </Suspense>
  )
}
export default page
