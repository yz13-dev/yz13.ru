import { NuqsAdapter } from "nuqs/adapters/next"
import UserContextProvider from "../contexts/user.context"
import Header from "../header"

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
        <Header workspace={id} />
        {children}
      </UserContextProvider>
    </NuqsAdapter>
  )
}

export default layout