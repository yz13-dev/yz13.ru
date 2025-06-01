import { Logo } from "@/components/logo";
import { auth } from "@/lib/auth";
import { ChevronRightIcon, ExternalLinkIcon, SearchIcon, XIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "mono/components/avatar";
import { Button } from "mono/components/button";
import { Input } from "mono/components/input";
import { avatarURL } from "rest-api/lib/avatar-url";

export default async function page() {
  const user = await auth()
  const avatarUrl = user?.avatar_url ? avatarURL(user.avatar_url) : undefined;
  const username = user?.username ?? "Пользователь";
  return (
    <>
      <header className="py-2 h-14 px-6 w-full flex gap-4 items-center border-b justify-start">
        <Logo size={{ height: 36, width: 54 }} type="only-icon" />
        <span className="text-muted-foreground text-xl font-medium">/</span>
        <div className="flex items-center gap-2">
          <Avatar className="size-9">
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>{username.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{username}</span>
            <span className="text-xs text-muted-foreground">
              {user?.email}
            </span>
          </div>
        </div>
        <span className="text-muted-foreground text-xl font-medium">/</span>
        <div className="flex flex-col">
          <span className="text-sm font-medium">Repository</span>
          <span className="text-xs text-muted-foreground">
            yz13-dev/yz13
          </span>
        </div>
      </header>
      <div className="h-[calc(100dvh-56px)] flex divide-x w-full">
        <aside className="max-w-xs w-full divide-y h-full">
          <div className="w-full h-8 px-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Button variant="ghost" className="h-6" size="sm">
                <ChevronRightIcon />
                Структура
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" className="size-6" size="sm"><ExternalLinkIcon size={14} /></Button>
              <Button variant="ghost" className="size-6" size="sm"><SearchIcon size={14} /></Button>
            </div>
          </div>
          <div className="w-full py-2 h-full space-y-2">
            <div className="px-2">
              <Input placeholder="Поиск" className="w-full" />
            </div>
          </div>
        </aside>
        <div className="w-full h-full divide-y">
          <div className="w-full h-8 flex *:rounded-none items-center gap-2">
            <div className="flex h-8 pr-3 group hover:bg-secondary items-center">
              <Button variant="ghost" size="ghost" className="size-4 mx-1 opacity-0 group-hover:opacity-100"><XIcon className="size-3" /></Button>
              <span className="text-sm text-foreground">file.ts</span>
            </div>
          </div>
          <div className="w-full h-full"></div>
        </div>
      </div>
    </>
  )
}
