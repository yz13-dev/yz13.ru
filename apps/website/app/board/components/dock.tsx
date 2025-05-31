import { HandIcon, MousePointer2Icon, SquareIcon, TypeOutlineIcon } from "lucide-react";
import { Button } from "mono/components/button";

export default function () {
  return (
    <footer className="fixed bottom-6 left-0 bg-background/60 backdrop-blur-sm rounded-md w-fit border right-0 mx-auto p-1 flex items-center gap-1">
      <Button variant="secondary"><HandIcon size={16} /></Button>
      <Button variant="secondary"><MousePointer2Icon size={16} /></Button>
      <Button variant="secondary"><SquareIcon size={16} /></Button>
      <Button variant="secondary"><TypeOutlineIcon size={16} /></Button>
    </footer>
  )
}
