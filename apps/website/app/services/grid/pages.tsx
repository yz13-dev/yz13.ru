import { get } from "@vercel/edge-config";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "mono/components/button";
import Image from "next/image";
import pages_dark from "public/works/yz13/yz13-page-dark.png";
import pages from "public/works/yz13/yz13-page.png";

const Pages = async ({ noBanner = false }: { noBanner?: boolean }) => {
  const sign = await get<string>("price-sign");
  const priceObj = await get<{ [key: string]: number }>("prices");
  const price = priceObj?.["landing-page"] ?? 0;
  return (
    <>
      <span className="text-2xl font-medium">Страницы</span>
      <Button
        variant="secondary"
        className="gap-2 rounded-full"
        size="sm"
        disabled={true}
      >
        От {price.toLocaleString()}
        {sign}
        <ArrowRightIcon size={16} />
      </Button>
      {!noBanner && (
        <div className="absolute left-0 right-0 mx-auto rounded-xl overflow-hidden top-1/4 border-2 w-[90%] aspect-[9/17]">
          <div className="w-full relative h-full rounded-xl">
            <Image
              placeholder="blur"
              src={pages_dark}
              alt="Обложка для услуги страниц"
              className="object-cover dark-mode-image"
              fill
            />
            <Image
              placeholder="blur"
              src={pages}
              alt="Обложка для услуги страниц"
              className="object-cover light-mode-image"
              fill
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Pages;
