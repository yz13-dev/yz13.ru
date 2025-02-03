import { get } from "@vercel/edge-config";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "mono/components/button";

const Website = async () => {
  const sign = await get<string>("price-sign");
  const priceObj = await get<{ [key: string]: number }>("prices");
  const price = priceObj?.website ?? 0;
  return (
    <>
      <span className="text-2xl font-medium">Сайты</span>
      <Button variant="secondary" className="gap-2" size="sm" disabled>
        От {price.toLocaleString()}
        {sign}
        <ArrowRightIcon size={16} />
      </Button>
      <div className="absolute left-6 rounded-xl top-[40%] overflow-hidden border-2 w-[150%] aspect-video"></div>
    </>
  );
};

export default Website;
