"use client";
import { ru } from "date-fns/locale";
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  GlobeIcon,
  VideoIcon,
} from "lucide-react";
import { Badge } from "mono/components/badge";
import { Button } from "mono/components/button";
import { Calendar } from "mono/components/calendar";
import { Input } from "mono/components/input";
import { Separator } from "mono/components/separator";
import { Textarea } from "mono/components/textarea";
import { cn } from "yz13/cn";

export default function form({ className = "" }: { className?: string }) {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return (
    <div className={cn("max-w-2xl flex flex-col w-full mx-auto", className)}>
      <div className="w-full gap-5 flex flex-col p-6">
        <span className="text-xl font-medium">Название</span>
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
              <span className="text-sm text-muted-foreground">12.10.2025</span>
            </Badge>
          </li>
          <li className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="max-w-full w-full [&>svg]:size-4"
            >
              <ClockIcon size={16} className="shrink-0 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">10:00</span>
            </Badge>
          </li>
          <li className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="max-w-full w-full [&>svg]:size-4"
            >
              <VideoIcon size={16} className="shrink-0 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Google Meet</span>
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
      <div className="w-full divide-y">
        <div className="flex *:p-6 divide-x md:flex-row flex-col-reverse">
          <div className="md:w-2/3 w-full space-y-6">
            <Calendar className="p-0" locale={ru} />
            <Separator />
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-sm text-muted-foreground">Имя *</span>
                <Input />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-muted-foreground">Почта *</span>
                <Input />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-muted-foreground">
                  Заметка к созвону
                </span>
                <Textarea />
              </div>
            </div>
          </div>
          <div className="md:w-1/3 overflow-auto w-full flex md:flex-col flex-row gap-1.5 md:*:w-full *:w-fit">
            <Button variant="outline">10:00</Button>
            <Button variant="outline">12:00</Button>
            <Button variant="outline">14:00</Button>
            <Button variant="outline">16:00</Button>
            <Button variant="outline">18:00</Button>
            <Button variant="outline">20:00</Button>
            <Button variant="outline">22:00</Button>
          </div>
        </div>
        <div className="w-full flex justify-between px-6 py-3">
          <Button variant="ghost">
            <ArrowLeftIcon size={16} />
            Вернуться
          </Button>
          <Button>Подтвердить</Button>
        </div>
      </div>
    </div>
  );
}
