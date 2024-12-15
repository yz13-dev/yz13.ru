import { NuqsAdapter } from "nuqs/adapters/next"
import Header from "./header"
import WorkspacesContainer from "./workspaces/container"


type PageProps = {
  searchParams: {
    id: string
  }
}
const page = ({ searchParams }: PageProps) => {
  const id = searchParams.id
  return (
    <NuqsAdapter>
      <Header />
      <WorkspacesContainer providedId={id} />
    </NuqsAdapter>
  )
}

export default page
