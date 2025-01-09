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
  | "in_testing"
  | "released";

const stageAsProgress: Record<ReleaseStage, number> = {
  in_plans: 0,
  in_progress: 25,
  in_testing: 50,
  in_review: 75,
  released: 100,
};

const finance: Release = {
  id: "finance",
  stage: "in_progress",
  name: "Finance",
  description: "App to track your spending",
  created_at: dayjs("2024-12-30").toString(),
  updated_at: dayjs("2024-12-30").toString(),
  icon: {
    dark: "/apps/yz-finance-dark.svg",
    light: "/apps/yz-finance-light.svg",
  },
};

const puzzle: Release = {
  id: "puzzle-game",
  stage: "in_plans",
  name: "Puzzle game",
  description: "Game where you have to solve a puzzle with friends",
  created_at: dayjs("2023-12-30").toString(),
  updated_at: dayjs("2024-12-30").toString(),
};

const drafts: Release = {
  id: "drafts",
  stage: "in_progress",
  name: "Drafts",
  description: "Design drafts",
  created_at: dayjs("2024-12-30").toString(),
  updated_at: dayjs("2024-12-30").toString(),
  icon: {
    dark: "/apps/yz-drafts-dark.svg",
    light: "/apps/yz-drafts-light.svg",
  },
};

export { drafts, finance, puzzle };

export const releases: Release[] = [puzzle, finance, drafts];

export const getStage: Record<ReleaseStage, string> = {
  in_plans: "В планах",
  in_progress: "В процессе",
  in_review: "На рассмотрении",
  in_testing: "Тестируется",
  released: "Выпущено",
};

export const getGroups = () => {
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

export const getReleaseProgress = (id: string) => {
  const release = getRelease(id);
  if (!release) return 0;
  return stageAsProgress[release.stage];
};

export const getRelease = (id: string) => {
  return releases.find((release) => release.id === id);
};
