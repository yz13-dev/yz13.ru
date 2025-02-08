import { config as mono } from "mono/config";
import type { Config } from "tailwindcss";

const config: Config = {
  presets: [mono],
  darkMode: ["class"],
  content: ["./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
};

export default config;
