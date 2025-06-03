import { Button, type ButtonProps } from "mono/components/button";
import { cn } from "yz13/cn";



export default function ({ className = "", variant, size, disabled, ...props }: ButtonProps) {
  return (
    <Button
      size="sm"
      variant="secondary"
      disabled={disabled}
      className={cn("text-xs h-[22px] [&_svg:not([class*='size-'])]:size-3", className)}
      {...props}
    />
  )
}
