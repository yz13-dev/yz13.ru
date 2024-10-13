import { Aside } from "@/components/layout/aside"
import { Container } from "@/components/layout/container"
import { Content } from "@/components/layout/content"
import { Logo } from "@/components/layout/logo"
import { NavList } from "@/components/nav-list"


const page = () => {
  return (
    <Container>
      <Aside className="space-y-4">
        <Logo />
        <NavList />
      </Aside>
      <Content>
      </Content>
    </Container>
  )
}
export default page
