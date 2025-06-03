import { Button } from "mono/components/button";


export default function () {
  return (
    <>
      <main className="w-full h-[45dvh] flex flex-col gap-6 items-center justify-center">
        <div className="space-y-2 *:block">
          <h1 className="text-3xl font-medium">
            Вход в календарь
          </h1>
          <p className="text-base text-muted-foreground">
            Выберите приложение для входа
          </p>
        </div>
        <div className="w-fit flex items-center gap-2">
          <Button>Войти</Button>
        </div>
      </main>
      <div className="max-w-screen-xl aspect-video w-full mx-auto border rounded-md"></div>
    </>
  )
}
