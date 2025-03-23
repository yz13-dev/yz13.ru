import { getArticlesForCountry } from "@/actions/articles/articles";
import { unstable_noStore } from "next/cache";
import { cookies } from "next/headers";

const page = async () => {
  unstable_noStore();
  const cookieStore = cookies();
  const language = cookieStore.get("language")?.value || "RU";
  if (!language) return <>no language</>;
  const articles = await getArticlesForCountry(language);
  return <>{articles.length}</>;
};

export default page;
