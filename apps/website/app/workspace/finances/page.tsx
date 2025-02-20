import { get } from "@vercel/edge-config";

const page = async () => {
  const sign = await get<string>("price-sign");
  return (
    <>
      <h1 className="text-2xl font-medium text-foreground">Финансы</h1>
      <div className="w-full">
        <span className="text-base font-medium text-secondary block">
          Последние платежи
        </span>
        <div className="w-full h-48 flex gap-3 py-3 overflow-x-auto">
          <div className="h-full aspect-video border rounded-lg p-3">
            <span className="text-base font-medium text-secondary block">
              Всего
            </span>
            <span className="text-2xl font-medium text-foreground">
              0{sign}
            </span>
          </div>
          <div className="h-full aspect-video border rounded-lg p-3">
            <span className="text-base font-medium text-secondary block">
              Последний заказ
            </span>
            <span className="text-2xl font-medium text-foreground">
              0{sign}
            </span>
          </div>
          <div className="h-full aspect-video border rounded-lg p-3">
            <span className="text-base font-medium text-secondary block">
              Большой заказ
            </span>
            <span className="text-2xl font-medium text-foreground">
              0{sign}
            </span>
          </div>
          <div className="h-full aspect-video border rounded-lg p-3">
            <span className="text-base font-medium text-secondary block">
              Маленький заказ
            </span>
            <span className="text-2xl font-medium text-foreground">
              0{sign}
            </span>
          </div>
        </div>
      </div>
      <div className="w-full space-y-2">
        <span className="text-base font-medium text-secondary block">
          История платежей
        </span>
      </div>
    </>
  );
};

export default page;
