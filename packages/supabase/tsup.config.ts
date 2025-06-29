import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/lib/*", "src/locales/*", "src/supabase/*"],
    format: ["esm", "cjs"],
    splitting: false,
    sourcemap: true,
    minify: true,
    skipNodeModulesBundle: true,
    external: ["node_modules"],
  },
  {
    entry: ["src/types.ts"],
    outDir: "dist",
    format: ["esm", "cjs"],
    splitting: false,
    sourcemap: true,
    minify: true,
    skipNodeModulesBundle: true,
    dts: {
      only: true,
    },
    external: ["node_modules"],
  },
  {
    entry: ["src/lib/*", "src/locales/*", "src/supabase/*"],
    format: ["esm", "cjs"],
    splitting: false,
    sourcemap: true,
    minify: true,
    skipNodeModulesBundle: true,
    dts: {
      only: true,
    },
    external: ["node_modules"],
  },
]);
