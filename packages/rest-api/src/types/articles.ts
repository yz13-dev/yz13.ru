import { Tables, TablesInsert } from "yz13/supabase/database";

export type NewsSource = Tables<"news_sources">;
export type Article = Tables<"news"> & {
  news_source: NewsSource;
};
export type NewArticle = TablesInsert<"news">;
