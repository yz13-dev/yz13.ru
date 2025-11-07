import { Button } from "@yz13/ui/button";
import { cn } from "@yz13/ui/cn";
import * as icons from "@yz13/ui/icons";
import Link from "next/link";
import type { Actions } from "../schemas/link.schema";



export default function ({ actions }: { actions: Actions }) {
  const hasOnlyOneAction = Object.keys(actions || {}).length === 1;

  const primaryAction = actions?.primary;
  const secondaryAction = actions?.secondary;

  const PrimaryIcon = primaryAction?.icon ? icons[primaryAction.icon as keyof typeof icons] : null;
  const SecondaryIcon = secondaryAction?.icon ? icons[secondaryAction.icon as keyof typeof icons] : null;

  return (
    <div className={cn(
      "w-full px-6 pb-6 flex flex-col items-center gap-3",
      "md:flex-row *:shrink",
      hasOnlyOneAction ? "*:w-full" : "md:*:w-1/2 *:w-full"
    )}>
      {
        secondaryAction && (
          !(secondaryAction.disabled || false)
            ?
            <Button variant="secondary" asChild>
              <Link href={secondaryAction.value}>
                {/* @ts-expect-error */}
                {SecondaryIcon && <SecondaryIcon />}
                {secondaryAction.label}
              </Link>
            </Button>
            :
            <Button variant="secondary" disabled={secondaryAction.disabled}>
              {/* @ts-expect-error */}
              {SecondaryIcon && <SecondaryIcon />}
              {secondaryAction.label}
            </Button>
        )
      }
      {
        primaryAction && (
          !(primaryAction.disabled || false)
            ?
            <Button asChild>
              <Link href={primaryAction.value}>
                {primaryAction.label}
                {/* @ts-expect-error */}
                {PrimaryIcon && <PrimaryIcon />}
              </Link>
            </Button>
            :
            <Button disabled={primaryAction.disabled}>
              {primaryAction.label}
              {/* @ts-expect-error */}
              {PrimaryIcon && <PrimaryIcon />}
            </Button>
        )
      }
    </div>
  )
}
