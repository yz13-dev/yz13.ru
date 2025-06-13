import { Logo } from "@/components/logo";
import { Button } from "@yz13/ui/components/button";
import { ListIcon, LogInIcon, PlusIcon } from "lucide-react";


export default function () {
  return (
    <div className="w-full h-dvh absolute z-10 top-0 left-0 flex flex-col items-center justify-center gap-6">
      <div className="px-6 max-w-xs w-full justify-center">
        <Logo size={42} type="full" />
      </div>
      <div className="max-w-xs w-full px-6">
        <span className="text-start text-sm text-muted-foreground">
          Храним данные локально, но по желанию можно сохранить в облако.
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
          Войти
        </Button>
      </div>
    </div>
  )
}
