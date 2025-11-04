import { writeFileSync } from "node:fs";
import { API_URL } from "./config";

// const env = process.env.VERCEL_ENV ?? "development";
// const API_URL = env === "development" ? "https://localhost:3000" : "https://api.yz13.ru"

const fetchAndWriteOpenAPI = async () => {
  const start = Date.now();
  try {

    const path = "/openapi.json";
    const url = new URL(path, API_URL);

    console.log(url.toString())

    const response = await fetch(url.toString());
    if (!response.ok) throw new Error("Failed to fetch OpenAPI");
    const data = await response.json();
    writeFileSync("./api.json", JSON.stringify(data, null, 2));
    const end = Date.now();
    console.log(`OpenAPI operation succeeded in ${end - start}ms`);
  } catch (error) {
    console.error(error);
    const end = Date.now();
    console.log(`OpenAPI operation failed in ${end - start}ms`);
  }
};

fetchAndWriteOpenAPI();
