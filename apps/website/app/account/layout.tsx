import Dock from "@/components/dock/dock";
import PageDockFiller from "@/components/page-dock-filler";
import PublicHeader from "@/components/public-header";
import { UserCircleIcon } from "lucide-react";
import { Button } from "mono/components/button";
import Link from "next/link";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PublicHeader className="max-w-4xl mx-auto lg:!mt-24 mt-0" />
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
