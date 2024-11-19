import { Logo } from "@/components/logo"

const ListWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-2">
      {children}
    </div>
  )
}
const Title = ({ children }: { children: string }) => {
  return <span className="text-sm font-medium">{children}</span>
}
const List = ({ children }: { children: React.ReactNode }) => {
  return <ul className="*:text-sm space-y-1">{children}</ul>
}
const Item = ({ children }: { children: React.ReactNode }) => {
  return (
    <li className="hover:underline">{children}</li>
  )
}
const Footer = () => {
  return (
    <footer className="page-width-limit w-full h-fit pb-6 flex items-start justify-between">
      <Logo className="size-6" />
      <ListWrapper>
        <Title>Products</Title>
        <List>
          <Item>Website</Item>
          <Item>Workspace</Item>
          <Item>API</Item>
        </List>
      </ListWrapper>
      <ListWrapper>
        <Title>Brand</Title>
        <List>
          <Item>Logo</Item>
          <Item>Colors</Item>
          <Item>Typography</Item>
        </List>
      </ListWrapper>
      <ListWrapper>
        <Title>Resources</Title>
        <List>
          <Item>Icons</Item>
          <Item>Fonts</Item>
          <Item>Images</Item>
        </List>
      </ListWrapper>
      <ListWrapper>
        <Title>Social</Title>
        <List>
          <Item>Twitter</Item>
          <Item>Telegram</Item>
          <Item>GitHub</Item>
        </List>
      </ListWrapper>

    </footer>
  )
}
export default Footer
