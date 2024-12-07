import { SidebarProvider } from "mono/components/sidebar"



const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      {children}
    </SidebarProvider>
  )
}

export default layout
