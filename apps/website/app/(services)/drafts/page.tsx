import Dock from "@/components/dock/dock";
import { Header } from "@/components/header";
import PageDockFiller from "@/components/page-dock-filler";
import { UploadIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Input } from "mono/components/input";
import Link from "next/link";
import { Suspense } from "react";
import DraftsGrid, { DraftsGridSkeleton } from "./grid";

const page = async () => {
  return (
    <>
      <Header>
        <Header.Left
          className="gap-4"
          title="Drafts"
          logo={{
            light: "/apps/yz-drafts-light.svg",
            dark: "/apps/yz-drafts-dark.svg",
          }}
        >
          <nav className="flex gap-3 items-center *:text-sm *:text-secondary">
            <span>Популярные</span>
            <span>Новые</span>
            <span>Подписки</span>
          </nav>
        </Header.Left>
        <Header.Center></Header.Center>
        <Header.Right>
          <Button rounded="full" className="gap-2" asChild>
            <Link href="/drafts/new">
              <UploadIcon size={16} />
              Опубликовать
            </Link>
          </Button>
        </Header.Right>
      </Header>
      <div className="p-3 space-y-3">
        <div className="w-full py-12 flex items-center justify-center flex-col gap-8">
          <span className="text-2xl font-medium max-w-md text-center">
            Откройте для себя коллекцию черновиков
          </span>
          <Input
            placeholder="Поиск по черновикам"
            className="max-w-md rounded-full"
          />
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
