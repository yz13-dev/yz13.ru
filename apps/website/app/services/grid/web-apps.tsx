import { get } from "@vercel/edge-config";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "mono/components/button";
import Image from "next/image";
import web_app_dark from "public/works/reservia/map-editor-page-dark.png";
import web_app from "public/works/reservia/map-editor-page.png";

const WebApps = async () => {
  const sign = await get<string>("price-sign");
  const priceObj = await get<{ [key: string]: number }>("prices");
  const price = priceObj?.["web-app"] ?? 0;
  return (
    <>
      <span className="text-2xl font-medium">Веб приложения</span>
      <Button
        variant="secondary"
        className="gap-2 rounded-full"
        size="sm"
        disabled
      >
        От {price.toLocaleString()}
        {sign}
        <ArrowRightIcon size={16} />
      </Button>
      <div className="absolute left-6 rounded-xl top-[40%] overflow-hidden border-2 w-[150%] aspect-video">
        <div className="w-full relative h-full rounded-xl">
          <Image
            placeholder="blur"
            src={web_app_dark}
            alt="Обложка для услуги веб-приложений"
            className="object-cover dark-mode-image"
            fill
          />
          <Image
            placeholder="blur"
            src={web_app}
            alt="Обложка для услуги веб-приложений"
            className="object-cover light-mode-image"
            fill
          />
        </div>
      </div>
    </>
  );
};

export default WebApps;
