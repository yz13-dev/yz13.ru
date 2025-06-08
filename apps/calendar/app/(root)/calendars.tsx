import { EllipsisVerticalIcon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "mono/components/accordion";
import { Button } from "mono/components/button";
import { Checkbox } from "mono/components/checkbox";
import { getCalendars } from "rest-api/calendar";



export default async function ({ userId }: { userId: string }) {
  const { data } = await getCalendars(userId);
  const calendars = data ?? [];
  return (
    <Accordion
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
              calendars.map(calendar => (
                <li key={calendar.id} className="h-9 px-4 flex items-center justify-between gap-2">
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
                  <Button size="sm" variant="ghost"><EllipsisVerticalIcon /></Button>
                </li>
              ))
            }
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
