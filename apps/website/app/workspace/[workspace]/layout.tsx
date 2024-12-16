import { NuqsAdapter } from "nuqs/adapters/next"
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
      <Header workspace={id} />
      {children}
    </NuqsAdapter>
  )
}

export default layout