import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  " inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-foreground disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background hover:bg-foreground/90",
        destructive:
          "bg-red-background text-red-foreground hover:bg-red-background/90",
        outline:
          "border bg-background hover:bg-neutral-200 hover:text-foreground",
        secondary: "bg-neutral-200 text-foreground/70 hover:bg-neutral-200/80",
        ghost: "hover:bg-neutral-200 hover:text-foreground",
        link: "text-foreground underline-offset-4 hover:underline",
      },
      rounded: {
        default: "rounded-lg",
        full: "rounded-full",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      rounded: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      rounded = "default",
      size,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className, rounded }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
