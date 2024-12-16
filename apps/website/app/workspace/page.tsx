import { NuqsAdapter } from "nuqs/adapters/next"
import Header from "./header"
import DefaultWorkspace from "./workspaces/default.workspace"


const page = () => {
  return (
    <NuqsAdapter>
      <Header />
      <DefaultWorkspace />
    </NuqsAdapter>
  )
}

export default page
