import Background from "@/components/background";
import { CalendarIcon, ExternalLinkIcon, ImageIcon, LogInIcon } from "lucide-react";
import { Button } from "mono/components/button";
import Link from "next/link";
import { cn } from "yz13/cn";

export default function () {
  return (
    <div className="w-full h-dvh">
      <Background className="opacity-40" />
      <main className="w-full px-6 h-[50dvh] max-w-screen-xl mx-auto flex flex-col gap-6 justify-end py-8">
        <div className="space-y-2 *:block">
          <h1 className="text-4xl font-medium">
            Календарь
          </h1>
          <p className="text-xl text-muted-foreground">
            Планируйте свои встречи и собеседования в одном месте
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="w-fit flex items-center gap-2">
            <Button asChild>
              <Link href="/login?continue=https://calendar.yz13.ru">
                <LogInIcon size={16} />
                Войти
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="https://yz13.ru">
                Вернуться на сайт
                <ExternalLinkIcon size={16} />
              </Link>
            </Button>
          </div>
          <span className="text-muted-foreground text-xs">
            Для продолжения необходимо войти в аккаунт
          </span>
        </div>
      </main>
      <div className="w-full h-[50dvh] overflow-hidden">
        <div className={cn(
          "max-w-screen-xl mt-3 md:aspect-video h-full w-full mx-auto border rounded-md divide-y",
          "outline-8 bg-background/80 outline-secondary",
        )}>
          <div className="w-full md:h-fit h-full *:p-4 grid md:divide-x divide-x-0 divide-y md:divide-y-0 md:grid-cols-3 grid-cols-1">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CalendarIcon size={18} />
                <span className="font-medium text-lg text-foreground">
                  Расписание
                </span>
              </div>
              <span className="text-muted-foreground block">
                Вы сами выбираете время когда можно провести встречу.
              </span>
            </div>
            <div className="space-y-2">
              <div className="space-x-2 *:inline">
                <CalendarIcon size={18} className="align-text-top" />
                <span className="font-medium text-lg text-foreground">
                  Создание событий
                </span>
              </div>
              <span className="text-muted-foreground block">
                Созданные события необходимо подвердить перед началом встречи.
              </span>
            </div>
            <div className="space-y-2">
              <div className="space-x-2 *:inline">
                <CalendarIcon size={18} className="align-text-top" />
                <span className="font-medium text-lg text-foreground">
                  Удобная форма для создания событий
                </span>
              </div>
              <span className="text-muted-foreground block">
                Минималистичный интерфейс для создания событий.
              </span>
            </div>
          </div>
          <div className="relative md:flex hidden items-center justify-center w-full overflow-hidden h-full">
            <ImageIcon size={48} className="text-muted-foreground" />
            {/* <Image src={app} placeholder="blur" alt="" fill /> */}
          </div>
        </div>
      </div>
    </div>
  )
}
