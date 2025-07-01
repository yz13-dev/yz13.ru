import UserWrapper from "@/components/user/user-wrapper";
import { getV1AuthCurrent } from "@yz13/api";

type UserProps = {
  sideOffset?: number;
};
const User = async ({ sideOffset }: UserProps) => {

  const data = await getV1AuthCurrent()

  const user = data

  return (
    <UserWrapper defaultUser={user} sideOffset={sideOffset} />
  );
};

export default User;
