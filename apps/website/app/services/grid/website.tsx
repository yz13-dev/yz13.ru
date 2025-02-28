import { get } from "@vercel/edge-config";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "mono/components/button";
import Image from "next/image";
import pages_dark from "public/works/pages/pages-dark.png";
import pages from "public/works/pages/pages-light.png";

const Website = async ({ noBanner = false }: { noBanner?: boolean }) => {
  const sign = await get<string>("price-sign");
  const priceObj = await get<{ [key: string]: number }>("prices");
  const price = priceObj?.website ?? 0;
  return (
    <>
      <span className="text-2xl font-medium">Сайты</span>
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
      {!noBanner && (
        <div className="absolute left-6 rounded-xl top-[40%] overflow-hidden border-2 w-[150%] aspect-video">
          <div className="w-full relative h-full rounded-xl">
            <Image
              placeholder="blur"
              src={pages_dark}
              alt="Обложка для услуги сайтов"
              className="object-cover dark-mode-image"
              fill
            />
            <Image
              placeholder="blur"
              src={pages}
              alt="Обложка для услуги сайтов"
              className="object-cover light-mode-image"
              fill
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Website;
