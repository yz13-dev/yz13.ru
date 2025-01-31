import { get } from "@vercel/edge-config";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "mono/components/button";

const Pages = async () => {
  const sign = await get<string>("price-sign");
  const priceObj = await get<{ [key: string]: number }>("prices");
  const price = priceObj?.["landing-page"] ?? 0;
  return (
    <>
      <span className="text-2xl font-medium">Страницы</span>
      <Button variant="secondary" className="gap-2" size="sm" disabled>
        От {price.toLocaleString()}
        {sign}
        <ArrowRightIcon size={16} />
      </Button>
      <div className="absolute left-0 right-0 mx-auto rounded-xl top-1/3 border-2 border-dashed w-3/4 aspect-[9/16]" />
    </>
  );
};

export default Pages;
