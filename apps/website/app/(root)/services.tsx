import { showChart, showChartData } from "@/const/flags";
import { get } from "@vercel/edge-config";
import Pages from "../services/grid/pages";
import WebApps from "../services/grid/web-apps";
import Website from "../services/grid/website";

const Services = async () => {
  const isBusy = (await get<boolean>("busy")) ?? true;
  const chart = await showChart();
  const enableChartData = await showChartData();
  return (
    <div className="w-full">
      <div className="max-w-screen-2xl w-full mx-auto border-x grid lg:grid-cols-4 grid-cols-2 gap-4">
        <div className="w-full p-3 peer flex items-center gap-3 justify-between">
          <Pages noBanner />
        </div>
        <div className="w-full p-3 peer flex items-center gap-3 justify-between">
          <Website noBanner />
        </div>
        <div className="w-full p-3 peer flex items-center gap-3 justify-between">
          <WebApps noBanner />
        </div>
        <div className="w-full p-3 peer flex items-center justify-between gap-1.5">
          <span className="text-2xl font-medium line-clamp-1">MVP</span>
        </div>
        {/* <div className="w-full flex items-center gap-3 p-3 bg-neutral-100 border-t">
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
        </div> */}
      </div>
    </div>
  );
};
export default Services;
