import Background from "@/app/(root)/components/background";
import { auth } from "@/lib/auth";
import {
  ArrowLeftIcon,
  AtSignIcon,
  ListIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "mono/components/avatar";
import { Badge } from "mono/components/badge";
import { Button } from "mono/components/button";
import { Skeleton } from "mono/components/skeleton";
import Link from "next/link";
import { Suspense } from "react";
import { avatarURL } from "rest-api/lib/avatar-url";
import { getPosition } from "rest-api/positions";
import { getUserById } from "rest-api/user";

type PageProps = {
  params: Promise<{
    userId: string;
  }>;
};
export default async function page({ params }: PageProps) {
  const { userId } = await params;
  const { data: user } = await getUserById(userId);
  const currentUser = await auth();
  const isCurrentUser = currentUser?.id === userId;
  const avatarUrl = user?.avatar_url ? avatarURL(user.avatar_url) : undefined;
  const username = user?.username ?? "Пользователь";
  const role = user?.position ? await getPosition("ru", user.position) : null;
  const email = user?.email ?? "Не указан";
  const identities = user?.identities ?? [];
  return (
    <>
      <Suspense
        fallback={
          <Skeleton className="w-full h-dvh absolute top-0 left-0 rounded-none" />
        }
      >
        <Background className="h-dvh opacity-40" />
      </Suspense>
      <div className="max-w-4xl w-full py-6 px-3 mt-[10%] mx-auto">
        <Button variant="secondary" asChild>
          <Link href="/">
            <ArrowLeftIcon size={16} />
            Главная
          </Link>
        </Button>
      </div>
      <div className="max-w-4xl grid md:grid-cols-3 grid-cols-1 w-full rounded-3xl border mx-auto bg-background/40 divide-x">
        <div className="col-span-1 divide-y">
          <div className="w-full p-3 space-y-3">
            <Avatar className="size-12">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback className="uppercase">
                {username.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="*:block space-y-1">
              <span className="text-2xl font-medium">{username}</span>
              <span className="text-sm text-muted-foreground">
                {role?.data?.label}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm">
                Связаться
              </Button>
              {isCurrentUser && (
                <Button variant="ghost" size="sm">
                  <SettingsIcon size={16} />
                </Button>
              )}
            </div>
          </div>
          <div className="w-full p-3 space-y-3">
            <span className="text-sm block text-muted-foreground">Детали</span>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex items-center gap-1 text-muted-foreground">
                <AtSignIcon size={14} />
                <span className="text-sm">Email</span>
              </div>
              <div className="col-span-2">
                <span className="text-sm">{email}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="w-full p-3 space-y-3">
            <span className="text-sm block text-muted-foreground">123</span>
            <div className="w-full grid md:grid-cols-3 grid-cols-2 gap-3">
              <div className="w-full col-span-2 h-32 flex flex-col justify-between border rounded-lg p-3">
                <div className="flex items-center text-muted-foreground justify-between">
                  <span className="text-sm">Био</span>
                  <ListIcon size={16} />
                </div>
                <span className="text-base text-foreground block mt-auto">
                  123
                </span>
              </div>
              <div className="w-full h-32 border rounded-lg">
                <ul className="*:p-2 divide-y h-full w-full">
                  {identities.map((i) => {
                    const data = i.identity_data;
                    const email = data?.email ?? "";
                    return (
                      <li
                        key={i.provider}
                        className="flex items-center overflow-x-hidden gap-2"
                      >
                        <Badge variant="secondary" className="capitalize">
                          {i.provider}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="line-clamp-1 h-fit max-w-full"
                        >
                          {email}
                        </Badge>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="w-full h-32 border rounded-lg">
                <div className="p-3 w-full h-full flex flex-col justify-between">
                  <div className="flex items-center text-muted-foreground justify-between">
                    <span className="text-sm">Занятость</span>
                    <div className="size-2 relative">
                      <div className="absolute inset-0 size-2 animate-ping rounded-full bg-red-foreground" />
                      <div className="size-2 animate-pulse bg-red-foreground rounded-full" />
                    </div>
                  </div>
                  <span className="text-base text-foreground block">Занят</span>
                </div>
              </div>
              <div className="w-full h-32 border rounded-lg">
                <div className="p-3 w-full h-full flex flex-col justify-between">
                  <div className="flex items-center text-muted-foreground justify-between">
                    <span className="text-sm">Команда</span>
                    <UsersIcon size={16} />
                  </div>
                  <span className="text-base text-foreground block">
                    Нет команды
                  </span>
                </div>
              </div>
              <div className="w-full h-32 border rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
