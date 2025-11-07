import { Avatar, AvatarFallback, AvatarImage } from "@yz13/ui/avatar";
import { Badge } from "@yz13/ui/badge";
import { Button } from "@yz13/ui/button";
import { Separator } from "@yz13/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { socials_icons } from "../const/socials";
import { Json } from "../schemas/link.schema";
import { avatar } from "../utils/cdn";
import Actions from "./actions";
import LinksList from "./links-list";



export default function ({ data, id }: { data: Json, id: string }) {

  const user = data.user;

  const socials = data.socials;
  const socialsKeys = Object.keys(socials || {});

  const items = data.items;

  return (
    <div className="w-full md:max-w-sm max-w-full md:max-h-fit max-h-full mx-auto rounded-4xl bg-card border md:overflow-y-visible overflow-y-auto">
      {/* 640x360 */}
      <div className="w-full items-start p-6 justify-between flex gap-4">
        <Avatar className="size-24 rounded-3xl [&>*]:rounded-2xl bg-background border-2">
          <AvatarImage src={user.avatar_url ? avatar(id, user.avatar_url) : undefined} />
          <AvatarFallback className="text-4xl font-medium">{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-row items-center gap-2">
          {
            !!socialsKeys.length &&
            socialsKeys
              .map(social => {
                if (!socials) return null;
                const item = socials[social as keyof typeof socials];
                const icon = socials_icons[social as keyof typeof socials_icons];
                if (!item) return null;
                if (!item.url) return (
                  <Button key={social} variant="secondary" className="p-1 aspect-square">
                    <Image src={icon} width={20} height={20} className="size-6" alt={social} unoptimized />
                  </Button>
                )
                return (
                  <Button key={social} variant="secondary" className="p-1 aspect-square" asChild>
                    <Link href={item.url}>
                      <Image src={icon} width={20} height={20} className="size-6" alt={social} unoptimized />
                    </Link>
                  </Button>
                )
              })
          }
        </div>
      </div>
      <div className="w-full px-6 pb-6 space-y-3">
        <div className="flex flex-col gap-3">
          {
            data.profession &&
            <Badge variant="secondary">{data.profession}</Badge>
          }
          <div className="*:block space-y-1">
            <h1 className="text-2xl font-semibold">{user.fullname ? user.fullname : (user.username || "Username")}</h1>
            {
              user.fullname &&
              <span className="text-base font-medium text-muted-foreground">@{user.username}</span>
            }
          </div>
        </div>
        {user.description && <p className="text-lg block text-muted-foreground">{user.description}</p>}
      </div>
      {
        data.actions &&
        <Actions actions={data.actions} />
      }
      {
        !!items.length &&
        <>
          <Separator />
          <LinksList links={items} />
        </>
      }
    </div>
  )
}
