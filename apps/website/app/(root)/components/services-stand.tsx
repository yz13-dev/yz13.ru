"use client";
import type { Pricing } from "@yz13/api/types/pricing";
import {
  AppWindowIcon,
  ComponentIcon,
  GlobeIcon,
  PackageIcon,
  PanelTopIcon,
  SparklesIcon,
  StoreIcon,
} from "lucide-react";

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
  return services.map((service) => {
    const type = service.type as keyof typeof icons;
    const icon = type ? icons[type] : <StoreIcon />;
    return (
      <div key={service.id} className="space-y-3">
        <div className="flex items-center gap-2 [&>svg]:shrink-0 [&>svg]:size-5 text-foreground/60">
          {icon}
          <span className="text-base">{service.name ?? "Неизвестно"}</span>
        </div>
        <div className="*:block backdrop-blur-lg space-y-3 max-w-sm">
          <span className="text-2xl font-semibold">
            От {service.price.toLocaleString()}
            {sign}
          </span>
          <span className="text-base text-muted-foreground">
            {service.description ?? "Нет описания"}
          </span>
        </div>
      </div>
    );
  });
}
