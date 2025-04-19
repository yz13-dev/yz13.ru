import { availableForWork } from "@/const/flags";
import { getPricing, isPaid } from "@/lib/pricing";
import { get } from "@vercel/edge-config";
import {
  AppWindowIcon,
  CheckIcon,
  GlobeIcon,
  LucideIcon,
  PanelTopIcon,
  PlusIcon,
  SparklesIcon,
} from "lucide-react";
import { Button } from "mono/components/button";
import { Separator } from "mono/components/separator";
import { getFullPricing } from "rest-api/pricing";
import { cn } from "yz13/cn";

const Details = ({
  children,
  className = "",
  active = false,
}: {
  children?: React.ReactNode;
  className?: string;
  active?: boolean;
}) => {
  return (
    <div
      className={cn(
        "w-full relative space-y-3",
        "group flex flex-col justify-between",
        active && "bg-neutral-100",
        className,
      )}
    >
      {children}
    </div>
  );
};

const DetailsHeader = ({
  icon,
  title = "",
  price = "",
  showPrice = false,
}: {
  showPrice?: boolean;
  icon?: React.ReactNode;
  title?: string;
  price?: string;
}) => {
  return (
    <div className="flex flex-row justify-between items-center gap-2">
      <div className="flex flex-row items-center gap-2">
        {icon && (
          <div className="size-4 flex items-center justify-center [&>svg]:size-4">
            {icon}
          </div>
        )}
        <span className="font-medium text-base relative line-clamp-1">
          {title}
        </span>
      </div>
      {showPrice && (
        <span className="text-foreground shrink-0 font-semibold px-2 py-0 rounded-full bg-secondary/10 border">
          {price}
        </span>
      )}
    </div>
  );
};

const DetailsDescription = ({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <span className={cn("text-muted-foreground block text-base", className)}>
      {children}
    </span>
  );
};

type ExtraSingleItem = {
  type: "single";
  price?: number;
};
type ExtraPerItem = {
  type: "per-item";
  per_item_label?: string;
  price_per_item?: number;
};
export type ExtraItem = {
  label?: string;
  type: "single" | "per-item";
  price?: number;
  per_item_label?: string;
  price_per_item?: number;
};

export type DetailsExtra = {
  icon?: LucideIcon;
  label?: string;
  price?: number;
} & (ExtraSingleItem | ExtraPerItem);

const DetailsExtraList = async ({ list = [] }: { list?: DetailsExtra[] }) => {
  const sign = await get<string>("price-sign");
  return (
    <ul className="w-full space-y-2">
      {list
        .sort((a, b) => {
          if (isPaid(a) && isPaid(b)) return getPricing(b) - getPricing(a);
          if (isPaid(a)) return -1;
          if (isPaid(b)) return 1;
          return 0;
        })
        .map((item, index) => {
          const { label, price, type } = item;
          const paid = isPaid(item);
          return (
            <li className="w-full" key={`${label}-${index}`}>
              <div className="flex flex-row justify-between items-center gap-2 text-foreground group-hover:text-foreground/80 hover:text-foreground">
                <div className="w-fit flex items-center justify-between gap-2">
                  {paid ? (
                    <PlusIcon size={16} className="shrink-0" />
                  ) : (
                    <CheckIcon size={16} className="shrink-0" />
                  )}
                  <span className="text-sm">{label}</span>
                </div>
                {type === "single" && price && (
                  <span className="text-sm">
                    +{(price ?? 0).toLocaleString()}
                    {sign}
                  </span>
                )}
                {type === "per-item" && item.price_per_item && (
                  <span className="text-sm">
                    +{(item.price_per_item ?? 0).toLocaleString()}
                    {sign}/{item.per_item_label ?? "шт"}
                  </span>
                )}
              </div>
            </li>
          );
        })}
    </ul>
  );
};

const DetailsFooter = ({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex h-14 flex-row mt-auto justify-between items-end gap-2",
        className,
      )}
    >
      {children}
    </div>
  );
};

const ServiceBlank = () => {
  return (
    <Details className="justify-center items-center">
      <div className="size-10 rounded-lg border flex items-center justify-center">
        <PlusIcon size={20} className="text-foreground" />
      </div>
      <span className="text-center text-xl font-medium text-foreground">
        Новые услуги, скоро...
      </span>
    </Details>
  );
};

const ServicesDetails = async () => {
  const { data: services } = await getFullPricing();
  const sign = await get<string>("price-sign");
  const busy = await availableForWork();
  return (
    <>
      {(services ?? [])
        .sort((a, b) => a.price - b.price)
        .map((service, index) => {
          const price = service.price;
          return (
            <Details key={`${service.id}-${index}`}>
              <div className="space-y-0 *:max-w-4xl">
                <DetailsHeader
                  icon={
                    <>
                      {service.type === "pages" && <PanelTopIcon size={18} />}
                      {service.type === "website" && <GlobeIcon size={18} />}
                      {service.type === "web-app" && (
                        <AppWindowIcon size={18} />
                      )}
                      {service.type === "mvp" && <SparklesIcon size={18} />}
                    </>
                  }
                  title={service.name ?? "Неизвестно"}
                  price={`${price.toLocaleString()}${sign}+`}
                />
                <DetailsDescription className="mt-2">
                  {service.description}
                </DetailsDescription>
              </div>
              {false && (
                <>
                  <Separator />
                  <DetailsExtraList
                    list={service.details as unknown as DetailsExtra[]}
                  />
                  <DetailsFooter>
                    <Button
                      disabled={busy}
                      variant="secondary"
                      className="w-full"
                    >
                      Связаться
                    </Button>
                  </DetailsFooter>
                </>
              )}
            </Details>
          );
        })}
      {false && <ServiceBlank />}
    </>
  );
};

export default ServicesDetails;
