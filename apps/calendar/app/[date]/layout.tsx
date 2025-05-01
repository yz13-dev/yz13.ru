import { auth } from "@/lib/auth";
import { format, parse } from "date-fns";
import { redirect } from "next/navigation";
import Header from "./header";
import ViewWrapper from "./view-wrapper";

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
  const user = await auth();
  const search = await searchParams;
  const { date: dateKey } = await params;
  const date = parse(dateKey, "yyyy-MM-dd", new Date());
  const view = search?.view ?? "month";
  if (!date) {
    const today = format(dateKey, "yyyy-MM-dd");
    return redirect(`/calendar/${today}`);
  }
  return (
    <div className="w-full divide-y">
      <Header date={dateKey} defaultView={view} uid={user?.id} />
      <ViewWrapper
        defaultView={view}
        views={{
          year,
          month,
          week,
          day,
        }}
      />
    </div>
  );
  // return children;
}
