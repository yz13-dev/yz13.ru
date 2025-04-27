import { Badge } from "mono/components/badge";
import { Button } from "mono/components/button";
import { Separator } from "mono/components/separator";

export default function Section() {
  const hasSchedule = false;
  return (
    <div className="space-y-6">
      <div className="space-y-0">
        <span className="text-lg font-medium block">Расписание</span>
        <span className="text-sm text-muted-foreground">
          Время когда другие пользователи могут запланировать с вами созвон.
        </span>
      </div>
      {hasSchedule ? (
        <ul className="w-full grid md:grid-cols-3 grid-cols-2 gap-6">
          <li className="flex flex-row gap-3">
            <span className="text-sm text-muted-foreground">Пн:</span>
            <div className="flex flex-row items-center justify-center gap-2">
              <Badge variant="secondary">10:00</Badge>
              <Separator className="max-w-2" />
              <Badge variant="secondary">18:00</Badge>
            </div>
          </li>
          <li className="flex flex-row gap-3">
            <span className="text-sm text-muted-foreground">Вт:</span>
            <div className="flex flex-row items-center justify-center gap-2">
              <Badge variant="secondary">10:00</Badge>
              <Separator className="max-w-2" />
              <Badge variant="secondary">18:00</Badge>
            </div>
          </li>
          <li className="flex flex-row gap-3">
            <span className="text-sm text-muted-foreground">Ср:</span>
            <div className="flex flex-row items-center justify-center gap-2">
              <Badge variant="secondary">10:00</Badge>
              <Separator className="max-w-2" />
              <Badge variant="secondary">18:00</Badge>
            </div>
          </li>
          <li className="flex flex-row gap-3">
            <span className="text-sm text-muted-foreground">Чт:</span>
            <div className="flex flex-row items-center justify-center gap-2">
              <Badge variant="secondary">10:00</Badge>
              <Separator className="max-w-2" />
              <Badge variant="secondary">18:00</Badge>
            </div>
          </li>
          <li className="flex flex-row gap-3">
            <span className="text-sm text-muted-foreground">Пт:</span>
            <div className="flex flex-row items-center justify-center gap-2">
              <Badge variant="secondary">10:00</Badge>
              <Separator className="max-w-2" />
              <Badge variant="secondary">18:00</Badge>
            </div>
          </li>
        </ul>
      ) : (
        <div className="w-full h-fit p-8 border rounded-xl border-dashed flex flex-col items-center justify-center gap-4">
          <span className="text-sm text-muted-foreground">Нет расписания</span>
          <Button>Создать расписание</Button>
        </div>
      )}
    </div>
  );
}
