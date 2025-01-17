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
  name: "Финансы",
  description: "Сервис для отслеживания и управления финансовыми расходами",
  created_at: dayjs("2024-12-30").toString(),
  updated_at: dayjs("2024-12-30").toString(),
  icon: {
    dark: "/apps/yz-finance-dark.svg",
    light: "/apps/yz-finance-light.svg",
  },
};

const draft: Release = {
  id: "draft",
  stage: "in_progress",
  name: "Черновики",
  description: "Сервия для публикации черновиков ui-дизайнов",
  created_at: dayjs("2023-12-30").toString(),
  updated_at: dayjs("2024-12-30").toString(),
};

const puzzle: Release = {
  id: "puzzle-game",
  stage: "in_plans",
  name: "Пазл",
  description: "Игра по сброру пазлов",
  created_at: dayjs("2023-12-30").toString(),
  updated_at: dayjs("2024-12-30").toString(),
};

export { draft, finance, puzzle };

export const releases: Release[] = [puzzle, finance, draft];

export const getStage: Record<ReleaseStage, string> = {
  in_plans: "In plans",
  in_progress: "In progress",
  in_review: "In review",
  in_testing: "In testing",
  released: "Released",
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
