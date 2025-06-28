"use client";

import { GetV1PricingShort200Item } from "@yz13/api/types";
import { Button } from "@yz13/ui/components/button";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@yz13/ui/components/navigation-menu";
import {
  AppWindowIcon,
  GlobeIcon,
  PanelTopIcon,
  SparklesIcon,
} from "lucide-react";
import Link from "next/link";

type ShortPricing = GetV1PricingShort200Item;

type ServicesProps = {
  busy?: boolean;
  services?: ShortPricing[];
  sign?: string;
};

const Services = ({
  sign = "$",
  busy = false,
  services = [],
}: ServicesProps) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="rounded-full bg-background/50">
        Услуги
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="w-[600px] grid grid-cols-2 gap-4 p-4">
          {services
            .sort((a, b) => a.price - b.price)
            .map((service) => {
              return (
                <div key={service.id} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      {service.type === "pages" && <PanelTopIcon size={18} />}
                      {service.type === "website" && <GlobeIcon size={18} />}
                      {service.type === "web-app" && (
                        <AppWindowIcon size={18} />
                      )}
                      {service.type === "mvp" && <SparklesIcon size={18} />}
                      <span className="font-medium relative line-clamp-1">
                        {service.name}
                      </span>
                    </div>
                    <span className="text-foreground shrink-0 font-semibold px-2 py-0 rounded-full bg-secondary/10 border">
                      {service.price.toLocaleString()} {sign}+
                    </span>
                  </div>
                  <span className="text-foreground block text-sm">
                    {service.description}
                  </span>
                </div>
              );
            })}
          <div>
            <Button className="w-full h-10" variant="default" asChild>
              <Link href="/services">Все услуги</Link>
            </Button>
          </div>
          <div>
            <Button
              disabled={busy}
              className="w-full h-10"
              variant="secondary"
              asChild={!busy}
            >
              {busy ? (
                "Заказать услугу"
              ) : (
                <Link href="/contact-me">Заказать услугу</Link>
              )}
            </Button>
          </div>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default Services;
