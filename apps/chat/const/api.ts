export const isDev = process.env.NODE_ENV === "development";
const LOCAL_API_URL = "https://localhost:3000";
const PROD_API_URL = "https://api.yz13.ru/";
export const API_URL = isDev ? LOCAL_API_URL : PROD_API_URL;
