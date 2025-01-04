import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";
import { cn } from "yz13/cn";
import { Logo } from "./logo";

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
  logo,
  title,
}: SidesProps & {
  title?: string;
  link?: string;
  logo?: { dark: string; light: string };
}) => {
  const logoLink = link ? link : "/";
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Link href={logoLink} className="flex items-center gap-2">
        {logo ? (
          <div className={cn("relative size-6", className)}>
            <Image
              fill
              className="light-mode-image"
              src={logo.light}
              alt="YZ13-LOGO"
            />
            <Image
              fill
              className="dark-mode-image"
              src={logo.dark}
              alt="YZ13-LOGO"
            />
          </div>
        ) : (
          <Logo className="size-9" />
        )}
        <span className="font-pixel text-xl">{title ?? "YZ13"}</span>
      </Link>
      {children}
    </div>
  );
};

const Right = ({ children, className = "" }: SidesProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>{children}</div>
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
