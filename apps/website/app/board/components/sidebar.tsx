"use client"
import { ArrowLeftIcon, FileIcon, PlusIcon, StoreIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Separator } from "mono/components/separator";
import Link from "next/link";
import { useMapApi } from "../api/api-provider";
import { getGridCoords } from "../api/canvas-api";

export default function ({ id }: { id: string }) {
  return (
    <aside className="absolute [&>div>button]:h-10 max-w-2xs w-full *:bg-card/60 *:backdrop-blur-sm top-0 left-0 p-4 space-y-2">
      <div className="p-1 rounded-md flex items-center gap-1 border bg-card">
        <Button size="icon" variant="secondary" className="shrink-0 w-10" asChild>
          <Link href="/">
            <ArrowLeftIcon size={16} />
          </Link>
        </Button>
        <Button className="w-full shrink" variant="outline">
          Board - #{id.slice(0, 6)}
        </Button>
      </div>
      <div className="p-1 rounded-md grid grid-cols-2 gap-1 border bg-card">
        <Button variant="secondary">
          <StoreIcon size={16} />
        </Button>
        <Button variant="secondary">
          <StoreIcon size={16} />
        </Button>

        <Button variant="secondary">
          <StoreIcon size={16} />
        </Button>
        <Button variant="secondary">
          <StoreIcon size={16} />
        </Button>

        <Button variant="secondary">
          <StoreIcon size={16} />
        </Button>
        <Button variant="secondary">
          <StoreIcon size={16} />
        </Button>
      </div>
      <Coorinates />
      <View />
      <Grid />
      <div className="p-1 rounded-md border bg-card">
        <span className="px-4 py-2 block">Personal</span>
        <Separator />
        <div className="*:w-full pt-1 space-y-1">
          <Button variant="ghost" className="justify-start"><PlusIcon size={16} />New tab</Button>
          <Button variant="ghost" className="justify-start"><FileIcon size={16} />Tab</Button>
        </div>
      </div>
    </aside>
  )
}


function Coorinates() {
  const cursor = useMapApi((state) => state.cursor);
  return (
    <div className="p-1 rounded-md grid grid-cols-2 gap-1 border bg-card">
      <Button variant="secondary">X:{cursor.x}</Button>
      <Button variant="secondary">Y:{cursor.y}</Button>
    </div>
  )
}

function View() {
  const view = useMapApi((state) => state.view);
  return (
    <div className="p-1 rounded-md grid grid-cols-2 gap-1 border bg-card">
      <Button variant="secondary">X:{view.x}</Button>
      <Button variant="secondary">X2:{view.x + view.width}</Button>
      <Button variant="secondary">Y:{view.y}</Button>
      <Button variant="secondary">Y2:{view.y + view.height}</Button>
    </div>
  )
}

function Grid() {
  const offset = useMapApi((state) => state.offset);
  const coords = getGridCoords(-offset.x, -offset.y);

  const startX = coords.x1
  const startY = coords.y1
  const endX = coords.x2
  const endY = coords.y2
  return (
    <div className="p-1 rounded-md grid grid-cols-2 gap-1 border bg-card">
      <Button variant="secondary">X:{startX}</Button>
      <Button variant="secondary">X2:{endX}</Button>
      <Button variant="secondary">Y:{startY}</Button>
      <Button variant="secondary">Y2:{endY}</Button>
    </div>
  )
}
