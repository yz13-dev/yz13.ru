import PersonalWorkspace from "./personal-workspace"

export type SearchParams = {
  workspace?: string
  note?: string
  index?: string
}

type PageProps = {
  searchParams: SearchParams
}

const page = async ({ searchParams }: PageProps) => {
  return <PersonalWorkspace searchParams={searchParams} />
}
export default page
