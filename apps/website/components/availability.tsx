import { getAvailability } from "@/flags";
import { Button, type ButtonProps } from "@yz13/ui/button";
import { cn } from "@yz13/ui/cn";
import { Skeleton } from "@yz13/ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@yz13/ui/tooltip";

type Props = ButtonProps & {
  textType?: "full" | "short"
}
export default async function Availability({ className = "", textType = "short", ...props }: Props) {

  const isAvailable = await getAvailability();

  const fullTextAvailable = isAvailable ? "Свободен для заказов" : "Недоступен для заказов";
  const shortTextAvailable = isAvailable ? "Свободен" : "Занят";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          className={cn("group", className)}
          variant="outline"
          data-available={isAvailable}
          {...props}
        >
          <div className="relative flex items-center justify-center size-2">
            <div className={cn(
              "absolute size-3 rounded-full animate-ping",
              "group-data-[available=true]:bg-foreground",
              "group-data-[available=false]:bg-destructive-foreground",
            )}
            />
            <div className={cn(
              "size-1.5 rounded-full",
              "group-data-[available=true]:bg-foreground",
              "group-data-[available=false]:bg-destructive-foreground",
            )} />
          </div>
          <span>{textType === "full" ? fullTextAvailable : shortTextAvailable}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {fullTextAvailable}
      </TooltipContent>
    </Tooltip>
  )
}

export const AvailabilitySkeleton = ({
  type = "full",
  className = "",
}: {
  className?: string
  type?: Props["textType"]
}) => {
  if (type === "full") return <Skeleton className={cn("w-[246px]", className)} />
  return <Skeleton className={cn("w-[97px]", className)} />
}
