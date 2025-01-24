const page = () => {
  return (
    <>
      <header className="w-full h-fit flex items-center justify-between">
        <h1 className="text-2xl font-medium text-foreground">Проекты</h1>
      </header>
      <div className="w-full flex items-start gap-4">
        <div className="w-80 flex flex-col gap-4">
          <div className="w-full h-fit flex flex-row gap-4">
            <span>Столбец</span>
            <span className="text-xs text-secondary px-2 py-1 rounded-md bg-yz-neutral-100">
              10
            </span>
          </div>
          <div className="w-full h-fit flex flex-col gap-2">
            <div className="rounded-xl border p-3 flex items-start gap-2 transition-colors hover:border-foreground">
              <div className="size-6 rounded-lg border shrink-0" />
              <div className="flex flex-col gap-3 w-full">
                <div className="flex flex-col gap-1 w-full">
                  <span className="text-base font-medium">
                    Название проекта
                  </span>
                  <span className="text-sm text-secondary">
                    Описание проекта
                  </span>
                </div>
                <div className="flex flex-row gap-2 w-full items-center justify-between">
                  <span className="text-xs text-secondary">Позавчера</span>
                  <div className="-space-x-2 w-fit">
                    <div className="size-5 rounded-full border inline-block bg-background shrink-0" />
                    <div className="size-5 rounded-full border inline-block bg-background shrink-0" />
                    <div className="size-5 rounded-full border inline-block bg-background shrink-0" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
