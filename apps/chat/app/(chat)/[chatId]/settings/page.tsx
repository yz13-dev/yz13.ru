import { TrashIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Separator } from "mono/components/separator";
import { cn } from "yz13/cn";

const page = () => {
  return (
    <>
      <div
        className={cn(
          "mx-auto min-h-[calc(100dvh-56px)] md:max-w-[calc(var(--breakpoint-md)-68px)] max-w-[calc(var(--breakpoint-md)-52px)]",
          "py-16",
        )}
      >
        <div className="space-y-6">
          <span className="text-2xl block font-semibold">Настройки</span>
          <div className="w-full flex flex-col gap-2">
            <span className="text-base text-secondary font-medium block">
              Тэги
            </span>
            <div className="w-full"></div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <span className="text-base text-secondary font-medium block">
              Списки задач
            </span>
            <div className="w-full"></div>
          </div>
          <Separator />
          <Button variant="secondary" className="gap-2">
            <TrashIcon size={16} /> Удалить чат
          </Button>
        </div>
      </div>
    </>
  );
};

export default page;
