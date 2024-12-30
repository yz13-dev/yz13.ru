import dayjs from "dayjs";

export type Release = {
  id: string;
  stage: ReleaseStage;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  icon?: {
    dark: string;
    light: string;
  };
};

export type ReleaseStage =
  | "in_plans"
  | "in_progress"
  | "in_review"
  | "released";

const finance: Release = {
  id: "finance",
  stage: "in_progress",
  name: "Finance",
  description: "App to track your spending",
  created_at: dayjs("2024-12-30").toString(),
  updated_at: dayjs("2024-12-30").toString(),
};

const puzzle: Release = {
  id: "puzzle-game",
  stage: "in_plans",
  name: "Puzzle game",
  description: "Game where you have to solve a puzzle with friends",
  created_at: dayjs("2023-12-30").toString(),
  updated_at: dayjs("2024-12-30").toString(),
};

export { finance, puzzle };

export const releases: Release[] = [puzzle, finance];

export const getStage: Record<ReleaseStage, string> = {
  in_plans: "In plans",
  in_progress: "In progress",
  in_review: "In review",
  released: "Released",
};

export const getGroups = () => {
  const groups: Record<ReleaseStage, Release[]> = {
    in_plans: [],
    in_progress: [],
    in_review: [],
    released: [],
  };

  releases.forEach((release) => {
    groups[release.stage].push(release);
  });

  return groups;
};

export const getRelease = (id: string) => {
  return releases.find((release) => release.id === id);
};
