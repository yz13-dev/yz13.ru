import { isDev } from "@/app/login/get-url";
import Dock from "@/components/dock/dock";
import Header from "@/components/header";
import { Logo } from "@/components/logo";
import Nav from "@/components/nav/nav";
import PageDockFiller from "@/components/page-dock-filler";
import User from "@/components/user";
import { showAppsLink } from "@/const/flags";
import { LayoutGridIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Separator } from "mono/components/separator";
import { Skeleton } from "mono/components/skeleton";
import Link from "next/link";
import { Suspense } from "react";
import Sidebar from "./sidebar";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header>
        <Link href="/">
          <Logo size={{ width: 110, height: 20 }} type="full" />
        </Link>
        <Nav>
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
        </Nav>
      </Header>
      <div className="bg-background-secondary min-h-[calc(100dvh-64px)]">
        <div className="max-w-screen-xl mx-auto px-3 py-6">
          <h1 className="text-2xl font-semibold">Настройки</h1>
        </div>
        <Separator />
        <div className="flex sm:!flex-row flex-col p-3 gap-6 max-w-screen-xl mx-auto">
          <Sidebar className="md:flex hidden" />
          <div className="w-full flex flex-col gap-6">{children}</div>
        </div>
        <PageDockFiller />
      </div>
      <Dock />
    </>
  );
};

export default layout;
