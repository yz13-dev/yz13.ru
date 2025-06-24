import { Button } from "@yz13/ui/components/button";
import { Skeleton } from "@yz13/ui/components/skeleton";
import { ListIcon, LogInIcon, PlusIcon } from "lucide-react";


export default function () {
  return (
    <div className="w-full h-dvh absolute z-10 top-0 left-0 flex flex-col items-center justify-center gap-6">
      <div className="max-w-xs w-full space-y-3 px-6">
        <div className="w-full flex items-center gap-3">
          <Skeleton className="size-11" />
          <Skeleton className="w-36 h-11" />
        </div>
        <span className="text-start block text-xl font-medium text-muted-foreground">
          Доска, не более.
        </span>
      </div>
      <div className="space-y-2 px-3 max-w-xs w-full *:h-10 *:justify-start *:w-full">
        <Button variant="ghost">
          <ListIcon size={16} />
          Последние доски
        </Button>
        <Button variant="ghost">
          <PlusIcon size={16} />
          Создать новую доску
        </Button>
        <Button variant="ghost">
          <LogInIcon size={16} />
          Войти <span className="text-muted-foreground">(через YZ13)</span>
        </Button>
      </div>
    </div>
  )
}
