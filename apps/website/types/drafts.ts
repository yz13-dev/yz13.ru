import { Tables } from "yz13/supabase/database";

export type Attachment = {
  id: number;
  url: string;
  size: number;
  type: string;
  created_at: string;
};

export type Draft = Tables<"drafts">;
