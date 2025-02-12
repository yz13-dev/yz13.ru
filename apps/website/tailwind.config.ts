import tailwindConfig from "tailwind-config/tailwind.config";
import type { Config } from "tailwindcss";

const config: Config = {
  presets: [tailwindConfig],
  darkMode: ["class"],
  content: ["./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
};

export default config;
