import dayjs from "dayjs";

type ReleaseType = "app" | "widget";

export type Release = {
  id: string;
  stage: ReleaseStage;
  type: ReleaseType;
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
  type: "app",
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
  type: "app",
  description: "Сервия для публикации черновиков ui-дизайнов",
  created_at: dayjs("2023-12-30").toString(),
  updated_at: dayjs("2024-12-30").toString(),
};

const puzzle: Release = {
  id: "puzzle-game",
  stage: "in_plans",
  name: "Пазл",
  type: "app",
  description: "Игра по сброру пазлов",
  created_at: dayjs("2023-12-30").toString(),
  updated_at: dayjs("2024-12-30").toString(),
};

const calendar_widget: Release = {
  id: "calendar-widget",
  stage: "in_review",
  name: "Календарь",
  type: "widget",
  description: "Виджет для отображения календаря",
  created_at: dayjs("2025-01-23").toString(),
  updated_at: dayjs("2025-01-23").toString(),
};

export { calendar_widget, draft, finance, puzzle };

export const releases: Release[] = [calendar_widget, puzzle, finance, draft];

export const getRelease = (id: string) => {
  return releases.find((release) => release.id === id);
};

export const getReleaseProgress = (id: string) => {
  const release = getRelease(id);
  if (!release) return 0;
  return stageAsProgress[release.stage];
};

export const orderedReleases = releases.sort((a, b) => {
  const aProgress = getReleaseProgress(a.id);
  const bProgress = getReleaseProgress(b.id);
  return bProgress - aProgress;
});

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
