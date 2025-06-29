"use client"
import { Button } from "@yz13/ui/components/button";
import { LayoutGridIcon } from "lucide-react";
import { useCenterStore } from "./store";




export default function () {

  const switchOpen = useCenterStore((state) => state.switchOpen)

  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={switchOpen}
    >
      <LayoutGridIcon />
    </Button>
  )
}
