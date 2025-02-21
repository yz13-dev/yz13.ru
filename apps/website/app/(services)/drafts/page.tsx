import { isDev } from "@/app/login/get-url";
import {
  Cursor,
  CursorBody,
  CursorMessage,
  CursorName,
  CursorPointer,
} from "@/components/cursor";
import Dock from "@/components/dock/dock";
import Header from "@/components/header";
import { Logo } from "@/components/logo";
import PageDockFiller from "@/components/page-dock-filler";
import User from "@/components/user";
import { authorized } from "@/lib/auth";
import { Button } from "mono/components/button";
import { Input } from "mono/components/input";
import { Skeleton } from "mono/components/skeleton";
import Link from "next/link";
import { Suspense } from "react";
import DraftsGrid, { DraftsGridSkeleton } from "./grid";

const page = async () => {
  return (
    <>
      <Header>
        <Link href="/">
          <Logo size={{ width: 110, height: 20 }} type="full" />
        </Link>
        <div className="flex items-center gap-4">
          {(await authorized()) && (
            <Button variant="secondary" asChild>
              <Link href="/drafts/new">Опубликовать</Link>
            </Button>
          )}
          <Suspense fallback={<Skeleton className="h-9 w-[75px]" />}>
            {isDev && <User />}
          </Suspense>
        </div>
      </Header>
      <div className="p-3 space-y-3">
        <div className="w-full py-24">
          <div className="relative max-w-xl mx-auto flex items-center justify-center flex-col gap-8">
            <Cursor className="absolute top-12 -right-6">
              <CursorPointer className="text-foreground" />
              <CursorBody className="bg-foreground text-background">
                <CursorName>@yz13</CursorName>
                <CursorMessage>Вполне удобно</CursorMessage>
              </CursorBody>
            </Cursor>
            <span className="text-3xl font-medium max-w-md text-center">
              Откройте для себя коллекцию черновиков
            </span>
            <Input
              placeholder="Поиск по черновикам"
              className="max-w-md rounded-full"
            />
          </div>
        </div>
        <Suspense fallback={<DraftsGridSkeleton />}>
          <DraftsGrid />
        </Suspense>
      </div>
      <PageDockFiller />
      <Dock />
    </>
  );
};

export default page;
