import { appId } from "@/const/app-id";
import { permanentRedirect } from "next/navigation";

type PageProps = {
  searchParams: Promise<{
    continue?: string;
  }>;
};
const page = async ({ searchParams }: PageProps) => {
  const { continue: continueLink } = await searchParams;
  const url = new URL("/login", "https://yz13.ru");
  const urlSearchParams = url.searchParams;
  if (appId) urlSearchParams.set("appId", appId);
  if (continueLink) urlSearchParams.set("continue", continueLink);
  return permanentRedirect(url.toString());
};

export default page;
