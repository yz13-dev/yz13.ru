import { Header } from "@/components/header";
import Nav from "./nav";

const PublicHeader = ({ className = "" }: { className?: string }) => {
  return (
    <Header className={className}>
      <Header.Left></Header.Left>
      <Header.Center></Header.Center>
      <Header.Right>
        <Nav />
      </Header.Right>
    </Header>
  );
};

export default PublicHeader;
