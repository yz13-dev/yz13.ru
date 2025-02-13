import { Logo } from "@/components/logo";
import { cn } from "yz13/cn";

const ListWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col gap-2">{children}</div>;
};
const Title = ({ children }: { children: string }) => {
  return <span className="text-sm font-medium">{children}</span>;
};
const List = ({ children }: { children: React.ReactNode }) => {
  return <ul className="*:text-sm text-secondary space-y-1">{children}</ul>;
};
const Item = ({ children }: { children: React.ReactNode }) => {
  return (
    <li className="hover:underline hover:text-foreground transition-colors">
      {children}
    </li>
  );
};
const Footer = ({ className = "" }: { className?: string }) => {
  return (
    <footer
      className={cn(
        "w-full h-fit pb-6 flex items-start justify-between",
        className,
      )}
    >
      <Logo className="size-8 mr-6" />
      <div className="w-full max-w-5xl mx-auto flex items-start justify-between pt-1.5">
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
      </div>
    </footer>
  );
};
export default Footer;
