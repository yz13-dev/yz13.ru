import type { OptionsExport } from "@orval/core";
import { defineConfig } from "orval";


const env = process.env.VERCEL_ENV ?? "development";
const API_URL = env === "development" ? "https://localhost:3000" : "https://api.yz13.ru"

export const gfkOrvalConfig: OptionsExport = {
  input: {
    target: "./api.json",
  },
  output: {
    baseUrl: API_URL,
    httpClient: "axios",
    mode: "split",
    target: "./src/api",
    schemas: "./src/types",
    client: "axios-functions",
    mock: false,
    clean: true,
    namingConvention: "kebab-case",
    override: {
      mutator: {
        path: './src/lib/custom-instance.ts',
        name: 'axios',
      },
      zod: {
        generate: {
          response: true,
          query: true,
          body: true,
          param: true,
          header: true
        }
      },
    },
  },
};

export default defineConfig({
  gfk: {
    ...gfkOrvalConfig,
    // hooks: {
    //   afterAllFilesWrite:
    //     'eslint --fix ./api/generated/endpoints --rule "check-file/filename-naming-convention: 0" --rule "import/no-restricted-paths: 0"',
    // },
  },
});
