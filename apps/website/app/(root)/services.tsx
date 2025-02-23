import { halfYearViewsChart } from "@/actions/charts/views";
import Banner from "@/components/banner";
import { showChart, showViews } from "@/const/flags";
import { get } from "@vercel/edge-config";
import { Button } from "mono/components/button";
import { Skeleton } from "mono/components/skeleton";
import Link from "next/link";
import { Suspense } from "react";
import { cn } from "yz13/cn";
import MVP from "../services/grid/mvp";
import Pages from "../services/grid/pages";
import WebApps from "../services/grid/web-apps";
import Website from "../services/grid/website";
import Chart from "./chart";

const Services = async () => {
  const isBusy = (await get<boolean>("busy")) ?? true;
  const chart = await showChart();
  const chartViews = await showViews();
  const views = chartViews ? await halfYearViewsChart() : null;
  return (
    <div className="w-full">
      <div className="max-w-screen-2xl w-full mx-auto border-x">
        <div className="h-fit flex items-center divide-x xl:!grid flex xl:!grid-cols-3 xl:!grid-rows-1 flex-col">
          <div
            className={cn(
              "relative w-full h-full col-span-2 bg-neutral-100",
              chart ? "p-0" : "p-3",
            )}
          >
            <Suspense
              fallback={<Skeleton className="aspect-video rounded-none" />}
            >
              {chart ? (
                <Chart views={views} />
              ) : (
                <Banner imageClassName="!static object-cover" />
              )}
            </Suspense>
          </div>
          <div className="w-full flex flex-col h-full justify-between">
            <div className="relative w-full space-y-3 p-3 h-full pattern-lines">
              <div className="w-full p-3 rounded-lg flex items-center gap-3 bg-background border justify-between">
                <Pages noBanner />
              </div>
              <div className="w-full p-3 rounded-lg flex items-center gap-3 bg-background border justify-between">
                <Website noBanner />
              </div>
              <div className="w-full p-3 rounded-lg flex items-center gap-3 bg-background border justify-between">
                <WebApps noBanner />
              </div>
              <div className="w-full p-3 rounded-lg flex items-center gap-3 bg-background border justify-between">
                <MVP />
              </div>
            </div>
            <div className="w-full flex items-center gap-3 p-3 bg-neutral-100 border-t">
              <Button className="w-1/2 h-10" variant="default" asChild>
                <Link href="/services">Все услуги</Link>
              </Button>
              <Button
                disabled={isBusy}
                className="w-1/2 h-10"
                variant="secondary"
                asChild={!isBusy}
              >
                {isBusy ? (
                  "Заказать услугу"
                ) : (
                  <Link href="/contact-me">Заказать услугу</Link>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Services;
