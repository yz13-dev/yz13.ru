import { DetailsExtra } from "@/app/(root)/components/services-details";

export const isPaid = (item: DetailsExtra) => {
  if (item.type === "single") return item.price !== undefined;
  else return item.price_per_item !== undefined;
};

export const getPricing = (item: DetailsExtra) => {
  if (item.type === "single") return item.price ?? 0;
  else return item.price_per_item ?? 0;
};
