import { CheckIcon, Edit3Icon, EllipsisVerticalIcon, Trash2Icon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "mono/components/accordion";
import { Button } from "mono/components/button";
import { Checkbox } from "mono/components/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "mono/components/dropdown-menu";
import { getCalendars } from "rest-api/calendar";



export default async function ({ userId }: { userId: string }) {
  const { data } = await getCalendars(userId);
  const calendars = data ?? [];
  return (
    <Accordion
      defaultValue="calendars"
      type="single"
      collapsible
      className="flex flex-col gap-2 rounded-lg p-2 bg-card"
    >
      <AccordionItem value="calendars">
        <AccordionTrigger className="text-base py-1 font-medium pl-3 pr-6 [&>svg]:mr-0.5">
          Календари
        </AccordionTrigger>
        <AccordionContent className="pb-0">
          <ul className="w-full divide-y">
            {
              calendars.map(calendar => {
                const isDefault = calendar.is_default ?? false;
                return <li key={calendar.id} className="h-9 px-4 flex items-center justify-between gap-2">
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
        </AccordionContent>
      </AccordionItem>
    </Accordion >
  )
}
