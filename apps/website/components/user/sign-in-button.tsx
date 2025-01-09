import { LockIcon } from "lucide-react";
import { Button, ButtonProps } from "mono/components/button";
import Link from "next/link";

type SignInButtonProps = ButtonProps & {
  href?: string;
};
const SignInButton = ({
  href,
  className,
  disabled,
  ...props
}: SignInButtonProps) => {
  const isDisabled = disabled ?? false;
  if (href && !isDisabled) {
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
