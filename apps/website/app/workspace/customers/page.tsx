import { UserIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "yz13/cn";

const page = () => {
  return (
    <>
      <h1 className="text-2xl font-medium text-foreground">Заказчики</h1>
      <div
        className={cn(
          "w-full grid gap-4 *:rounded-2xl",
          "xl:!grid-cols-4 lg:!grid-cols-3 sm:!grid-cols-2 !grid-cols-1",
        )}
      >
        <div className="w-full h-fit border p-4 flex flex-col gap-4 hover:border-foreground transition-colors relative">
          <Link
            href="/workspace/customers/1"
            className="absolute top-0 left-0 w-full h-full z-10"
          />
          <span className="font-medium inline-flex gap-2 items-center text-foreground">
            <UserIcon size={16} className="shrink-0 size-4" />
            Customer name
          </span>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-xs text-secondary">Заказов на сумму</span>
              <span className="text-sm block">$0</span>
            </div>
            <div>
              <span className="text-xs text-secondary">Всего заказов</span>
              <span className="text-sm block">0</span>
            </div>
          </div>
          <div>
            <span className="text-xs text-secondary">Последний заказ</span>
            <span className="text-sm block">10 дней назад</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
