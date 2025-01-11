"use client";
import SignInButton from "@/components/user/sign-in-button";
import UserCircle from "@/components/user/user-circle";
import UserDropdown from "@/components/user/user-dropdown";
import UserWrapper from "@/components/user/user-wrapper";

const User = () => {
  return (
    <UserWrapper
      authorized={(user) => (
        <UserDropdown user={user}>
          <UserCircle user={user} />
        </UserDropdown>
      )}
      unauthorized={
        <SignInButton
          href="/login"
          className="rounded-full"
          variant="secondary"
        />
      }
    />
  );
};

export default User;
