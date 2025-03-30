import { Tables, TablesInsert } from "yz13/supabase/database";

export type NewsSource = Tables<"news_sources">;
export type Article = Tables<"news">;
export type NewArticle = TablesInsert<"news">;
export type ParseRules = Tables<"parse_rules">;
