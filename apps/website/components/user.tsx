"use client";
import SignInButton from "@/components/user/sign-in-button";
import UserCircle from "@/components/user/user-circle";
import UserDropdown from "@/components/user/user-dropdown";
import UserWrapper from "@/components/user/user-wrapper";

type UserProps = {
  sideOffset?: number;
};
const User = ({ sideOffset }: UserProps) => {
  return (
    <UserWrapper
      authorized={(user) => (
        <UserDropdown user={user} sideOffset={sideOffset}>
          <UserCircle user={user} />
        </UserDropdown>
      )}
      unauthorized={<SignInButton href="/login" variant="default" />}
    />
  );
};

export default User;
