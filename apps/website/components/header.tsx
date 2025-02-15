import { ReactNode } from "react";
import { cn } from "yz13/cn";

type HeaderProps = {
  children?: ReactNode;
  className?: string;
};
const Header = ({ children, className = "" }: HeaderProps) => {
  return (
    <header
      className={cn(
        "w-full justify-between border-x py-4 px-6 h-20 flex items-center gap-4 border-b",
        className,
      )}
    >
      {children}
    </header>
  );
};

export default Header;
