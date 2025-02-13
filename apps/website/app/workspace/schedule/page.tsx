import Calendar from "@/(old)/old/calendar";

const page = () => {
  return (
    <>
      <header className="w-full h-fit flex items-center justify-between">
        <h1 className="text-2xl font-medium text-foreground">Расписание</h1>
      </header>
      <Calendar timeRange={[0, 24]} />
    </>
  );
};

export default page;
