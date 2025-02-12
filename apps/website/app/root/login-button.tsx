import UserDropdown from "@/components/user/user-dropdown";
import { auth } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "mono/components/avatar";
import { Button } from "mono/components/button";

const LoginButton = async () => {
  const user = await auth();
  if (user) {
    const img = user.user_metadata?.avatar_url;
    const username = user.user_metadata?.username;
    return (
      <UserDropdown user={user}>
        <Avatar className="border size-12">
          <AvatarImage src={img} />
          <AvatarFallback className="uppercase">
            {username.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      </UserDropdown>
    );
  } else
    return (
      <Button variant="secondary" size="lg" className="rounded-xl">
        Войти
      </Button>
    );
};

export default LoginButton;
