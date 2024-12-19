import { NuqsAdapter } from "nuqs/adapters/next"
import UserContextProvider from "../contexts/user.context"
import Dock from "../dock"
import WorkspacesContainer from "../workspaces/container"

type LayoutProps = {
  children: React.ReactNode
  params: {
    workspace: string
  }
}
const layout = ({ children, params }: LayoutProps) => {
  const id = params.workspace
  return (
    <NuqsAdapter>
      <UserContextProvider>
        <WorkspacesContainer>
          {children}
        </WorkspacesContainer>
        <Dock id={id} />
      </UserContextProvider>
    </NuqsAdapter>
  )
}

export default layout