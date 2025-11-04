import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/supabase/next/*", "src/supabase/hono/*", "src/supabase/cookies.ts", "src/supabase/extra.ts"],
    outDir: "dist/supabase",
    splitting: false,
    sourcemap: true,
    minify: true,
    skipNodeModulesBundle: true,
    dts: true,
    external: ["node_modules"],
  },
  {
    entry: ["src/types.ts"],
    outDir: "dist",
    splitting: false,
    sourcemap: true,
    minify: true,
    skipNodeModulesBundle: true,
    dts: {
      only: true,
    },
    external: ["node_modules"],
  }
]);
