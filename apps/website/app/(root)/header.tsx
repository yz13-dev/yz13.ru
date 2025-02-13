import { ReactNode } from "react";

type HeaderProps = {
  children?: ReactNode;
};
const Header = ({ children }: HeaderProps) => {
  return (
    <header className="w-full justify-between border-x py-4 px-6 h-20 flex items-center gap-4 border-b">
      {children}
    </header>
  );
};

export default Header;
