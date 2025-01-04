import { LockIcon } from "lucide-react";
import { Button, ButtonProps } from "mono/components/button";

type SignInButtonProps = ButtonProps;
const SignInButton = ({ className, disabled, ...props }: SignInButtonProps) => {
  const isDisabled = disabled ?? false;
  return (
    <Button className={className} disabled={disabled} {...props}>
      {isDisabled && <LockIcon size={16} />}
      Sign In
    </Button>
  );
};

export default SignInButton;
