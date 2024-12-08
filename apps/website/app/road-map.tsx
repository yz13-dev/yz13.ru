import { list } from "@/const/road-map"
import { cn } from "yz13/cn"
import Card from "./roadmap/card"

const RoadMap = ({ className = "" }: { className?: string }) => {
  return (
    <ul className={cn(
      "*:transition-colors grid grid-cols-2 auto-rows-auto gap-2",
      className
    )}>
      {
        list
          .filter((_, i) => i <= 4)
          .map(item => {
            return (
              <li
                key={`pr-${item}`}
                className={cn(
                  "w-full peer rounded-xl border transition-colors",
                  "hover:border-foreground hover:bg-background"
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
