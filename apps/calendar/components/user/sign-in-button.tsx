import { LockIcon, LogInIcon } from "lucide-react";
import { Button, type ButtonProps } from "mono/components/button";
import Link from "next/link";
import { cn } from "yz13/cn";

type SignInButtonProps = ButtonProps;
const SignInButton = ({
  href,
  className,
  disabled,
  asSquare = false,
  ...props
}: SignInButtonProps) => {
  const isDisabled = disabled ?? false;
  if (href && !isDisabled) {
    if (asSquare) {
      return (
        <Button
          className={cn("aspect-square", className)}
          size="icon"
          asChild
          disabled={disabled}
          {...props}
          variant="ghost"
        >
          <Link href={href}>
            <LogInIcon size={16} />
          </Link>
        </Button>
      );
    } else
      return (
        <Button className={className} asChild disabled={disabled} {...props}>
          <Link href={href}>Войти</Link>
        </Button>
      );
  }
  return (
    <Button className={className} disabled={disabled} {...props}>
      {isDisabled && <LockIcon size={16} />}
      Войти
    </Button>
  );
};

export default SignInButton;
