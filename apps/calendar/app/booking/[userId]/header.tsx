"use client";
import { format, parse } from "date-fns";
import { CalendarIcon, ClockIcon, GlobeIcon, VideoIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "mono/components/avatar";
import { Badge } from "mono/components/badge";
import { useQueryState } from "nuqs";
import { avatarURL } from "rest-api/lib/avatar-url";
import { UserObject } from "rest-api/types/user";

export default function Header({ user }: { user: UserObject }) {
  const [date] = useQueryState("date");
  const [time] = useQueryState("time");
  const defaultDate = format(new Date(), "yyyy-MM-dd");
  const targetDate = date ?? defaultDate;
  const parsedDate = parse(targetDate, "yyyy-MM-dd", new Date());
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return (
    <div className="w-full gap-5 flex flex-col p-6">
      <div className="flex flex-row items-center gap-2">
        <Avatar>
          <AvatarImage src={avatarURL(user.avatar_url) ?? undefined} />
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
              {format(parsedDate, "dd.MM.yyyy")}
            </span>
          </Badge>
        </li>
        <li className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className="max-w-full w-full [&>svg]:size-4"
          >
            <ClockIcon size={16} className="shrink-0 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {time ?? "Не выбрано"}
            </span>
          </Badge>
        </li>
        <li className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className="max-w-full w-full [&>svg]:size-4"
          >
            <VideoIcon size={16} className="shrink-0 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">---</span>
          </Badge>
        </li>
        <li className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className="max-w-full w-full [&>svg]:size-4"
          >
            <GlobeIcon size={16} className="shrink-0 text-muted-foreground" />
            <span className="text-sm text-muted-foreground line-clamp-1">
              {tz}
            </span>
          </Badge>
        </li>
      </ul>
    </div>
  );
}
