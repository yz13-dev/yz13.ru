import { Sidebar } from "mono/components/sidebar"
import ProductivitySidebarHeader from "./sidebar-header"



const ProductivitySidebar = () => {
  return (
    <Sidebar
      className="rounded-xl h-[calc(100dvh-36px)] mt-9 bg-background-back !border"
      collapsible="icon"
    >
      <ProductivitySidebarHeader />
    </Sidebar>
  )
}

export default ProductivitySidebar