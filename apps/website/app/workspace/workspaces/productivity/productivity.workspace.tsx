import { Checkbox } from "mono/components/checkbox"
import { SidebarProvider } from "mono/components/sidebar"
import { productivityWorkspace } from "../../const/workspaces"
import ProductivitySidebar from "./sidebar"



const BlogWorkspace = () => {
  const worskace = productivityWorkspace
  return (
    <SidebarProvider>
      <ProductivitySidebar />
      <div className="max-w-screen-md mx-auto p-8 w-full min-h-[calc(100dvh-36px)]">
        <div className="mt-20 w-full h-full space-y-8">
          <h1 className="text-4xl font-semibold">{worskace.name}</h1>
          <div className="w-full h-full space-y-4">
            <div className="w-full h-11 rounded-xl border px-2 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Checkbox className="size-6 rounded-lg" />
                <span className="text-base font-medium text-foreground/80">Task something</span>
              </div>
              <div className="flex items-center gap-2">

              </div>
            </div>

          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default BlogWorkspace