import Header from "@/components/header";
import { Logo } from "@/components/logo";
import Nav from "@/components/nav/nav";
import User from "@/components/user";
import { LayoutGridIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Skeleton } from "mono/components/skeleton";
import Link from "next/link";
import { Suspense } from "react";
import { cn } from "yz13/cn";

export const RootHeaderSkeleton = ({
  className = "",
}: {
  className?: string;
}) => {
  return (
    <Header
      className={cn(
        "border-none *:z-20 z-10 background-transparent md:px-[2.5%] px-[5%]",
        className,
      )}
    >
      <Nav side="left">
        <Link href="/">
          <Logo size={{ width: 110, height: 20 }} type="full" />
        </Link>
      </Nav>
      <div className="flex items-center gap-2">
        <Skeleton className="size-9" />
        <Skeleton className="h-9 w-[75px]" />
      </div>
    </Header>
  );
};

export default async function RootHeader({
  className = "",
}: {
  className?: string;
}) {
  return (
    <Header
      className={cn(
        "border-none *:z-20 z-10 background-transparent md:px-[2.5%] px-[5%]",
        className,
      )}
    >
      <Nav side="left">
        <Link href="/">
          <Logo size={{ width: 110, height: 20 }} type="full" />
        </Link>
      </Nav>
      <div className="flex items-center gap-2">
        <Suspense fallback={<Skeleton className="size-9" />}>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/apps">
              <LayoutGridIcon size={16} />
            </Link>
          </Button>
        </Suspense>
        <Suspense fallback={<Skeleton className="h-9 w-[75px]" />}>
          <User />
        </Suspense>
      </div>
    </Header>
  );
}
