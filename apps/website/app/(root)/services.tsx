import Banner from "@/components/banner";
import { get } from "@vercel/edge-config";
import { Button } from "mono/components/button";
import MVP from "../services/grid/mvp";
import Pages from "../services/grid/pages";
import WebApps from "../services/grid/web-apps";
import Website from "../services/grid/website";

const Services = async () => {
  const isBusy = await get<boolean>("busy");
  return (
    <div className="w-full">
      <div className="max-w-screen-2xl w-full mx-auto border-x">
        <div className="h-fit flex items-center divide-x xl:!grid flex xl:!grid-cols-3 xl:!grid-rows-1 flex-col">
          <div className="relative w-full h-full col-span-2 p-3 bg-neutral-100">
            <Banner imageClassName="!static object-cover" />
          </div>
          <div className="w-full flex flex-col h-full justify-between">
            <div className="relative w-full space-y-3 p-3 h-full pattern-lines">
              <div className="w-full p-3 rounded-lg flex items-center gap-3 bg-background border justify-between">
                <Website noBanner />
              </div>
              <div className="w-full p-3 rounded-lg flex items-center gap-3 bg-background border justify-between">
                <Pages noBanner />
              </div>
              <div className="w-full p-3 rounded-lg flex items-center gap-3 bg-background border justify-between">
                <WebApps noBanner />
              </div>
              <div className="w-full p-3 rounded-lg flex items-center gap-3 bg-background border justify-between">
                <MVP />
              </div>
            </div>
            <div className="w-full flex items-center gap-3 p-3 bg-neutral-100 border-t">
              <Button className="w-1/2" variant="default">
                Все услуги
              </Button>
              <Button disabled={isBusy} className="w-1/2" variant="secondary">
                Заказать услугу
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Services;
