import { get } from "@vercel/edge-config";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "mono/components/button";

const WebApps = async () => {
  const sign = await get<string>("price-sign");
  const price = await get<{ [key: string]: number }>("prices");
  return (
    <>
      <span className="text-2xl font-medium">Веб приложения</span>
      <Button variant="secondary" className="gap-2" size="sm" disabled>
        От {price?.["web-app"]}
        {sign}
        <ArrowRightIcon size={16} />
      </Button>
      <div className="absolute left-6 rounded-xl -bottom-6 border-2 border-dashed w-[125%] aspect-video" />
    </>
  );
};

export default WebApps;
