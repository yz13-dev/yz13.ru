import { Button } from "@yz13/ui/button";
import { Logo } from "./components/logo";
import { GlobeIcon, HomeIcon } from "lucide-react";
import { cn } from "@yz13/ui/utils";

export default function () {
  return (
    <>
      <header className="w-full flex px-6 pt-4 items-center justify-between">
        <div className="w-1/3 flex justify-start">
          <Logo type="full" />
        </div>
        <div className="max-w-4xl shrink-0 rounded-xl w-full h-12 bg-card border" />
        <div className="w-1/3 flex justify-end">
          <div className="size-10 rounded-full border bg-secondary" />
        </div>
      </header>
      <div className="w-full max-w-4xl mx-auto py-6">
        <div className="grid h-48 grid-cols-2 gap-4">
          <div className="size-full rounded-xl border bg-card" />
          <div className="size-full rounded-xl border bg-card" />
        </div>
      </div>
      <div className="w-full rounded-t-4xl border bg-card h-screen flex">
        <aside className="pt-4 pl-4 w-full max-w-3xs space-y-2">
          <div
            className={cn(
              "w-full *:w-full *:justify-start",
              "*:[&>svg]:!size-5 *:[&>span]:text-base *:gap-2 *:h-12",
            )}
          >
            <Button variant="secondary" size="lg">
              <HomeIcon />
              <span>Главная</span>
            </Button>
            <Button variant="ghost" size="lg">
              <GlobeIcon />
              <span>Блог</span>
            </Button>
            <Button variant="ghost" size="lg">
              <GlobeIcon />
              <span>Пины</span>
            </Button>
            <Button variant="ghost" size="lg">
              <GlobeIcon />
              <span>Новостная лента</span>
            </Button>
          </div>
        </aside>
        <div className="px-4 w-full pb-4 *:pt-4">
          <div className="w-full flex gap-4">
            <div className="w-2/3 h-48 rounded-xl bg-secondary"></div>
            <div className="w-1/3 h-48 rounded-xl bg-secondary"></div>
          </div>
        </div>
      </div>
    </>
  );
}
