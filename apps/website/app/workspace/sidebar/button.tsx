import Link, { LinkProps } from "next/link";
import { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";
import { cn } from "yz13/cn";

const Icon = ({
  children,
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "size-8 rounded-full flex items-center justify-center transition-colors",
        "border border-transparent",
        "group-data-[variant=secondary]:bg-transparent",
        "group-data-[variant=default]:bg-neutral-200",
        "group-hover:!bg-neutral-200 group-hover:border-yz-neutral-200",
        className,
      )}
    >
      {children}
    </span>
  );
};

const Text = ({
  children,
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <span className={cn("text-sm 2xl:!inline-block hidden", className)}>
      {children}
    </span>
  );
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactElement<typeof Icon> | ReactElement<typeof Text>[];
  variant?: "default" | "secondary";
};

const Button = ({
  children,
  variant = "secondary",
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      data-variant={variant}
      className={cn("flex items-center gap-2 group text-foreground", className)}
      {...props}
    >
      {children}
    </button>
  );
};

type LinkButtonProps = LinkProps & {
  className?: string;
  children: ReactElement<typeof Icon> | ReactElement<typeof Text>[];
  variant?: "default" | "secondary";
};

const LinkButton = ({
  children,
  variant = "secondary",
  className = "",
  ...props
}: LinkButtonProps) => {
  return (
    <Link
      data-variant={variant}
      className={cn("flex items-center gap-2 group text-foreground", className)}
      {...props}
    >
      {children}
    </Link>
  );
};

export { Button, Icon, LinkButton, Text };
