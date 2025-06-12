import AutoTextarea from "@/components/auto-textarea";
import { getCalendar } from "@yz13/api/calendar";
import { Input } from "@yz13/ui/components/input";

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
