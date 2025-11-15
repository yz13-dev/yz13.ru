import { cn } from "@yz13/ui/cn";
import type { ComponentProps } from "react";

export type IconProps = ComponentProps<"svg">
export default function Icon({ className, children, role = "img", ...props }: IconProps) {
  return (
    <svg
      className={cn("", className)}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      role={role}
      {...props}
    >
      {children}
    </svg>
  )
}
