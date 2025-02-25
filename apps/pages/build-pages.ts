import { writeFileSync } from "fs";
import { parsePages } from "./actions/parse-pages";

const buildPages = () => {
  const parsed = parsePages();

  console.log(parsed);

  const buffer = JSON.stringify(parsed, null, 2);
  writeFileSync("./pages.json", buffer);
};

buildPages();
