import Link from "next/link";



export default function Terminal() {
  return (
    <div className="w-full divide-y">
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
          <div className="flex items-center gap-2"></div>
        </div>
        <div className="px-6 pb-6 font-mono space-y-2">
          <span className="text-sm block">/whoami</span>
          <span className="text-sm block">yz13</span>
        </div>
      </div>
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
          <div className="flex items-center gap-2"></div>
        </div>
        <main className="px-6 font-mono space-y-2">
          <span className="text-sm block">/info</span>

          <div className="block space-x-2">
            <span className="text-sm inline shrink-0 text-muted-foreground">[ info ]</span>
            <h1 className="text-sm inline">yz13 - фронтенд разработчик</h1>
          </div>
          <div className="block space-x-2">
            <span className="text-sm inline shrink-0 text-muted-foreground">[ info ]</span>
            <p className="text-sm inline">Нужен разработчик? Разработаю фронтенд для вашего проекта.</p>
          </div>
        </main>
        <div className="px-6 pb-6 pt-2 font-mono space-y-2">
          <ul className="text-sm *:py-1 *:list-disc *:list-inside">
            <li>
              <span>Фронтенд разработчик</span>
            </li>
            <li>
              <Link href="mailto:yz13.dev@gmail.com" className="hover:underline">yz13.dev@gmail.com</Link>
            </li>
            <li>
              <Link href="https://yz13.ru" target="_blank" className="hover:underline">yz13.ru</Link>
            </li>
          </ul>
        </div>
      </div>
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
          <div className="flex items-center gap-2"></div>
        </div>
        <div className="px-6 pb-6 font-mono space-y-2">
          <span className="text-sm block">/work</span>

          <span className="text-sm block">Reservia [09.2024 — 11.2025] (1 год 3 месяца)</span>

          <span className="text-sm block text-muted-foreground">
            Проект был построен на базе Next.js, а также использовал TailwindCSS для создания компонентов и стилей. Но позднее было решено перейти на Vite + ReactRouter.
          </span>

          <span className="text-sm block text-muted-foreground">
            В рамках проекта были выполнены и разработаны следующие функции:
          </span>

          <ul className="text-sm *:py-1 *:list-disc *:list-inside text-muted-foreground">
            <li><span>Редактор карты заведений.</span></li>
            <li><span>Разработка и написание фронта.</span></li>
            <li><span>Фикс багов и оптимизация кода.</span></li>
            <li><span>Подключение к API сервиса и работа с ним.</span></li>
          </ul>

          <ul className="flex text-sm text-muted-foreground items-start flex-wrap gap-1">
            <li><span>[ Next.js ]</span></li>
            <li><span>[ TailwindCSS ]</span></li>
            <li><span>[ Typescript ]</span></li>
            <li><span>[ ReactRouter ]</span></li>
            <li><span>[ Vite ]</span></li>
          </ul>

        </div>
      </div>
    </div>
  )
}
