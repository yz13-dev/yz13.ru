import { getV1AuthCurrent } from "@yz13/api";
import { format } from "date-fns";
import { redirect } from "next/navigation";
import Landing from "../(landing)/landing";

type PageProps = {
  searchParams: Promise<{
    date?: string;
  }>;
};
export default async function page({ searchParams }: PageProps) {
  const search = await searchParams;
  const date = search.date;
  const user = await getV1AuthCurrent({ withCredentials: true })

  console.log(user)

  if (!user) return <Landing />;

  const parsedDate = date ? new Date(date) : null

  const today = parsedDate ? parsedDate : new Date();

  return redirect(format(today, "yyyy-MM-dd"));
}
