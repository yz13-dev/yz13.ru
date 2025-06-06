import AutoTextarea from "@/components/auto-textarea";
import { Input } from "mono/components/input";
import { getCalendar } from "rest-api/calendar";

type PageProps = {
  params: Promise<{
    calendarId: string;
  }>
}

export default async function ({ params }: PageProps) {
  const { calendarId } = await params;

  const { data: calendar } = await getCalendar(calendarId)

  return (
    <>
      <div className="max-w-xl w-full space-y-3 p-6">
        <h3 className="text-lg font-medium">
          Настройки календаря
        </h3>
        <Input placeholder="Название" />
        <AutoTextarea placeholder="Описание" className="min-h-9" />
      </div>
    </>
  )
}
