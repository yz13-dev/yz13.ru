import Form from "./form";

export default function page() {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return (
    <>
      <div className="max-w-2xl w-full mx-auto px-6 space-y-6 mt-[10%]">
        <div className="space-y-3">
          <h1 className="text-2xl font-medium">Новый созвон</h1>
          <p className="text-sm text-muted-foreground">
            Создайте новый созвон, чтобы обговорить ваши планы или подробности о
            проекте.
          </p>
        </div>
      </div>

      <Form className="rounded-3xl border bg-background-secondary divide-y mt-12" />

      <footer className="max-w-2xl flex flex-row justify-center w-full mx-auto p-6 mt-12">
        <span className="text-base text-muted-foreground text-center">
          YZ13
        </span>
      </footer>
    </>
  );
}
