import { SearchIcon, BellIcon } from "lucide-react";
import { Button } from "mono/components/button";

export default function page() {
  return (
    <>
      <header className="md:px-[2.5%] px-[5%] md:pt-[2.5%] pt-[5%] w-full flex items-center justify-between">
        <span className="text-2xl font-medium">00:00</span>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost">
            <SearchIcon size={16} />
          </Button>
          <Button size="icon" variant="ghost">
            <BellIcon size={16} />
          </Button>
          <Button>Войти</Button>
        </div>
      </header>
      <div className="md:p-[2.5%] p-[5%] w-full flex md:flex-row flex-col gap-2 md:*:w-1/2 *:w-full">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <span className="text-lg font-medium">March 25, 2025</span>
            <span className="text-base text-secondary">Wednesday</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="w-full h-20 bg-neutral-200"></div>
          <div className="w-full h-full *:h-20 space-y-3">
            <div className="w-full rounded-lg bg-neutral-200"></div>
            <div className="w-full rounded-lg bg-neutral-200"></div>
            <div className="w-full rounded-lg bg-neutral-200"></div>
            <div className="w-full rounded-lg bg-neutral-200"></div>
          </div>
        </div>
      </div>
    </>
  );
}
