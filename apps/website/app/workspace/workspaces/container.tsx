"use client"
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "mono/components/carousel"
import { useQueryState } from "nuqs"
import { Suspense, useEffect, useMemo, useState } from "react"
import { workspaces } from "../const/workspaces"
import useWorkspaceStore, { switchWorkspace } from "../store/workspace.store"
import WorkspaceLoader from "./workspace.loader"


type Props = {
  providedId?: string
}
const WorkspacesContainer = ({ providedId }: Props) => {
  const [api, setApi] = useState<CarouselApi>()
  const { active } = useWorkspaceStore()

  const workspaceIndex = useMemo(() => workspaces.items.findIndex(item => item.id === active), [active])
  const workspaceId = useMemo(() => workspaces.items.find(item => item.id === active)?.id, [active])
  const [paramId, setParamId] = useQueryState("id")


  useEffect(() => {
    if (providedId) {
      const isExist = workspaces.items.find(item => item.id === providedId)
      if (isExist) {
        switchWorkspace(providedId)
        setParamId(providedId)
      }
    }
  }, [providedId])
  useEffect(() => {
    if (workspaceId) setParamId(workspaceId)
  }, [workspaceId])
  useEffect(() => api?.scrollTo(workspaceIndex, true), [api])
  useEffect(() => {
    if (!api) {
      return
    }
    api.scrollTo(workspaceIndex)
  }, [api, workspaceIndex])
  useEffect(() => {
    if (!api) {
      return
    }

    api.on("select", () => {
      const newIndex = api.selectedScrollSnap()
      const targetWorkspace = workspaces.items[newIndex]
      if (!targetWorkspace) return
      const newId = targetWorkspace.id
      switchWorkspace(newId)
    })
  }, [api])
  return (
    <Carousel
      setApi={setApi}
      className="w-full min-h-[calc(100dvh - 36px)] h-fit"
    >
      <CarouselContent>
        {
          workspaces
            .items
            .map(item => {
              return (
                <CarouselItem key={item.id} className="w-full min-h-[calc(100dvh - 36px)] h-fit">
                  <Suspense fallback={<WorkspaceLoader />}>
                    {item.component}
                  </Suspense>
                </CarouselItem>
              )
            })
        }
      </CarouselContent>
    </Carousel>
  )
}

export default WorkspacesContainer