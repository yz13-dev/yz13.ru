import { Separator } from "@yz13/ui/separator";
import { Skeleton } from "@yz13/ui/skeleton";




export default function () {

  return (
    <div className="w-full md:p-6 p-3">
      <div className="w-full md:max-w-sm max-w-full md:max-h-fit max-h-full mx-auto rounded-4xl bg-card border md:overflow-y-visible overflow-y-auto">
        <div className="w-full items-start p-6 justify-between flex gap-4">
          <Skeleton className="size-24 rounded-3xl border-2" />
          <div className="h-fit grid grid-cols-5 float-right grid-flow-row-dense gap-2 *:rounded-sm">
            <Skeleton className="size-9" />
            <Skeleton className="size-9" />
            <Skeleton className="size-9" />
            <Skeleton className="size-9" />
            <Skeleton className="size-9" />

            <Skeleton className="size-9" />
            <Skeleton className="size-9" />
            <Skeleton className="size-9" />
            <Skeleton className="size-9" />
            <Skeleton className="size-9" />
          </div>
        </div>
        <div className="w-full px-6 pb-6 space-y-3">
          <div className="flex flex-col gap-3">
            <div className="*:block space-y-1">
              <div className="w-full h-8 flex items-center">
                <Skeleton className="w-1/2 h-6" />
              </div>
              <Skeleton className="w-1/4 h-6" />
            </div>
          </div>
          <Skeleton className="w-1/3 h-6" />
          <Skeleton className="w-2/3 h-6" />
        </div>
        <Separator />
        <div className="w-full p-6 space-y-6">
          <Skeleton className="w-full rounded-md h-[100px]" />
          <Skeleton className="w-full rounded-md h-[100px]" />
          <Skeleton className="w-full rounded-md h-[100px]" />
        </div>
      </div>
    </div>
  )
}
