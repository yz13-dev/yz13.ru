import { cn } from "yz13/cn"
import Card, { RoadMap } from "./card"
import Link from "next/link"
import { Logo } from "@/components/logo"
import { list } from "@/const/road-map"



const page = () => {
  return (
    <div className="w-full h-dvh flex py-6 pl-24 items-start justify-start">
      <Link href="/">
        <Logo className="size-12 absolute top-6 left-6" />
      </Link>
      <div className="w-fit h-full flex items-start justify-start gap-2">
        {
          list
            .map(
              item =>
                <div
                  key={item.id}
                  className={cn(
                    "w-72 peer rounded-xl border transition-colors",
                    "hover:border-foreground hover:bg-yz-neutral-100"
                  )}
                >
                  <Card item={item} />
                </div>
            )
        }
      </div>
    </div>
  )
}
export default page
