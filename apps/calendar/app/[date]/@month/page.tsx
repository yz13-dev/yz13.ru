import FullScreenCalendar from "@/components/fullscreen-calendar";

export default function page() {
  return (
    <FullScreenCalendar
      className="h-[calc(100dvh-61px)]"
      gridClassName="divide-y"
    />
  );
}
