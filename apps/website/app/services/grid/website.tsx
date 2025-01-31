import { get } from "@vercel/edge-config";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "mono/components/button";

const Website = async () => {
  const sign = await get<string>("price-sign");
  const price = await get<{ [key: string]: number }>("prices");
  return (
    <>
      <span className="text-2xl font-medium">Сайты</span>
      <Button variant="secondary" className="gap-2" size="sm" disabled>
        От {price?.website ?? 0}
        {sign}
        <ArrowRightIcon size={16} />
      </Button>
      <div className="absolute left-0 right-0 mx-auto rounded-xl top-1/2 border-2 border-dashed w-3/4 aspect-square" />
    </>
  );
};

export default Website;
