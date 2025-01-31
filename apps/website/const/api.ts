import { isDev } from "@/app/login/get-url";

export const API_URL = isDev ? "http://localhost:3000" : "https://api.yz13.ru/";
