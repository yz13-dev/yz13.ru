import { cn } from "@yz13/ui/cn";
import { icons } from "@yz13/ui/icons";
import Link from "next/link";
import type { Link as UserLink } from "../schemas/link.schema";
import Favicon from "./favicon";


export default function ({ links = [] }: { links?: UserLink[] }) {

  if (!links.length) return null;
  return (
    <div className="w-full p-6 space-y-6">
      {
        links
          .map(item => {
            return (
              <div key={item.url} className="w-full py-3 px-4 rounded-md hover:bg-secondary/25 border space-y-1.5 cursor-pointer bg-card relative group hover:!border-foreground transition-colors">
                <Link
                  href={item.url}
                  className="absolute inset-0"
                />
                <div className={cn(
                  "absolute -right-3 -top-3 size-8 rounded-full bg-card border flex items-center justify-center",
                  "group-hover:!border-foreground group-hover:bg-foreground group-hover:text-background text-foreground transition-colors"
                )}>
                  <icons.ExternalLink className="size-4" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded-full shrink-0 border-2 flex items-center justify-center">
                    <Favicon url={item.url} />
                  </div>
                  <span className="font-medium text-lg line-clamp-1">{item.label}</span>
                </div>
                {
                  item.description &&
                  <span className="text-sm text-muted-foreground">{item.description}</span>
                }
              </div>
            )
          })
      }
    </div>
  )
}
