import { Logo } from "@/components/logo";
import User from "@/components/user";
import Link from "next/link";
import { cn } from "yz13/cn";

const Header = ({ className = "" }: { className?: string }) => {
  return (
    <header
      className={cn(
        "w-full h-12 flex items-center justify-between px-4",
        className,
      )}
    >
      <div>
        <Link href="/">
          <Logo size={{ width: 32, height: 32 }} />
        </Link>
      </div>
      <div>
        <User />
      </div>
    </header>
  );
};

export default Header;
