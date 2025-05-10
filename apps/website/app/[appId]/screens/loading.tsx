import { OtherProjectsSkeleton } from "@/app/(root)/other-projects";
import { Logo } from "@/components/logo";
import Footer from "@/components/small-footer";
import { Separator } from "mono/components/separator";
import { Skeleton } from "mono/components/skeleton";
import Link from "next/link";

export default function Loading() {
  return (
    <>
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between p-6">
        <Link href="/">
          <Logo size={{ width: 128, height: 64 }} type="full" />
        </Link>
        <Skeleton className="h-9 w-16" />
      </header>
      <div className="max-w-6xl w-full mx-auto py-12 px-6 space-y-6">
        <Skeleton className="size-24 relative border rounded-[25%] shrink-0" />
        <div className="w-full space-y-2 max-w-lg">
          <Skeleton className="w-full h-9 rounded-full" />
          <Skeleton className="w-1/2 h-9 rounded-full" />
          <Skeleton className="w-2/3 h-9 rounded-full" />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground">Автор</span>
            <Skeleton className="w-20 h-6" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground">Категории</span>
            <Skeleton className="w-20 h-6" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground">Стадия</span>
            <Skeleton className="w-20 h-6" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-28 rounded-full" />
          <Skeleton className="h-9 w-28 rounded-full" />
        </div>
      </div>
      <div className="w-full space-y-4 max-w-6xl mx-auto p-6">
        <span className="text-base block font-medium">Другие проекты</span>
        <ul className="w-full grid grid-cols-3 gap-6">
          <OtherProjectsSkeleton />
        </ul>
      </div>
      <div className="w-full gap-6 max-w-6xl mx-auto p-6 space-y-6">
        <Separator />
        <Footer />
      </div>
    </>
  );
}
