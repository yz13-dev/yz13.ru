import Dock from "./dock"
import PersonalWorkspace from "./personal-workspace"

export type SearchParams = {
  workspace?: string
  note?: string
  index?: string
}

type PageProps = {
  searchParams: SearchParams
}

const page = async (props: PageProps) => {
  const searchParams = await props.searchParams;
  return (
    <>
      <PersonalWorkspace searchParams={searchParams} />
      <Dock />
    </>
  )
}
export default page
