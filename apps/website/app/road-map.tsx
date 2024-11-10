import { list } from "@/const/road-map"
import { cn } from "yz13/cn"
import Card from "./roadmap/card"

const RoadMap = () => {
  return (
    <ul className="*:transition-colors grid sm:!grid-cols-2 grid-cols-1 auto-rows-auto gap-2">
      {
        list
          .filter((_, i) => i <= 4)
          .map(item => {
            return (
              <li
                key={`pr-${item}`}
                className={cn(
                  "w-full peer rounded-xl border transition-colors",
                  "hover:border-foreground hover:bg-yz-neutral-100"
                )}
              >
                <Card item={item} />
              </li>
            )
          })
      }
    </ul>
  )
}

export default RoadMap
