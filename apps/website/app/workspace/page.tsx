import { Aside } from "@/components/layout/aside"
import { Container } from "@/components/layout/container"
import { Content } from "@/components/layout/content"
import { Logo } from "@/components/layout/logo"
import { NavList } from "@/components/nav-list"
import { Button } from "@yz13/mono/components/button"
import { EllipsisVerticalIcon } from "lucide-react"


const page = () => {
  return (
    <Container>
      <Aside className="space-y-4">
        <Logo />
        <NavList />
      </Aside>
      <Content>
        <div className="w-full h-96 space-y-4 rounded-2xl p-4 border">
          <div className="flex justify-between items-center">
            <div className="size-7 rounded-full bg-yz-neutral-200" />
            <h2 className="text-xl font-medium">Workspace</h2>
            <div className="flex items-center gap-2">
              <Button className="size-7 rounded-full" size="icon" variant="secondary"><EllipsisVerticalIcon size={14} /></Button>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-medium">Workspaces</h3>
            <p className="text-sm text-secondary font-normal">We introducing a workspaces</p>
          </div>
        </div>
      </Content>
    </Container>
  )
}
export default page
