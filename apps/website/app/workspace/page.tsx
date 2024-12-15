import DefaultWorkspace from "./workspaces/default.workspace"


type PageProps = {
  searchParams: {
    id: string
  }
}
const page = ({ searchParams }: PageProps) => {
  const id = searchParams.id
  return (
    <DefaultWorkspace />
  )
}

export default page
