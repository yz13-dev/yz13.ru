import { InstalledPackage } from "../terminal";

const fetchPackage: InstalledPackage = {
  name: "fetch",
  version: "1.0.0",
  description: "Provides basic fetch operations",
  commands: [
    {
      name: "get",
      description: "Fetches data from a URL",
      isAsync: true,
      execute: async (args) => {
        const [url] = args;
        if (!url) return [{ type: "stderr", message: "Invalid URL provided" }];
        try {
          const response = await fetch(url);
          const text = await response.text();
          return [{ type: "stdout", message: text }];
        } catch (err) {
          const msg = err instanceof Error ? err.message : err;
          return [{ type: "stderr", message: `Error: ${msg}` }];
        }
      },
    },
  ],
  path: "/path/to/cache/fetch-package",
};

export default fetchPackage;
