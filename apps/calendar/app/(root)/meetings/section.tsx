import { auth } from "@/lib/auth";
import LinkButton from "./link-button";

export default async function Section({
  disabled = false,
}: {
  disabled?: boolean;
}) {
  const hasMeetings = false;
  const user = await auth();
  return (
    <div className="space-y-6">
      <div className="space-y-0">
        <div className="flex w-full gap-4 items-center justify-between">
          <span className="text-lg font-medium block">Созвоны</span>
          <LinkButton uid={user?.id} disabled={disabled} />
        </div>
        <span className="text-sm text-muted-foreground">
          Созвоны запланированные вами или другими пользователи.
        </span>
      </div>
      {hasMeetings ? (
        <ul className="w-full grid md:grid-cols-2 grid-cols-1 gap-6">
          <li className="flex flex-col gap-1 w-full">
            <div className="flex items-center w-full justify-between">
              <span className="text-sm line-clamp-2 text-foreground">
                Обсуждение с Евгением
              </span>
              <span className="text-sm text-muted-foreground">10:00</span>
            </div>
            <span className="text-sm text-muted-foreground">
              Заметка от Евгения: ...
            </span>
          </li>
          <li className="flex flex-col gap-1 w-full">
            <div className="flex items-center w-full justify-between">
              <span className="text-sm line-clamp-2 text-foreground">
                Обсуждение с Борисом
              </span>
              <span className="text-sm text-muted-foreground">10:00</span>
            </div>
            <span className="text-sm text-muted-foreground">
              Заметка от Бориса: ...
            </span>
          </li>
        </ul>
      ) : (
        <div className="w-full h-fit p-8 border rounded-xl border-dashed flex flex-col items-center justify-center gap-4">
          <span className="text-sm text-muted-foreground">Нет созвонов</span>
        </div>
      )}
    </div>
  );
}
