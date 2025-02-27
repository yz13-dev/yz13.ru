import Header from "@/components/header";
import { Logo } from "@/components/logo";
import Nav from "@/components/nav/nav";
import { PagesLogo } from "@/components/pages-logo";
import { showPagesPromo } from "@/const/flags";
import { ExternalLinkIcon, PlusIcon } from "lucide-react";
import { Button } from "mono/components/button";
import Link from "next/link";

const page = async () => {
  return (
    <>
      <Header>
        <Link href="/">
          <Logo size={{ width: 110, height: 20 }} type="full" />
        </Link>
        <Nav>
          {(await showPagesPromo()) && (
            <div className="size-9 flex justify-center group relative items-center transition-colors">
              <PagesLogo
                size={{ width: 16, height: 16 }}
                type="only-icon"
                className="opacity-50 group-hover:opacity-100 transition-opacity"
              />
              <Link
                href="https://pages.yz13.ru"
                className="w-full h-full absolute inset-0"
              />
            </div>
          )}
        </Nav>
      </Header>
      <div className="p-3 max-w-screen-2xl space-y-6 mx-auto">
        <div className="flex flex-row items-center gap-3 justify-between">
          <h1 className="text-3xl font-semibold">Ваши счета</h1>
          <Button className="gap-2 rounded-full">
            <PlusIcon size={16} />
            Добавить счет
          </Button>
        </div>
        <div className="w-full h-fit flex flex-row items-center gap-3">
          <div className="h-full w-80 border rounded-xl flex flex-col bg-background transition-colors group relative hover:border-foreground">
            <Link
              href="/finance/account/1"
              className="size-8 rounded-full border bg-background -top-3 -right-3 transition-all absolute hidden group-hover:flex items-center justify-center group-hover:border-foreground"
            >
              <ExternalLinkIcon size={16} />
            </Link>
            <div className="flex w-full h-full flex-row items-start divide-x">
              <div className="flex w-2/3 flex-col h-full gap-1 p-3">
                <span className="text-secondary">Чиста прибыль</span>
                <span className="text-foreground text-3xl font-semibold">
                  $100
                </span>
              </div>
              <div className="flex w-1/3 flex-col divide-y">
                <div className="flex flex-col gap-1 p-3">
                  <span className="text-secondary text-sm">Доходы</span>
                  <span className="text-foreground font-semibold text-sm">
                    $10
                  </span>
                </div>
                <div className="flex flex-col gap-1 p-3">
                  <span className="text-secondary text-sm">Расходы</span>
                  <span className="text-foreground font-semibold text-sm">
                    $10
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
