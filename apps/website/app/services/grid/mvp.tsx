import { get } from "@vercel/edge-config";

const MVP = async () => {
  const sign = await get<string>("price-sign");
  const priceObj = await get<{ [key: string]: number }>("prices");
  const price = priceObj?.mvp ?? 0;
  return (
    <>
      <span className="text-lg font-medium text-secondary">
        Есть идея? Могу помочь вам с разработкой MVP, за{" "}
        {price.toLocaleString()}
        {sign}/месяц.
      </span>
    </>
  );
};

export default MVP;
