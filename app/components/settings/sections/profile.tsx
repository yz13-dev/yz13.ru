import useUser from "@/hooks/use-user";
import { Avatar, AvatarFallback, AvatarImage } from "@yz13/ui/avatar";
import { Button } from "@yz13/ui/button";


export default function () {

  const [user] = useUser();
  const avatar_url = user?.avatar_url;
  const username = user?.username || "username";

  return (
    <>
      <div className="w-full flex items-center justify-between">
        <div className="size-16 rounded-full border">
          <Avatar className="size-full">
            <AvatarImage src={avatar_url || undefined} />
            <AvatarFallback>{username.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </div>
        <Button variant="secondary">Изменить</Button>
      </div>
    </>
  )
}
