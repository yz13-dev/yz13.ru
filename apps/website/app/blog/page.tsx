import Header from "@/components/header";
import User from "@/components/user";
import { showAppsLink } from "@/const/flags";
import { LayoutGridIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { SidebarProvider } from "mono/components/sidebar";
import { Skeleton } from "mono/components/skeleton";
import Link from "next/link";
import { Suspense } from "react";
import { isDev } from "../login/get-url";
import AppSidebar from "./sidebar/app-sidebar";

const page = async () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <Header>
          <div />
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
      </div>
    </SidebarProvider>
  );
};

export default page;
