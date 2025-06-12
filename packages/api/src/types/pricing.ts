import { Tables } from "@yz13/supabase/database";

export type Pricing = Tables<"pricing">;
export type ShortPricing = Omit<Tables<"pricing">, "details">;
