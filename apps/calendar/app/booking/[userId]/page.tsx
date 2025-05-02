import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  GlobeIcon,
  VideoIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "mono/components/avatar";
import { Badge } from "mono/components/badge";
import { Button } from "mono/components/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getUserAvailability } from "rest-api/calendar/schedule";
import { getUserById } from "rest-api/user";
import { cn } from "yz13/cn";
import Form from "./form";

type PageProps = {
  params: Promise<{
    userId: string;
  }>;
  searchParams: Promise<{
    date?: string;
  }>;
};
export default async function page({ params, searchParams }: PageProps) {
  const { userId } = await params;
  const search = await searchParams;
  const { data: user } = await getUserById(userId);
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (!user) return notFound();
  const date = search.date;
  const { data: availability } = await getUserAvailability(userId, date);
  return (
    <>
      <div className="max-w-2xl w-full mx-auto px-6 space-y-6 mt-[10%]">
        <Button variant="outline" asChild>
          <Link href="/">
            <ArrowLeftIcon size={16} />
            Вернуться
          </Link>
        </Button>
        <div className="space-y-3">
          <h1 className="text-2xl font-medium">Новый созвон</h1>
          <p className="text-sm text-muted-foreground">
            Создайте новый созвон, чтобы обговорить ваши планы или подробности о
            проекте.
          </p>
        </div>
      </div>
      <div
        className={cn(
          "max-w-2xl flex flex-col w-full mx-auto",
          "rounded-3xl border bg-background-secondary divide-y mt-12",
        )}
      >
        <div className="w-full gap-5 flex flex-col p-6">
          <span className="text-xl font-medium">Название</span>
          <div className="flex flex-row items-center gap-2">
            <Avatar>
              <AvatarImage src={user.avatar_url ?? ""} />
              <AvatarFallback className="uppercase">
                {(user.username ?? "").slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">
              {user.username ?? "Пользователь"}
            </span>
          </div>
          <ul className="gap-3 grid md:grid-cols-4 grid-cols-2">
            <li className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="max-w-full w-full [&>svg]:size-4"
              >
                <CalendarIcon
                  size={16}
                  className="shrink-0 text-muted-foreground"
                />
                <span className="text-sm text-muted-foreground">
                  12.10.2025
                </span>
              </Badge>
            </li>
            <li className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="max-w-full w-full [&>svg]:size-4"
              >
                <ClockIcon
                  size={16}
                  className="shrink-0 text-muted-foreground"
                />
                <span className="text-sm text-muted-foreground">10:00</span>
              </Badge>
            </li>
            <li className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="max-w-full w-full [&>svg]:size-4"
              >
                <VideoIcon
                  size={16}
                  className="shrink-0 text-muted-foreground"
                />
                <span className="text-sm text-muted-foreground">
                  Google Meet
                </span>
              </Badge>
            </li>
            <li className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="max-w-full w-full [&>svg]:size-4"
              >
                <GlobeIcon
                  size={16}
                  className="shrink-0 text-muted-foreground"
                />
                <span className="text-sm text-muted-foreground line-clamp-1">
                  {tz}
                </span>
              </Badge>
            </li>
          </ul>
        </div>
        <Form availability={availability ?? undefined} />
      </div>
      <footer className="max-w-2xl flex flex-row justify-center w-full mx-auto p-6 mt-12">
        <span className="text-base text-muted-foreground text-center">
          YZ13
        </span>
      </footer>
    </>
  );
}
