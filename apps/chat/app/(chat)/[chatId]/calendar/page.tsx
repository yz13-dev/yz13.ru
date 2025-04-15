import { showCalendar } from "@/const/flags";
import { Skeleton } from "mono/components/skeleton";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

const FullScreenCalendar = dynamic(() => import("./fullscreen-calendar"), {
  loading: () => <Skeleton className="h-dvh w-full rounded-none" />,
});

type PageProps = {
  params: Promise<{ chatId: string }>;
}
export default async function page({ params }: PageProps) {
  const { chatId } = await params;
  const calendarAvailable = await showCalendar();
  if (!calendarAvailable) return redirect(`/${chatId}`);
  return (
    <>
      <FullScreenCalendar className="h-dvh" />
    </>
  );
}
