import { Header } from "@/components/header";
import User from "./(public)/user";
import Nav from "./nav";

const PublicHeader = ({ className = "" }: { className?: string }) => {
  return (
    <Header className={className}>
      <Header.Left></Header.Left>
      <Header.Center></Header.Center>
      <Header.Right>
        <Nav />
        <User />
      </Header.Right>
    </Header>
  );
};

export default PublicHeader;
