import Footer from "@/components/footer/footer";

export default function page() {
  return (
    <>
      <div className="max-w-6xl w-full mx-auto px-6 space-y-6 mt-[10%]">
        <div className="flex max-w-xl w-full flex-col gap-2">
          <h1 className="lg:text-5xl text-3xl lg:font-bold font-semibold">
            Библиотека проектов
          </h1>
          <p className="lg:text-lg text-sm text-muted-foreground">
            Здесь вы можете найти список проектов, которые я разработал или
            поддерживаю и которые могут быть полезны для вас.
          </p>
        </div>
        <div className="space-y-4">
          <span className="text-lg font-medium block">New</span>
          <ul className="gap-2 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 auto-rows-fr *:transition-colors *:p-2">
            <li className="w-full rounded-xl flex items-center gap-2 hover:bg-card">
              <div className="size-16 shrink-0 rounded-lg border" />
              <div className="w-full space-y-0 *:block">
                <span className="text-base font-medium">App name</span>
                <span className="text-sm text-muted-foreground">
                  App escription
                </span>
              </div>
            </li>
            <li className="w-full rounded-xl flex items-center gap-2 hover:bg-card">
              <div className="size-16 shrink-0 rounded-lg border" />
              <div className="w-full space-y-0 *:block">
                <span className="text-base font-medium">App name</span>
                <span className="text-sm text-muted-foreground">
                  App escription
                </span>
              </div>
            </li>
            <li className="w-full rounded-xl flex items-center gap-2 hover:bg-card">
              <div className="size-16 shrink-0 rounded-lg border" />
              <div className="w-full space-y-0 *:block">
                <span className="text-base font-medium">App name</span>
                <span className="text-sm text-muted-foreground">
                  App escription
                </span>
              </div>
            </li>
            <li className="w-full rounded-xl flex items-center gap-2 hover:bg-card">
              <div className="size-16 shrink-0 rounded-lg border" />
              <div className="w-full space-y-0 *:block">
                <span className="text-base font-medium">App name</span>
                <span className="text-sm text-muted-foreground">
                  App escription
                </span>
              </div>
            </li>
            <li className="w-full rounded-xl flex items-center gap-2 hover:bg-card">
              <div className="size-16 shrink-0 rounded-lg border" />
              <div className="w-full space-y-0 *:block">
                <span className="text-base font-medium">App name</span>
                <span className="text-sm text-muted-foreground">
                  App escription
                </span>
              </div>
            </li>
            <li className="w-full rounded-xl flex items-center gap-2 hover:bg-card">
              <div className="size-16 shrink-0 rounded-lg border" />
              <div className="w-full space-y-0 *:block">
                <span className="text-base font-medium">App name</span>
                <span className="text-sm text-muted-foreground">
                  App escription
                </span>
              </div>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <span className="text-lg font-medium block">Popular</span>
          <ul className="gap-4 flex items-center overflow-x-auto *:transition-colors *:p-2">
            <li className="rounded-3xl hover:bg-card flex flex-col gap-4">
              <div className="size-36 rounded-2xl border"></div>
              <div className="w-full space-y-0 *:block">
                <span className="text-base font-medium">App name</span>
                <span className="text-sm text-foreground">App escription</span>
              </div>
            </li>
            <li className="rounded-3xl hover:bg-card flex flex-col gap-2">
              <div className="size-36 rounded-2xl border"></div>
              <div className="w-full space-y-0 *:block">
                <span className="text-base font-medium">App name</span>
                <span className="text-sm text-foreground">App escription</span>
              </div>
            </li>
            <li className="rounded-3xl hover:bg-card flex flex-col gap-2">
              <div className="size-36 rounded-2xl border"></div>
              <div className="w-full space-y-0 *:block">
                <span className="text-base font-medium">App name</span>
                <span className="text-sm text-foreground">App escription</span>
              </div>
            </li>
            <li className="rounded-3xl hover:bg-card flex flex-col gap-2">
              <div className="size-36 rounded-2xl border"></div>
              <div className="w-full space-y-0 *:block">
                <span className="text-base font-medium">App name</span>
                <span className="text-sm text-foreground">App escription</span>
              </div>
            </li>
            <li className="rounded-3xl hover:bg-card flex flex-col gap-2">
              <div className="size-36 rounded-2xl border"></div>
              <div className="w-full space-y-0 *:block">
                <span className="text-base font-medium">App name</span>
                <span className="text-sm text-foreground">App escription</span>
              </div>
            </li>
            <li className="rounded-3xl hover:bg-card flex flex-col gap-2">
              <div className="size-36 rounded-2xl border"></div>
              <div className="w-full space-y-0 *:block">
                <span className="text-base font-medium">App name</span>
                <span className="text-sm text-foreground">App escription</span>
              </div>
            </li>
            <li className="rounded-3xl hover:bg-card flex flex-col gap-2">
              <div className="size-36 rounded-2xl border"></div>
              <div className="w-full space-y-0 *:block">
                <span className="text-base font-medium">App name</span>
                <span className="text-sm text-foreground">App escription</span>
              </div>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <span className="text-lg font-medium block">Popular</span>
          <ul className="gap-4 flex items-center overflow-x-auto *:transition-colors *:p-2">
            <li className="rounded-3xl hover:bg-card flex flex-col gap-4">
              <div className="size-36 rounded-2xl border"></div>
              <div className="w-full space-y-0 *:block">
                <span className="text-base font-medium">App name</span>
                <span className="text-sm text-foreground">App escription</span>
              </div>
            </li>
            <li className="rounded-3xl hover:bg-card flex flex-col gap-2">
              <div className="size-36 rounded-2xl border"></div>
              <div className="w-full space-y-0 *:block">
                <span className="text-base font-medium">App name</span>
                <span className="text-sm text-foreground">App escription</span>
              </div>
            </li>
            <li className="rounded-3xl hover:bg-card flex flex-col gap-2">
              <div className="size-36 rounded-2xl border"></div>
              <div className="w-full space-y-0 *:block">
                <span className="text-base font-medium">App name</span>
                <span className="text-sm text-foreground">App escription</span>
              </div>
            </li>
            <li className="rounded-3xl hover:bg-card flex flex-col gap-2">
              <div className="size-36 rounded-2xl border"></div>
              <div className="w-full space-y-0 *:block">
                <span className="text-base font-medium">App name</span>
                <span className="text-sm text-foreground">App escription</span>
              </div>
            </li>
            <li className="rounded-3xl hover:bg-card flex flex-col gap-2">
              <div className="size-36 rounded-2xl border"></div>
              <div className="w-full space-y-0 *:block">
                <span className="text-base font-medium">App name</span>
                <span className="text-sm text-foreground">App escription</span>
              </div>
            </li>
            <li className="rounded-3xl hover:bg-card flex flex-col gap-2">
              <div className="size-36 rounded-2xl border"></div>
              <div className="w-full space-y-0 *:block">
                <span className="text-base font-medium">App name</span>
                <span className="text-sm text-foreground">App escription</span>
              </div>
            </li>
            <li className="rounded-3xl hover:bg-card flex flex-col gap-2">
              <div className="size-36 rounded-2xl border"></div>
              <div className="w-full space-y-0 *:block">
                <span className="text-base font-medium">App name</span>
                <span className="text-sm text-foreground">App escription</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
        <Footer />
      </div>
    </>
  );
}
