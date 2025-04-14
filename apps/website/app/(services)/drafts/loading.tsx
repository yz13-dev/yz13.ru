import Header from "@/components/header";
import { Logo } from "@/components/logo";
import PageDockFiller from "@/components/page-dock-filler";
import { Input } from "mono/components/input";
import Link from "next/link";
import { DraftsGridSkeleton } from "./grid";

const loading = () => {
  return (
    <>
      <Header>
        <Link href="/">
          <Logo size={{ width: 110, height: 20 }} type="full" />
        </Link>
      </Header>
      <div className="p-3 space-y-3">
        <div className="w-full py-24">
          <div className="relative max-w-xl mx-auto flex items-center justify-center flex-col gap-8">
            <span className="text-3xl font-medium max-w-md text-center">
              Откройте для себя коллекцию черновиков
            </span>
            <Input
              placeholder="Поиск по черновикам"
              className="max-w-md rounded-full"
            />
          </div>
        </div>
        <DraftsGridSkeleton />
      </div>
      <PageDockFiller />
    </>
  );
};

export default loading;
