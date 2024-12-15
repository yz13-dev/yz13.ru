import { NuqsAdapter } from "nuqs/adapters/next"
import Header from "./header"

type LayoutProps = {
  children: React.ReactNode
}
const layout = ({ children }: LayoutProps) => {
  return (
    <NuqsAdapter>
      <Header />
      {children}
    </NuqsAdapter>
  )
}

export default layout