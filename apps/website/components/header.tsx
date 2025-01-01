import { Skeleton } from "mono/components/skeleton";
import Link from "next/link";
import { ReactElement, Suspense } from "react";
import { cn } from "yz13/cn";
import { Logo } from "./logo";
import User from "./user";

type HeaderProps = {
  className?: string;
  children?: ReactElement<typeof Left | typeof Right | typeof Center>[];
};
const Header = ({ children, className = "" }: HeaderProps) => {
  return (
    <header
      className={cn(
        "w-full h-16 px-3 flex items-center justify-between",
        className,
      )}
    >
      {children}
    </header>
  );
};

type SidesProps = {
  className?: string;
  children?: React.ReactNode;
};

const Left = ({
  link,
  children,
  className = "",
}: SidesProps & { link?: string }) => {
  const logoLink = link ? link : "/";
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Link href={logoLink} className="flex items-center gap-2">
        <Logo className="size-9" />
        <span className="font-pixel text-xl">YZ13</span>
      </Link>
      {children}
    </div>
  );
};

const Right = ({ children, className = "" }: SidesProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {children}
      <Suspense fallback={<Skeleton className="size-9 rounded-full" />}>
        <User disabled />
      </Suspense>
    </div>
  );
};

const Center = ({ children, className = "" }: SidesProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>{children}</div>
  );
};

Header.Left = Left;
Header.Right = Right;
Header.Center = Center;

export { Center, Header, Left, Right };
