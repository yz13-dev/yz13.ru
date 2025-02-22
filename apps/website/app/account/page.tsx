import Header from "@/components/header";
import { Logo } from "@/components/logo";
import Nav from "@/components/nav";
import User from "@/components/user";
import { showAppsLink } from "@/const/flags";
import { LayoutGridIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Skeleton } from "mono/components/skeleton";
import Link from "next/link";
import { Suspense } from "react";
import { isDev } from "../login/get-url";

const page = async () => {
  return (
    <>
      <Header className="sticky top-0">
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
      <div className="max-w-screen-2xl mx-auto p-6"></div>
    </>
  );
};

export default page;
