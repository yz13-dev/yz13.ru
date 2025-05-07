import { appId } from "@/const/app-id";
import { permanentRedirect } from "next/navigation";

const page = () => {
  const url = new URL("/login", "https://yz13.ru");
  const searchParams = url.searchParams;
  if (appId) searchParams.set("appId", appId);
  return permanentRedirect(url.toString());
};

export default page;
