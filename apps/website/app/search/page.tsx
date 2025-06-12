import { Logo } from "@/components/logo";
import User from "@/components/user";
import { Button } from "@yz13/ui/components/button";
import { Input } from "@yz13/ui/components/input";
import { Skeleton } from "@yz13/ui/components/skeleton";
import Link from "next/link";
import { Suspense } from "react";

export default function page() {
  return (
    <>
      <header className="w-full h-fit py-3 space-y-4 bg-background sticky top-0 z-10 border-b">
        <div className="max-w-screen-2xl px-6 flex items-center justify-between gap-4 w-full mx-auto">
          <div className="flex items-center max-w-2xl w-full gap-4">
            <Link href="/">
              <Logo
                size={{ width: 48, height: 48 }}
                type="only-icon"
                className="shrink-0"
              />
            </Link>
            <Input
              className="!max-w-md !w-full h-10 text-base"
              placeholder=""
            />
          </div>
          <div className="flex items-center gap-4">
            <Suspense fallback={<Skeleton className="rounded-full size-9" />}>
              <User />
            </Suspense>
          </div>
        </div>
        <div className="max-w-screen-2xl px-6 flex items-center justify-start gap-2 w-full mx-auto">
          <Button variant="secondary" size="sm">
            Поиск
          </Button>
          <Button variant="ghost" size="sm">
            Блог
          </Button>
        </div>
      </header>
      <div className="min-h-dvh w-full bg-card">
        <div className="max-w-screen-2xl px-6 py-8 space-y-4 w-full mx-auto">
          <div className="space-y-2 max-w-xl">
            <div className="size-9 bg-background rounded-md border" />
            <div className="space-y-0 w-full">
              <span className="text-lg line-clamp-1 font-medium">
                Фронтенд разработчик, специализируюсь на разработке сайтов,
                веб-приложений.
              </span>
              <Link
                href="/"
                className="hover:underline block text-sm text-muted-foreground"
              >
                https://t.me/yz13_dev
              </Link>
            </div>
            <span className="text-sm line-clamp-2 text-muted-foreground">
              Описание проекта и его основные функции.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
