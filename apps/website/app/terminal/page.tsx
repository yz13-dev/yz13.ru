import { InputGroupButton } from "@yz13/ui/input-group";



export default function () {
  return (
    <>
      <div className="w-full">
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm text-muted-foreground">
              v0.0.0
            </span>
            <span className="font-mono text-sm text-muted-foreground">
              /
            </span>
          </div>
          <div className="flex items-center gap-2">
            <InputGroupButton>
              <span>Свернуть</span>
            </InputGroupButton>
          </div>
        </div>
        <div className="px-6 pb-6 *:block space-y-1">
          <span className="font-mono text-sm">yz13 - фронтенд разработчик</span>
          <span className="font-mono text-sm">Нужен разработчик? Разработаю фронтенд для вашего проекта.</span>
        </div>
      </div>
      <div className="w-full">
      </div>
    </>
  )
}
