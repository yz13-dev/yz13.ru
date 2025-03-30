import { Tables, TablesInsert } from "yz13/supabase/database";

export type ReleaseType = "app" | "widget";

export type ReleaseIcon = {
  dark: string;
  light: string;
};

export type Release = Tables<"works">;

export type NewRelease = TablesInsert<"works">;

export type ReleaseStage =
  | "in_plans"
  | "in_progress"
  | "in_review"
  | "in_testing"
  | "released";
