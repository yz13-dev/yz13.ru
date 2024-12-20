import { InstalledPackage } from "../terminal";

const mathPackage: InstalledPackage = {
  name: "math",
  version: "1.0.0",
  description: "Provides basic math operations",
  commands: [
    {
      name: "add",
      description: "Adds two numbers",
      execute: (args) => {
        const [a, b] = args.map(Number);
        if (!a || !b)
          return [{ type: "stderr", message: "Invalid numbers provided" }];
        if (isNaN(a) || isNaN(b)) {
          return [{ type: "stderr", message: "Invalid numbers provided" }];
        }
        return [{ type: "stdout", message: `Result: ${a + b}` }];
      },
    },
  ],
  path: "/path/to/cache/math-package",
};

export default mathPackage;
