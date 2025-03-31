import { isDev } from "@/app/login/get-url";
import Header from "@/components/header";
import { Logo } from "@/components/logo";
import Nav from "@/components/nav/nav";
import User from "@/components/user";
import { showAppsLink } from "@/const/flags";
import { LayoutGridIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Skeleton } from "mono/components/skeleton";
import Link from "next/link";
import { Suspense } from "react";

type PageProps = {
  params: {
    userId: string;
  };
};
const page = async ({ params }: PageProps) => {
  const userId = params.userId;
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
      <div className="flex">
        <div className="w-full space-y-6 *:px-6 py-6 max-w-md">
          <div className="w-full h-fit">
            <div className="w-full relative">
              <div className="w-full aspect-[2/0.75] bg-background-secondary rounded-xl border" />
              <div className="size-28 rounded-full border absolute -bottom-14 left-6 bg-background-secondary"></div>
            </div>
          </div>
          <div className="w-full h-fit">
            <div className="w-full flex justify-end gap-2">
              <Button>Action</Button>
            </div>
          </div>
          <div className="w-full space-y-3">
            <div className="*:block">
              <span className="text-lg font-medium">123321</span>
              <span className="text-sm text-secondary">111111</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-foreground">
                1 <span className="text-secondary">0000</span>
              </span>
              <span className="text-sm text-foreground">
                1 <span className="text-secondary">0000</span>
              </span>
              <span className="text-sm text-foreground">
                1 <span className="text-secondary">0000</span>
              </span>
            </div>
          </div>
        </div>
        <div className="w-[calc(100%-var(--container-md))] space-y-6 *:px-6 py-6">
          <div className="w-full h-fit">
            <div className="w-full flex justify-start gap-2">
              <Button variant="secondary">Сообщество</Button>
              <Button variant="secondary">Черновики</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
