import { isDev } from "@/app/login/get-url";
import Dock from "@/components/dock/dock";
import Header from "@/components/header";
import { Logo } from "@/components/logo";
import Nav from "@/components/nav/nav";
import PageDockFiller from "@/components/page-dock-filler";
import User from "@/components/user";
import { showAppsLink } from "@/const/flags";
import { LayoutGridIcon, UserCircleIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Skeleton } from "mono/components/skeleton";
import Link from "next/link";
import { Suspense } from "react";

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
      <div className="max-w-screen-2xl mx-auto p-3 flex sm:!flex-row flex-col gap-6">
        <aside className="flex flex-col gap-2 w-72">
          <span className="text-sm text-secondary pl-4">User settings</span>
          <div className="w-full space-y-1 *:!justify-start">
            <Button variant="ghost" className="w-full gap-2" asChild>
              <Link href="/account/settings/general">
                <UserCircleIcon size={16} />
                Profile
              </Link>
            </Button>
            {/* <Button variant="ghost" className="w-full gap-2" asChild>
              <Link href="/account/settings/password">
                <LockIcon size={16} />
                Password
              </Link>
            </Button> */}
            {/* <Button variant="ghost" className="w-full gap-2" asChild>
              <Link href="/account/settings/danger-zone">
                <SkullIcon size={16} />
                Danger zone
              </Link>
            </Button> */}
          </div>
        </aside>
        <div className="w-full flex flex-col gap-6">{children}</div>
      </div>
      <PageDockFiller />
      <Dock />
    </>
  );
};

export default layout;
