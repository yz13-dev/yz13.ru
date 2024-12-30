import { Logo } from "@/components/logo";
import User from "@/components/user";
import Link from "next/link";
import { cn } from "yz13/cn";
import Nav from "./nav";

type HeaderProps = {
  className?: string;
};
const Header = ({ className = "" }: HeaderProps) => {
  return (
    <header
      className={cn(
        "w-full h-16 px-3 flex items-center justify-between",
        className,
      )}
    >
      <Link href="/" className="flex items-center gap-2">
        <Logo className="size-9" />
        <span className="font-pixel text-xl">YZ13</span>
      </Link>
      <div className="flex items-center gap-2">
        <Nav />
        <User disabled />
      </div>
    </header>
  );
};

export default Header;
