import { icons } from "../icons";
import type { Stack } from "./types";
export * from "./types";


// Переписать icon function
export const nextjs: Stack = {
  id: "nextdotjs",
  category: "фреймворк",
  name: "Nextjs",
  source: "https://nextjs.org/",
  icon: (props) => {
    const id = "nextdotjs";
    const Icon = icons[id];
    return <Icon {...props} />
  }
}

export const tailwindcss: Stack = {
  id: "tailwindcss",
  category: "css",
  name: "Tailwindcss",
  source: "https://tailwindcss.com/",
  icon: (props) => {
    const id = "tailwindcss";
    const Icon = icons[id];
    return <Icon {...props} />
  }
}

export const reactrouter: Stack = {
  id: "reactrouter",
  category: "фреймворк",
  name: "React Router",
  source: "https://reactrouter.com/",
  icon: (props) => {
    const id = "reactrouter";
    const Icon = icons[id];
    return <Icon {...props} />
  }
}

export const shadcn: Stack = {
  id: "shadcnui",
  category: "ui",
  name: "Shadcn",
  source: "https://ui.shadcn.com/",
  icon: (props) => {
    const id = "shadcnui";
    const Icon = icons[id];
    return <Icon {...props} />
  }
}

const stacks: Stack[] = [
  nextjs,
  tailwindcss,
  reactrouter,
  shadcn
] as const;

export default stacks;
