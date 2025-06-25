import { getCalendars } from "@yz13/api/calendar";
import { Button } from "@yz13/ui/components/button";
import { Checkbox } from "@yz13/ui/components/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@yz13/ui/components/dropdown-menu";
import { CalendarIcon, CheckIcon, Edit3Icon, EllipsisVerticalIcon, PlusIcon, Trash2Icon } from "lucide-react";



export default async function ({ userId }: { userId: string }) {
  const { data } = await getCalendars(userId);
  const calendars = data ?? [];
  return (
    <div
      className="flex flex-col gap-2 rounded-lg py-2 border p-0 bg-card"
    >
      <div className="text-base font-medium px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarIcon size={18} />
          Календари
        </div>
        <Button variant="outline" size="sm"><PlusIcon /></Button>
      </div>
      {
        calendars.length !== 0 &&
        <ul className="w-full *:px-4 divide-y">
          {
            calendars.map(calendar => {
              const isDefault = calendar.is_default ?? false;
              return <li key={calendar.id} className="h-9 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Checkbox checked={calendar.visible ?? false} />
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">{calendar.name}</span>
                    {
                      calendar.description &&
                      <span className="text-xs text-muted-foreground">{calendar.description}</span>
                    }

                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {
                    isDefault &&
                    <span className="text-xs text-muted-foreground">По умолчанию</span>
                  }
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="ghost"><EllipsisVerticalIcon /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem disabled={isDefault}>
                        {
                          isDefault
                            ? <CheckIcon />
                            : <div className="size-4" />
                        }
                        <span>Сделать по умолчанию</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit3Icon />
                        <span>Изменить</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Trash2Icon />
                        <span>Удалить</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </li>
            })
          }
        </ul>
      }
    </div>
  )
}
