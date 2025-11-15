import type { Stack } from "./types";
export * from "./types";



export const nextjs: Stack = {
  id: "nextdotjs",
  category: "фреймворк",
  name: "Nextjs",
  source: "https://nextjs.org/",
  icon: function () {
    return `/stack/${this.id}.svg`
  }
}

export const tailwindcss: Stack = {
  id: "tailwindcss",
  category: "css",
  name: "Tailwindcss",
  source: "https://tailwindcss.com/",
  icon: function () {
    return `/stack/${this.id}.svg`
  }
}

export const reactrouter: Stack = {
  id: "reactrouter",
  category: "фреймворк",
  name: "React Router",
  source: "https://reactrouter.com/",
  icon: function () {
    return `/stack/${this.id}.svg`
  }
}

export const shadcn: Stack = {
  id: "shadcnui",
  category: "ui",
  name: "Shadcn",
  source: "https://ui.shadcn.com/",
  icon: function () {
    return `/stack/${this.id}.svg`
  }
}

const stacks: Stack[] = [
  nextjs,
  tailwindcss,
  reactrouter,
  shadcn
] as const;

export default stacks;
