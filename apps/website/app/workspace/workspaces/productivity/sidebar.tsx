import { Sidebar } from "mono/components/sidebar"
import ProductivitySidebarHeader from "./sidebar-header"



const ProductivitySidebar = ({ workspace }: { workspace?: any }) => {
  return (
    <Sidebar
      className="rounded-xl h-[calc(100dvh-36px)] mt-9"
      collapsible="icon"
    >
      <ProductivitySidebarHeader workspace={workspace} />
    </Sidebar>
  )
}

export default ProductivitySidebar