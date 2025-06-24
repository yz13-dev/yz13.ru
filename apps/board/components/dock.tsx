"use client";
import { MousePointer2Icon } from "lucide-react";
import { Button } from "@yz13/ui/components/button";
import { setCode } from "../api/api";
import { useMapApi } from "../api/api-provider";
import DockGroup from "./dock-group";

export default function () {
  const code = useMapApi(state => state.targetCode);
  return (
    <footer className="fixed bottom-6 left-0 bg-background/60 backdrop-blur-sm rounded-md w-fit border right-0 mx-auto p-1 flex items-center gap-1">
      <Button variant={!code ? "default" : "secondary"}
        onClick={() => setCode(null)}
      >
        <MousePointer2Icon size={16} /></Button>
      <DockGroup group="shapes" code={code ?? undefined} />
      <DockGroup group="lines" code={code ?? undefined} />
    </footer>
  )
}
