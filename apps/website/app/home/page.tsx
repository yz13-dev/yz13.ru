import dynamic from "next/dynamic"
import Header from "./header"
import WorkspacesContainer from "./workspaces/container"
const LiveTime = dynamic(() => import("./live-time"), {
  ssr: false
})

const page = () => {
  return (
    <>
      <Header />
      <WorkspacesContainer />
    </>
  )
}

export default page
