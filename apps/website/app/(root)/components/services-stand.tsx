"use client";
import type { Pricing } from "@yz13/api/types/pricing";
import { Button } from "@yz13/ui/components/button";
import {
  AppWindowIcon,
  ComponentIcon,
  GlobeIcon,
  PackageIcon,
  PanelTopIcon,
  SparklesIcon,
  StoreIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type Props = {
  sign?: string;
  services?: Pricing[];
};

const icons = {
  components: <ComponentIcon size={14} />,
  package: <PackageIcon size={14} />,
  pages: <PanelTopIcon size={14} />,
  website: <GlobeIcon size={14} />,
  "web-app": <AppWindowIcon size={14} />,
  mvp: <SparklesIcon size={14} />,
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
            <span className="text-lg font-medium">{selected.description ?? "Нет описания"}</span>
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
                size="sm"
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
