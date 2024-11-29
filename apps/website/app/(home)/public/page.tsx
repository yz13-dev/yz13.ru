import { SearchParams } from "../page"
import PublicWorkspace from "./public-workspace"


type PageProps = {
  searchParams: SearchParams
}
const page = async (props: PageProps) => {
  const searchParams = await props.searchParams;
  return <PublicWorkspace searchParams={searchParams} />
}
export default page