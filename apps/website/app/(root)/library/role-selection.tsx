"use client"
import { Checkbox } from "mono/components/checkbox"
import { Label } from "mono/components/label"
import { RadioGroup, RadioGroupItem } from "mono/components/radio-group"
import { ReactNode, useState } from "react"
import { cn } from "yz13/cn"
import { generateUniqueId } from "../../terminal/terminal.api"


const frontend = [
  {
    checked: true,
    id: generateUniqueId(),
    name: "Website",
  },
  {
    checked: true,
    id: generateUniqueId(),
    name: "Componets",
  },
  {
    checked: true,
    id: generateUniqueId(),
    name: "UI-kit",
  },
  {
    checked: true,
    id: generateUniqueId(),
    name: "Authentication",
  },
  {
    checked: true,
    id: generateUniqueId(),
    name: "Request work",
  },
]
const backend = [
  {
    checked: true,
    id: generateUniqueId(),
    name: "REST-API",
  },
]
const fullstack = [...frontend, ...backend]

type RoleProps = {
  className?: string
  selected?: string
  value: string
  name: string
  content: ReactNode
}
const Role = ({ className = "", selected, name, content, value }: RoleProps) => {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className={cn(
        "border w-full rounded-xl p-3 flex flex-row items-start gap-2 hover:bg-yz-neutral-200",
        selected === "value" ? "border-foreground" : "hover:border-yz-neutral-300"
      )}>
        <RadioGroupItem value="frontend" id={value} className="mt-1" />
        <div className="w-full space-y-1">
          <Label htmlFor={value} className="text-sm">{name}</Label>
        </div>
      </div>
      <div className="w-full h-fit rounded-xl border p-3">
        <ul className="space-y-2">
          {content}
        </ul>
      </div>
    </div>
  )
}

const RoleSelection = ({ className = "" }: { className?: string }) => {
  const [selected, setSelected] = useState<string>("frontend")
  return (
    <RadioGroup
      defaultValue="frontend"
      value={selected}
      onValueChange={(value) => setSelected(value)}
      className={cn("w-fit h-fit flex items-start justify-between gap-2", className)}
    >
      <Role className="w-full"
        selected={selected}
        value="frontend"
        name="Frontend"
        content={
          frontend.map((item, index) => (
            <li key={"frontend" + "-" + item.id}>
              <div className={cn("flex items-center gap-2", selected === "frontend" ? "opacity-100" : "opacity-25")}>
                <Checkbox checked={item.checked} aria-readonly="true" className="rounded-full" />
                <span className="text-sm">{item.name}</span>
              </div>
            </li>
          ))
        }
      />
    </RadioGroup>
  )
}

export default RoleSelection
