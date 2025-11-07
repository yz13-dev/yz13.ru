

type WorkItem = {
  id: string,
  assets: string[],
  content: string
}

export const works: WorkItem[] = [
  {
    id: "reservia",
    assets: [
      "/works/reservia/home.png",
      "/works/reservia/map-creating.png",
      "/works/reservia/timeline.png",
    ],
    content: `
#### Reservia

Основной функционал, это возможность бронирования столов в ресторанах и кафе и тд. Для этого дополнительно были созданы админка для управления бронированием и просмотр данных о бронировании.

Проект был построен на базе Next.js, а также использовал TailwindCSS для создания компонентов и стилей. Но позднее было решено перейти на Vite + ReactRouter.
    `
  }
] as const;
