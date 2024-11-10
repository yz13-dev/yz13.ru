import { Calendar } from "@yz13/mono/components/calendar"


const Events = () => {
  return (
    <div className="w-full h-fit flex lg:!flex-row flex-col gap-2">
      <div className="w-full space-y-1.5">
        <ul>
          <li>
            <div className="p-2 rounded-xl flex items-start gap-2 border hover:bg-yz-neutral-100 hover:border-foreground">
              <div className="size-8 rounded-md border"></div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-foreground">Event 1</span>
                <span className="text-xs text-secondary">Mon, 11 Nov 2024</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="h-full shrink-0 rounded-xl border">
        <Calendar className="w-full" />
      </div>
    </div>
  )
}
export default Events
