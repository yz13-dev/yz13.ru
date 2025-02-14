import Dock from "@/components/dock/dock";
import Header from "@/components/header";
import { Logo } from "@/components/logo";
import Nav from "@/components/nav";
import PageDockFiller from "@/components/page-dock-filler";
import { PagesLogo } from "@/components/pages-logo";
import { showPagesPromo } from "@/const/flags";
import { UserCircleIcon } from "lucide-react";
import { Button } from "mono/components/button";
import Link from "next/link";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header>
        <Link href="/">
          <Logo size={{ width: 110, height: 20 }} type="full" />
        </Link>
        <Nav>
          {(await showPagesPromo()) && (
            <div className="size-9 flex justify-center group relative items-center transition-colors">
              <PagesLogo
                size={{ width: 16, height: 16 }}
                type="only-icon"
                className="opacity-50 group-hover:opacity-100 transition-opacity"
              />
              <Link
                href="https://pages.yz13.ru"
                className="w-full h-full absolute inset-0"
              />
            </div>
          )}
        </Nav>
      </Header>
      <div className="max-w-4xl mx-auto p-3 flex sm:!flex-row flex-col gap-6">
        <aside className="flex flex-col gap-2 w-72">
          <span className="text-sm text-secondary pl-4">User settings</span>
          <div className="w-full space-y-1 *:!justify-start">
            <Button variant="ghost" className="w-full gap-2" asChild>
              <Link href="/account/general">
                <UserCircleIcon size={16} />
                Profile
              </Link>
            </Button>
            {/* <Button variant="ghost" className="w-full gap-2" asChild>
              <Link href="/account/password">
                <LockIcon size={16} />
                Password
              </Link>
            </Button> */}
            {/* <Button variant="ghost" className="w-full gap-2" asChild>
              <Link href="/account/danger-zone">
                <SkullIcon size={16} />
                Danger zone
              </Link>
            </Button> */}
          </div>
        </aside>
        {children}
        <PageDockFiller />
        <Dock />
      </div>
    </>
  );
};

export default layout;
