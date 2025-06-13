"use client";
import type { Pricing } from "@yz13/api/types/pricing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@yz13/ui/components/tabs";
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
  return (
    <Tabs defaultValue={defaultValue ?? undefined} className="space-y-6">
      <AnimatePresence>
        {
          services.map((service) => {
            const type = service.type as keyof typeof icons;
            const icon = type ? icons[type] : <StoreIcon key={`icon/${type}`} />;
            const content = service.description ?? "Нет описания";
            return (
              <TabsContent key={service.id} value={type} className="min-h-24">
                <motion.span
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-xl font-medium block"
                >
                  {content}
                </motion.span>
              </TabsContent>
            )
          })
        }
      </AnimatePresence>
      <div className="w-full overflow-x-auto">
        <TabsList>
          {
            services.map((service) => {
              const type = service.type as keyof typeof icons;
              const icon = type ? icons[type] : <StoreIcon />;
              return (
                <TabsTrigger key={service.id} value={type}>
                  {icon}
                  {service.name ?? "Неизвестно"}
                </TabsTrigger>
              )
            })
          }
        </TabsList>
      </div>
    </Tabs>
  )

}
