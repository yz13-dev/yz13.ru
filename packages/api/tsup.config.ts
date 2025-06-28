import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/const/*", "src/lib/*", "src/client.ts", "src/api/yz13-api.ts"],
    format: ["esm", "cjs"],
    splitting: false,
    sourcemap: true,
    minify: true,
    skipNodeModulesBundle: true,
    external: ["node_modules"],
  },
  {
    entry: ["src/types/*"],
    outDir: "dist/types",
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
    entry: ["src/const/*", "src/lib/*", "src/client.ts", "src/api/yz13-api.ts"],
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
