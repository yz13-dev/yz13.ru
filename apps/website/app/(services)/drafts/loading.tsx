import {
  Cursor,
  CursorBody,
  CursorMessage,
  CursorName,
  CursorPointer,
} from "@/components/cursor";
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
        <DraftsGridSkeleton />
      </div>
      <PageDockFiller />
    </>
  );
};

export default loading;
