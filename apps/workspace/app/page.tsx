import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarGroup } from "@yz13/mono/components/sidebar"

const page = () => {
  return (
    <>
      <Sidebar>
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup></SidebarGroup>
          <SidebarGroup></SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
      <main className="w-full h-dvh"></main>
    </>
  )
}

export default page
