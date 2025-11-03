import { ExperienceItemType, WorkExperience } from "@/components/work-expirience";

const WORK_EXPERIENCE: ExperienceItemType[] = [
  {
    id: "quaric",
    companyName: "Reservia",
    positions: [
      {
        id: "30d3a9fb-021d-452a-9d27-83655369b4b9",
        title: "Фронтенд разработчик",
        employmentPeriod: "09.2024 — 11.2025 (1 год 3 месяца)",
        // employmentType: "Проектная работа",
        employmentVariant: "vertical",
        icon: "code",
        description: `
Проект был построен на базе Next.js, а также использовал TailwindCSS для создания компонентов и стилей. Но позднее было решено перейти на Vite + ReactRouter.

В рамках проекта были выполнены и разработаны следующие функции:
- Редактор карты заведений.
- Разработка и написание фронта.
- Фикс багов и оптимизация кода.
- Подключение к API сервиса и работа с ним.
        `.trimStart().trimEnd(),
        skills: [
          "Next.js",
          "TailwindCSS",
          "Typescript",
          "ReactRouter",
          "Vite"
        ],
        isExpanded: false,
      },
    ],
    isCurrentEmployer: false,
  },
];

export default function () {
  return <WorkExperience experiences={WORK_EXPERIENCE} />
}
