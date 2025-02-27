import { cn } from "yz13/cn";

const MVP = ({ className = "" }: { className?: string }) => {
  // const sign = await get<string>("price-sign");
  // const priceObj = await get<{ [key: string]: number }>("prices");
  // const price = priceObj?.mvp ?? 0;
  return (
    <>
      <span className={cn("text-lg font-medium text-secondary", className)}>
        Могу помочь вам с разработкой MVP, условия и оплата завистимости от
        проекта.
      </span>
    </>
  );
};

export default MVP;
