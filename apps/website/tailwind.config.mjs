import { config as shared } from "@yz13/mono/config"

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...shared,
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

