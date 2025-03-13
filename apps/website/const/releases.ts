import { Tables, TablesInsert } from "yz13/supabase/database";

export type ReleaseType = "app" | "widget";

type ReleaseIcon = {
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

export const getType: Record<ReleaseType, string> = {
  app: "Приложение",
  widget: "Виджет",
};

const stageAsProgress: Record<ReleaseStage, number> = {
  in_plans: 0,
  in_progress: 25,
  in_testing: 50,
  in_review: 75,
  released: 100,
};

export const getStage: Record<ReleaseStage, string> = {
  in_plans: "В планах",
  in_progress: "В разработке",
  in_review: "На обзоре",
  in_testing: "Тестируется",
  released: "Выпущено",
};

export const getGroups = (releases: Release[]) => {
  const groups: Record<ReleaseStage, Release[]> = {
    in_plans: [],
    in_progress: [],
    in_testing: [],
    in_review: [],
    released: [],
  };

  releases.forEach((release) => {
    groups[release.stage].push(release);
  });

  return groups;
};
