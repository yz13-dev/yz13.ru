import { format, parse } from "date-fns";
import { redirect } from "next/navigation";

type LayoutProps = {
  children: React.ReactNode;
  year: React.ReactNode;
  month: React.ReactNode;
  week: React.ReactNode;
  day: React.ReactNode;
  params: Promise<{
    date: string;
  }>;
  searchParams: Promise<{
    view: string;
  }>;
};
export default async function layout({
  day,
  week,
  month,
  year,
  children,
  params,
  searchParams,
}: LayoutProps) {
  const search = await searchParams;
  const { date: dateKey } = await params;
  const date = parse(dateKey, "yyyy-MM-dd", new Date());
  const view = search?.view ?? "month";
  if (!date) {
    const today = format(dateKey, "yyyy-MM-dd");
    return redirect(`/calendar/${today}`);
  }
  if (view === "month") return month;
  if (view === "week") return week;
  if (view === "day") return day;
  if (view === "year") return year;
  return children;
}
