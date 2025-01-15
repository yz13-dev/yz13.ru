import User from "@/app/user";
import { Header } from "./header";

const PublicHeader = ({ className = "" }: { className?: string }) => {
  return (
    <Header className={className}>
      <Header.Left></Header.Left>
      <Header.Center></Header.Center>
      <Header.Right>
        <User />
      </Header.Right>
    </Header>
  );
};

export default PublicHeader;
