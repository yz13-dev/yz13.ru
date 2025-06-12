"use client"

import { cn } from "@yz13/ui/cn";
import { Button } from "@yz13/ui/components/button";
import { useClickAway } from "ahooks";
import { ChevronLeftIcon } from "lucide-react";
import { useRef, useState } from "react";
import { setCode } from "../api/api";
import models, { type DockModel, getGroup } from "../const/models";

export default function ({ group, code }: { group: string, code?: string }) {
  const modelsGroup = getGroup(group, models);
  const [open, setOpen] = useState<boolean>(false);
  const [model, setModel] = useState<DockModel | null>(modelsGroup[0] ?? null);
  const isSelected = model?.code === code;
  const ref = useRef<HTMLDivElement>(null);
  useClickAway(() => {
    setOpen(false);
  }, ref);
  return (
    <div className="flex items-center gap-0.5">
      <div className="relative ">
        {
          open &&
          <div ref={ref} className="w-fit bottom-10 absolute py-2 left-0 right-0 mx-auto flex flex-col gap-2">
            {
              modelsGroup.map((model) => {
                return (
                  <Button
                    key={`${model.group}/${model.code}`}
                    onClick={() => {
                      setModel(model);
                      setOpen(false);
                      setCode(model.code);
                    }}
                    variant="secondary"
                  >
                    {model?.icon}
                  </Button>
                );
              })
            }
          </div>
        }
        <Button variant={isSelected ? "default" : "secondary"} onClick={() => {
          if (isSelected) setCode(null)
          else if (model) setCode(model.code)
        }}>
          {model?.icon}
        </Button>
      </div>
      <Button variant="ghost" className="!px-0.5 w-fit" onClick={() => setOpen(!open)}>
        <ChevronLeftIcon size={16} className={cn("transition-transform", open ? "rotate-90" : "")} />
      </Button>
    </div>
  )
}
