import { OtherProjectsSkeleton } from "@/app/(root)/other-projects";
import Footer from "@/components/footer/footer";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Separator } from "mono/components/separator";
import { Skeleton } from "mono/components/skeleton";
import Link from "next/link";
import { UserPublisherSkeleton } from "./publisher";

export default function loading() {
  return (
    <>
      <div className="max-w-6xl w-full mx-auto px-6 space-y-6 mt-[10%]">
        <div className="flex flex-row lg:items-center items-start gap-6 lg:justify-between justify-start">
          <Skeleton className="size-16 shrink-0 lg:hidden flex items-center justify-center" />
          <div className="flex w-full flex-col gap-6">
            <Button variant="ghost" asChild className="w-fit">
              <Link href="/">
                <ArrowLeftIcon />
                Вернуться
              </Link>
            </Button>
            <Skeleton className="h-12 w-1/3 rounded-full" />
            <UserPublisherSkeleton />
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-24 rounded-full" />
              <Skeleton className="h-9 w-28 rounded-full" />
            </div>
          </div>
          <div className="h-60 w-1/3 shrink-0 lg:flex hidden items-center justify-center">
            <Skeleton className="size-60 relative border rounded-[25%] overflow-hidden flex items-center justify-center" />
          </div>
        </div>
      </div>
      <div className="w-full gap-6 flex lg:flex-row flex-col max-w-6xl mx-auto p-6 space-y-6">
        <div className="lg:w-2/3 w-full space-y-8">
          <div className="w-full space-y-4">
            <span className="text-base block font-medium">Описание</span>
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-1/3" />
          </div>
          <Separator />
        </div>
        <div className="lg:w-1/3 w-full space-y-6">
          <span className="text-base block font-medium">Другие проекты</span>
          <ul className="space-y-6">
            <OtherProjectsSkeleton />
          </ul>
        </div>
      </div>
      <div className="w-full gap-6 max-w-6xl mx-auto p-6 space-y-6">
        <Separator />
        <Footer />
      </div>
    </>
  );
}
