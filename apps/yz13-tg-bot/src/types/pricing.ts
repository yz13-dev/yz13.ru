export type Pricing = {
  created_at: string;
  description: string | null;
  details: DetailsExtra[];
  id: number;
  name: string | null;
  price: number;
  type: string | null;
};

type ExtraSingleItem = {
  type: "single";
};
type ExtraPerItem = {
  type: "per-item";
  per_item_label?: string;
  price_per_item?: number;
};

type DetailsExtra = {
  label?: string;
  price?: number;
} & (ExtraSingleItem | ExtraPerItem);
