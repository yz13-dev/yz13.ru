import type { Stack } from "./types";




export const nextjs: Stack = {
  id: "nextjs",
  category: "фреймворк",
  name: "Nextjs",
  source: "https://nextjs.org/",
  icon: "https://cdn.simpleicons.org/nextdotjs/000000/ffffff"
}

export const tailwindcss: Stack = {
  id: "tailwindcss",
  category: "css",
  name: "Tailwindcss",
  source: "https://tailwindcss.com/",
  icon: "https://cdn.simpleicons.org/tailwindcss/000000/ffffff"
}

export const reactrouter: Stack = {
  id: "reactrouter",
  category: "фреймворк",
  name: "React Router",
  source: "https://reactrouter.com/",
  icon: "https://cdn.simpleicons.org/reactrouter/000000/ffffff"
}

export const shadcn: Stack = {
  id: "shadcnui",
  category: "ui",
  name: "Shadcn",
  source: "https://ui.shadcn.com/",
  icon: "https://cdn.simpleicons.org/shadcnui/000000/ffffff"
}

const stacks: Stack[] = [
  nextjs,
  tailwindcss,
  reactrouter,
  shadcn
] as const;

export default stacks;
