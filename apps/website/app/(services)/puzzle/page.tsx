import { isDev } from "@/app/login/get-url";
import Header from "@/components/header";
import { Logo } from "@/components/logo";
import Nav from "@/components/nav/nav";
import User from "@/components/user";
import { showAppsLink } from "@/const/flags";
import { LayoutGridIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Input } from "mono/components/input";
import { Label } from "mono/components/label";
import { Separator } from "mono/components/separator";
import { Skeleton } from "mono/components/skeleton";
import { Switch } from "mono/components/switch";
import Link from "next/link";
import { Suspense } from "react";

const page = async () => {
  return (
    <>
      <Header className="sticky top-0">
        <Nav side="left">
          <Link href="/">
            <Logo size={{ width: 110, height: 20 }} type="full" />
          </Link>
        </Nav>
        <div className="flex items-center gap-2">
          <Suspense fallback={<Skeleton className="size-9" />}>
            {(await showAppsLink()) && (
              <Button variant="ghost" size="icon" asChild>
                <Link href="/apps">
                  <LayoutGridIcon size={16} />
                </Link>
              </Button>
            )}
          </Suspense>
          <Suspense fallback={<Skeleton className="h-9 w-[75px]" />}>
            {isDev && <User />}
          </Suspense>
        </div>
      </Header>
      <div className="w-full">
        <div className="w-full max-w-lg mx-auto my-24 space-y-12">
          <div className="flex items-center gap-2">
            <Input placeholder="ID комнаты" className="h-10 text-base" />
            <Button variant="secondary">Войти</Button>
          </div>
          <div className="flex items-center gap-2">
            <Separator className="w-1/2 shrink" />
            <span className="text-sm text-secondary shrink-0">
              Или создайте новую комнату
            </span>
            <Separator className="w-1/2 shrink" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Название комнаты"
                className="h-10 text-base"
              />
              <Button variant="secondary">Создать</Button>
            </div>
            <div className="flex flex-row gap-2">
              <Switch id="public-room" />
              <Label htmlFor="public-room" className="text-sm text-secondary">
                Публичная комната
              </Label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
