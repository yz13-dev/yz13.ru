import { Tables } from "yz13/supabase/database";

export type Attachment = {
  id: string;
  url: string;
  size: number;
  content_type: string;
  created_at: string;
};

export type Draft = Tables<"drafts">;
