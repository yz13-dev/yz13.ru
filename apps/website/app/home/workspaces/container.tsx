"use client"

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "mono/components/carousel"
import { useEffect, useMemo, useState } from "react"
import { workspaces } from "../const/workspaces"
import useWorkspaceStore, { switchWorkspace } from "../store/workspace.store"

const WorkspacesContainer = () => {
  const [api, setApi] = useState<CarouselApi>()
  const { active } = useWorkspaceStore()

  const workspaceIndex = useMemo(() => workspaces.items.findIndex(item => item.id === active), [active])

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
      defaultValue={workspaceIndex}
      className="w-full min-h-screen"
    >
      <CarouselContent>
        {
          workspaces.items.map(item => {
            return (
              <CarouselItem key={item.id} className="w-full h-full">
                {item.component}
              </CarouselItem>
            )
          })
        }
      </CarouselContent>
    </Carousel>
  )
}

export default WorkspacesContainer