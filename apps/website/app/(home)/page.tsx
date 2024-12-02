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
  const isProd = process.env.NODE_ENV === "production";
  if (isProd) return (
    <div className="w-full h-dvh flex items-center justify-center">
      <span>Realese soon</span>
    </div>
  )
  return (
    <>
      <PersonalWorkspace searchParams={searchParams} />
      <Dock />
    </>
  )
}
export default page
