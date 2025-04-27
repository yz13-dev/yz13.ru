import Footer from "@/components/footer";
import { Logo } from "@/components/logo";
import User, { UserSkeleton } from "@/components/user";
import { PlusIcon, SearchIcon } from "lucide-react";
import { Badge } from "mono/components/badge";
import { Button } from "mono/components/button";
import { Separator } from "mono/components/separator";
import { Suspense } from "react";
import DayInfo from "./day-info";
import DaysRow from "./days-row";
import HeaderTime from "./header-time";

export default function page() {
  const events = Array.from({ length: 8 }).map((_, i) => i);
  return (
    <>
      <header className="md:px-[2.5%] px-[5%] md:pt-[2.5%] pt-[5%] calendar-container w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo size={{ width: 48, height: 48 }} type="only-icon" />
          <HeaderTime />
        </div>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="outline">
            <PlusIcon size={16} />
          </Button>
          <Button size="icon" variant="outline">
            <SearchIcon size={16} />
          </Button>
          {/* <User /> */}
          <Suspense fallback={<UserSkeleton />}>
            <User />
          </Suspense>
        </div>
      </header>
      <div className="md:p-[2.5%] p-[5%] calendar-container w-full flex md:flex-row flex-col-reverse gap-6 md:*:w-1/2 *:w-full min-h-dvh">
        <div className="space-y-6">
          <DayInfo />
          <Separator />
          <div className="space-y-6">
            <div className="space-y-0">
              <span className="text-lg font-medium block">Расписание</span>
              <span className="text-sm text-muted-foreground">
                Время когда другие пользователи могут запланировать с вами
                созвон.
              </span>
            </div>
            <div className="w-full h-fit p-8 border rounded-xl border-dashed flex flex-col items-center justify-center gap-4">
              <span className="text-sm text-muted-foreground">
                Нет расписания
              </span>
              <Button>Создать расписание</Button>
            </div>
            <ul className="w-full grid md:grid-cols-3 grid-cols-2 gap-6">
              <li className="flex flex-row gap-3">
                <span className="text-sm text-muted-foreground">Пн:</span>
                <div className="flex flex-row items-center justify-center gap-2">
                  <Badge variant="secondary">10:00</Badge>
                  <Separator className="max-w-2" />
                  <Badge variant="secondary">18:00</Badge>
                </div>
              </li>
              <li className="flex flex-row gap-3">
                <span className="text-sm text-muted-foreground">Вт:</span>
                <div className="flex flex-row items-center justify-center gap-2">
                  <Badge variant="secondary">10:00</Badge>
                  <Separator className="max-w-2" />
                  <Badge variant="secondary">18:00</Badge>
                </div>
              </li>
              <li className="flex flex-row gap-3">
                <span className="text-sm text-muted-foreground">Ср:</span>
                <div className="flex flex-row items-center justify-center gap-2">
                  <Badge variant="secondary">10:00</Badge>
                  <Separator className="max-w-2" />
                  <Badge variant="secondary">18:00</Badge>
                </div>
              </li>
              <li className="flex flex-row gap-3">
                <span className="text-sm text-muted-foreground">Чт:</span>
                <div className="flex flex-row items-center justify-center gap-2">
                  <Badge variant="secondary">10:00</Badge>
                  <Separator className="max-w-2" />
                  <Badge variant="secondary">18:00</Badge>
                </div>
              </li>
              <li className="flex flex-row gap-3">
                <span className="text-sm text-muted-foreground">Пт:</span>
                <div className="flex flex-row items-center justify-center gap-2">
                  <Badge variant="secondary">10:00</Badge>
                  <Separator className="max-w-2" />
                  <Badge variant="secondary">18:00</Badge>
                </div>
              </li>
            </ul>
          </div>
          <Separator />
          <div className="space-y-6">
            <div className="space-y-0">
              <span className="text-lg font-medium block">Созвоны</span>
              <span className="text-sm text-muted-foreground">
                Созвоны запланированные вами или другими пользователи.
              </span>
            </div>
            <div className="w-full h-fit p-8 border rounded-xl border-dashed flex flex-col items-center justify-center gap-4">
              <span className="text-sm text-muted-foreground">
                Нет созвонов
              </span>
            </div>
            <ul className="w-full grid md:grid-cols-2 grid-cols-1 gap-6">
              <li className="flex flex-col gap-1 w-full">
                <div className="flex items-center w-full justify-between">
                  <span className="text-sm line-clamp-2 text-foreground">
                    Обсуждение с Евгением
                  </span>
                  <span className="text-sm text-muted-foreground">10:00</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Заметка от Евгения: ...
                </span>
              </li>
              <li className="flex flex-col gap-1 w-full">
                <div className="flex items-center w-full justify-between">
                  <span className="text-sm line-clamp-2 text-foreground">
                    Обсуждение с Борисом
                  </span>
                  <span className="text-sm text-muted-foreground">10:00</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Заметка от Бориса: ...
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <DaysRow className="h-fit shrink-0 marquee" />
          <ul className="w-full h-fit space-y-3 py-3">
            {events.slice(0, 9).map((_, i) => {
              return (
                <li className="w-full" key={i}>
                  <div className="w-full p-3 flex flex-row justify-between items-start rounded-xl hover:bg-background-secondary border transition-colors">
                    <div className="flex flex-col gap-1">
                      <span className="text-base font-medium">
                        Событие: 123
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Описание события
                      </span>
                    </div>
                    <span className="text-base font-medium">12:00</span>
                  </div>
                </li>
              );
            })}
            {events.length > 9 && (
              <li className="w-full">
                <Button
                  variant="ghost"
                  className="w-full h-10 flex items-center justify-center"
                >
                  <span className="text-sm text-muted-foreground">
                    Показать еще
                  </span>
                </Button>
              </li>
            )}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}
