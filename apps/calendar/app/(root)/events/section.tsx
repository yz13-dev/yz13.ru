import { format, parseISO } from "date-fns";
import { Button } from "mono/components/button";
import { getUserEvents } from "rest-api/calendar";

export default async function Section({ uid }: { uid: string }) {
  const { data } = await getUserEvents(uid);
  const events = data ?? [];
  return (
    <>
      <ul className="w-full h-fit space-y-3 py-3">
        {events.slice(0, 9).map((event, i) => {
          const summary = event.summary ?? "Нет названия";
          const description = event.description ?? "Нет описания";
          const parsed = parseISO(event.date_start);
          const time = format(parsed, "HH:mm");
          return (
            <li className="w-full" key={i}>
              <div className="w-full p-3 flex flex-row justify-between items-start rounded-xl hover:bg-background-secondary border transition-colors">
                <div className="flex flex-col gap-1">
                  <span className="text-base font-medium">{summary}</span>
                  <span className="text-sm text-muted-foreground">
                    {description}
                  </span>
                </div>
                <span className="text-base font-medium">{time}</span>
              </div>
            </li>
          );
        })}
        {events.length > 9 && (
          <li className="w-full">
            <Button
              variant="ghost"
              className="w-full h-10 flex items-center justify-center"
            >
              <span className="text-sm text-muted-foreground">
                Показать еще
              </span>
            </Button>
          </li>
        )}
      </ul>
    </>
  );
}
