import { Button } from "@yz13/ui/components/button";
import { ReactNode } from "react";


export default function ({ children }: { children?: ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <div className="lg:flex hidden items-center gap-2">
        <Button variant="secondary">История обновлений</Button>
        <Button variant="secondary">Блог</Button>
      </div>
      {children}
    </div>
  )
}
