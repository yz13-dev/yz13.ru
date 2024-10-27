import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@yz13/mono/components/sidebar"
import Header from "./header"
import { BriefcaseIcon, CalendarIcon, CheckCircleIcon } from "lucide-react"
import Footer from "./footer"
import Link from "next/link"
import action from "@/actions/works/action"


const AppSidebar = async () => {
  const works = await action({})
  const data = works?.data ?? []
  const favorites = data.filter(work => work.favorite)
  return (
    <Sidebar collapsible="icon">
      <Header />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>

              <SidebarMenuItem>
                <SidebarMenuButton>
                  <CheckCircleIcon size={16} />
                  <span>My tasks</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton>
                  <CalendarIcon size={16} />
                  <span>Today</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/all-works">
                    <BriefcaseIcon size={16} />
                    <span>Works</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>


            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Favorites</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {
                favorites
                  .map(work => {
                    return <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href={`/works/${work.id}`}>
                          <BriefcaseIcon size={16} />
                          <span>{work.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  })
              }
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <Footer />
    </Sidebar>

  )
}
export { AppSidebar }
