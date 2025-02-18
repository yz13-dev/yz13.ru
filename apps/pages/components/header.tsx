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
        "w-full justify-between border-x z-10 flex items-center gap-4",
        "h-14 py-4 px-6",
        "border-b bg-background",
        className,
      )}
    >
      {children}
    </header>
  );
};

export default Header;
