

type ProjectItem = {
  id: string,
  url: string,
  assets: string[],
  content: string
}

export const projects: ProjectItem[] = [
  {
    id: "yzlab",
    url: "https://yzlab.ru",
    assets: [
      "/projects/yzlab/screenshots/main.png",
      "/projects/yzlab/screenshots/og.png",
      "/projects/yzlab/screenshots/site.png",
    ],
    content: `
#### yzlab

При создании yzlab было интересно попробоавать создать бота для обхода сайтов и сбора необходмых данных. В проекте при обходе бот получает "title", "description", "favicon" и "og:image", есть возможность запросить индексирования определенных сайтов.
    `
  }
] as const;
