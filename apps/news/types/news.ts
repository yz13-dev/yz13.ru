import { Tables } from "yz13/supabase/database";

export type Article = Tables<"news">;
export type NewsSource = Tables<"news_sources">;
