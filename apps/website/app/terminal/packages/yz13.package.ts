import { InstalledPackage } from "../terminal";

const yz13Package: InstalledPackage = {
  name: "yz13",
  version: "1.0.0",
  description: "Provides information about yz13",
  commands: [
    {
      name: "works",
      isAsync: true,
      description: "Displays works of yz13",
      block: "list",
      execute: async () => [
        {
          type: "stdout",
          message: "Terminal",
          link: "https://github.com/yz13-env",
        },
        {
          type: "stdout",
          message: "Reservia",
          link: "https://github.com/yz13-env",
        },
      ],
    },
  ],
  path: "/path/to/cache/yz13-package",
};

export default yz13Package;
