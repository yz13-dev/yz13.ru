import UserWrapper from "@/components/user/user-wrapper";
import { getV1AuthCurrent } from "@yz13/api";

type UserProps = {
  sideOffset?: number;
  className?: string;
};
const User = async ({ className = "", sideOffset }: UserProps) => {

  const data = await getV1AuthCurrent()

  const user = data

  return (
    <UserWrapper defaultUser={user} sideOffset={sideOffset} className={className} />
  );
};

export default User;
