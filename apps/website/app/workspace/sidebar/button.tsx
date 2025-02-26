import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "mono/components/tooltip";
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
        "size-8 rounded-md flex items-center justify-center transition-colors",
        "border border-transparent",
        "text-foreground/60 group-hover:text-foreground",
        "group-data-[variant=secondary]:bg-transparent",
        "group-data-[variant=default]:bg-neutral-200",
        "group-hover:!bg-neutral-200 group-hover:border-neutral-200",
        className,
      )}
    >
      {children}
    </span>
  );
};

const Text = ({
  children,
  active,
  className = "",
}: {
  active?: boolean;
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <TooltipContent
      side="right"
      className={cn(
        "text-sm 2xl:!inline-block hidden border",
        "text-foreground",
        className,
      )}
    >
      {children}
    </TooltipContent>
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
    <Tooltip delayDuration={100}>
      <TooltipTrigger
        asChild
        className={cn(
          "flex w-full gap-2 group text-foreground border border-transparent hover:bg-background-secondary rounded-md",
          "items-center",
          className,
        )}
      >
        <Link data-variant={variant} {...props}>
          {children}
        </Link>
      </TooltipTrigger>
    </Tooltip>
  );
};

export { Button, Icon, LinkButton, Text };
