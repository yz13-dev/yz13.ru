"use client";
import { icons } from "@/const/pricing-icons";
import type { GetV1Pricing200Item } from "@yz13/api/types";
import { Button } from "@yz13/ui/components/button";
import {
  StoreIcon
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type Props = {
  sign?: string;
  services?: GetV1Pricing200Item[];
};

export default function ({ services = [], sign = "₽" }: Props) {
  const defaultValue = services[0]?.type;
  const [value, setValue] = useState<string | null>(defaultValue ?? null);
  const selected = services.find((service) => service.type === value);

  if (!services.length) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="text-muted-foreground text-sm">Нет сервисов</span>
      </div>
    )
  }
  return (
    <div className="space-y-6">
      <AnimatePresence>
        {
          selected &&
          <motion.div
            className="w-full h-fit min-h-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              duration: 0.75
            }}
          >
            <span className="text-xl text-muted-foreground font-medium">{selected.description ?? "Нет описания"}</span>
          </motion.div>
        }
      </AnimatePresence>
      <div className="w-full flex gap-2 flex-wrap items-start">
        {
          services.map((service) => {
            const type = service.type as keyof typeof icons;
            const icon = type ? icons[type] : <StoreIcon />;
            const isSelected = type === value;
            return (
              <Button
                key={service.id}
                value={type}
                variant={isSelected ? "default" : "secondary"}
                onClick={() => {
                  setValue(null)
                  setTimeout(() => setValue(type), 250)
                }}
                size="lg"
                className="text-base [&>svg]:!size-5"
              >
                {icon}
                {service.name ?? "Неизвестно"}
              </Button>
            )
          })
        }
      </div>
    </div>
  )

}
