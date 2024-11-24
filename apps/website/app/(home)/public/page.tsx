import { SearchParams } from "../page"
import PublicWorkspace from "./public-workspace"


type PageProps = {
  searchParams: SearchParams
}
const page = async ({ searchParams }: PageProps) => {
  return <PublicWorkspace searchParams={searchParams} />
}
export default page