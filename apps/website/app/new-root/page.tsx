import { Logo } from "@/components/logo";
import User from "@/components/user";
import { showUser } from "@/const/flags";
import { get } from "@vercel/edge-config";
import {
  AppWindowIcon,
  GlobeIcon,
  InfoIcon,
  PanelTopIcon,
  SparklesIcon,
} from "lucide-react";
import { Badge } from "mono/components/badge";
import { Button } from "mono/components/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "mono/components/popover";
import { Skeleton } from "mono/components/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "mono/components/table";
import { Fragment, Suspense } from "react";
import { getShortPricing } from "rest-api/pricing";

export default async function page() {
  const { data: services } = await getShortPricing();
  const sign = await get<string>("price-sign");
  return (
    <>
      <header className="w-full max-w-screen-2xl border-b px-6 mx-auto h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo size={{ width: 48, height: 48 }} type="only-icon" />
        </div>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="secondary">Услуги</Button>
            </PopoverTrigger>
            <PopoverContent className="max-w-dvw max-h-96 overflow-y-auto divide-y w-[520px] p-0 rounded-3xl">
              <div className="w-full px-4 h-12 flex items-center">
                <span className="text-base font-medium">Услуги</span>
              </div>
              <Table className="w-full">
                <TableHeader className="px-0">
                  <TableRow className="divide-x h-10">
                    <TableHead className="w-10 p-0 shrink-0">
                      <div className="size-10 flex items-center justify-center">
                        <InfoIcon size={18} />
                      </div>
                    </TableHead>
                    <TableHead className="w-1/2">
                      <span>Название</span>
                    </TableHead>
                    <TableHead className="w-1/2">
                      <span>Цена</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(services ?? [])
                    .sort((a, b) => a.price - b.price)
                    .map((service) => {
                      // const details = service.details;
                      return (
                        <Fragment key={service.id}>
                          <TableRow className="h-10 divide-x">
                            <TableCell className="w-10 p-0 shrink-0">
                              <div className="size-10 flex items-center justify-center">
                                {service.type === "pages" && (
                                  <PanelTopIcon size={18} />
                                )}
                                {service.type === "website" && (
                                  <GlobeIcon size={18} />
                                )}
                                {service.type === "web-app" && (
                                  <AppWindowIcon size={18} />
                                )}
                                {service.type === "mvp" && (
                                  <SparklesIcon size={18} />
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="w-1/2">
                              <span>{service.name}</span>
                            </TableCell>
                            <TableCell className="w-1/2">
                              <Badge variant="secondary" className="text-sm">
                                {service.price.toLocaleString()}₽
                              </Badge>
                            </TableCell>
                          </TableRow>
                          {/* {false &&
                          details
                            .sort((aItem, bItem) => {
                              const a = aItem as ExtraItem;
                              const b = bItem as ExtraItem;
                              if (isPaid(a) && isPaid(b))
                                return getPricing(b) - getPricing(a);
                              if (isPaid(a)) return -1;
                              if (isPaid(b)) return 1;
                              return 0;
                            })
                            .map((detail, index) => {
                              const item = detail as ExtraItem;
                              const paid = isPaid(item);
                              const label = item.label ?? "Неизвестно";
                              const type = item.type ?? "single";
                              const price =
                                type === "single" && (item.price ?? 0);
                              const per_item_price = item.price_per_item ?? 0;
                              const priceTag = `+${price.toLocaleString()}${sign}`;
                              const perItemTag = `+${per_item_price.toLocaleString()}${sign}/${item.per_item_label ?? "шт"}`;
                              return (
                                <TableRow
                                  className="h-10 divide-x"
                                  key={`${service.id}-${index}`}
                                >
                                  <TableCell className="w-10 p-0 shrink-0">
                                    <div className="size-10 flex items-center justify-center">
                                      {paid ? (
                                        <PlusIcon
                                          size={16}
                                          className="shrink-0"
                                        />
                                      ) : (
                                        <CheckIcon
                                          size={16}
                                          className="shrink-0"
                                        />
                                      )}
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <span className="w-full line-clamp-1 overflow-ellipsis">
                                      {label.length > 30
                                        ? `${label.slice(0, 30)}...`
                                        : label}
                                    </span>
                                  </TableCell>
                                  {type === "single" && (
                                    <TableCell className="w-1/2">
                                      <Badge
                                        variant="secondary"
                                        className="text-sm"
                                      >
                                        {price === 0 ? "Бесплатно" : priceTag}
                                      </Badge>
                                    </TableCell>
                                  )}
                                  {type === "per-item" && (
                                    <TableCell className="w-1/2">
                                      <Badge
                                        variant="secondary"
                                        className="text-sm"
                                      >
                                        {per_item_price === 0
                                          ? "Бесплатно"
                                          : perItemTag}
                                      </Badge>
                                    </TableCell>
                                  )}
                                </TableRow>
                              );
                            })} */}
                        </Fragment>
                      );
                    })}
                </TableBody>
              </Table>
              {false && (
                <div className="w-full px-1.5 h-12 flex items-center justify-end">
                  <Button variant="secondary">Показать все</Button>
                </div>
              )}
            </PopoverContent>
          </Popover>
          <Suspense fallback={<Skeleton className="h-9 w-[75px]" />}>
            {(await showUser()) && <User />}
          </Suspense>
        </div>
      </header>
    </>
  );
}
