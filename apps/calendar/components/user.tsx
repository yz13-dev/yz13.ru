"use client";
import SignInButton from "@/components/user/sign-in-button";
import UserCircle from "@/components/user/user-circle";
import UserDropdown from "@/components/user/user-dropdown";
import UserWrapper from "@/components/user/user-wrapper";
import { Skeleton } from "@yz13/ui/components/skeleton";

type UserProps = {
    sideOffset?: number;
};
const User = ({ sideOffset }: UserProps) => {
    return (
        <UserWrapper
            authorized={(user) => (
                <UserDropdown user={user} sideOffset={sideOffset}>
                    <UserCircle user={user} className="bg-background" />
                </UserDropdown>
            )}
            unauthorized={<SignInButton href="/login" variant="default" />}
        />
    );
};

export const UserSkeleton = () => {
    return <Skeleton className="size-9 shrink-0 rounded-full" />;
};

export default User;
