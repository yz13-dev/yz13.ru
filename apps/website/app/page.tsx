import CopyButton from "@/components/copy-button";
import Experience from "@/components/experience";
import GithubContributions from "@/components/github-contributions";
import LogoSvg from "@/components/logo-svg";
import { ThemeImage } from "@/components/theme-image";
import { Avatar, AvatarFallback, AvatarImage } from "@yz13/ui/avatar";
import { Badge } from "@yz13/ui/badge";
import { Button } from "@yz13/ui/button";
import { ButtonGroup } from "@yz13/ui/button-group";
import { ArrowLeftIcon, ArrowRightIcon, Code2Icon, ExternalLinkIcon, GlobeIcon, MailIcon } from "@yz13/ui/icons";
import { InputGroupButton } from "@yz13/ui/input-group";
import Image from "next/image";
import Link from "next/link";




export default function Root() {
  return (
    <>
      <main className="px-4 py-[5%] max-w-2xl space-y-12 mx-auto w-full">
        <div className="w-full relative overflow-hidden aspect-video flex items-center justify-center bg-card border rounded-xl">
          <Image
            src="/og/og.png"
            fill
            alt="logo"
          />
        </div>
        <div className="w-full flex flex-row gap-4 items-end">
          <Avatar className="size-36 rounded-full border">
            <AvatarImage src="https://github.com/yz13-dev.png" alt="avatar" />
            <AvatarFallback>YZ</AvatarFallback>
          </Avatar>
          <div className="*:block space-y-1">
            <h1 className="text-2xl font-semibold">YZ13 - фронтенд разработчик</h1>
            <p className="text-base text-muted-foreground">
              Нужен разработчик? Разработаю фронтенд для вашего проекта.
            </p>
          </div>
        </div>
        <div className="flex items-center w-fit gap-2">
          <Button size="lg" asChild>
            <Link href="https://cal.com/yz13-dev">
              <ArrowLeftIcon />
              <span>Запланировать встречу</span>
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="https://t.me/yz13_dev">
              <span>Чат</span>
              <Image src="https://cdn.simpleicons.org/telegram/000000/ffffff" unoptimized width={16} height={16} alt="telegram" />
            </Link>
          </Button>
        </div>
        <ul className="space-y-3">
          <li>
            <div className="flex items-center gap-2">
              <div className="size-6 rounded-[8px] outline-2 outline-ring/20 bg-card border flex items-center justify-center">
                <Code2Icon size={16} />
              </div>
              <span className="text-base text-balance">
                Фронтенд разработчик
              </span>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-2">
              <div className="size-6 rounded-[8px] outline-2 outline-ring/20 bg-card border flex items-center justify-center">
                <MailIcon size={16} />
              </div>
              <Link href="mailto:yz13.dev@gmail.com" className="text-base text-balance hover:underline">
                yz13.dev@gmail.com
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-2">
              <div className="size-6 rounded-[8px] outline-2 outline-ring/20 bg-card border flex items-center justify-center">
                <GlobeIcon size={16} />
              </div>
              <Link href="https://yz13.ru" className="text-base text-balance hover:underline">
                yz13.ru
              </Link>
            </div>
          </li>
        </ul>
        <Experience />
      </main>
      <section className="p-4 max-w-2xl mx-auto w-full">
        <div className="h-48">
          <GithubContributions username="yz13-dev" />
        </div>
      </section>
      <div className="px-4 max-w-2xl mx-auto w-full pb-6 flex items-center justify-between gap-4">
        <ButtonGroup className="*:bg-card">
          <Button variant="outline" size="icon" asChild>
            <Link href="https://t.me/yz13_dev">
              <Image src="https://cdn.simpleicons.org/telegram/000000/ffffff" unoptimized width={18} height={18} alt="telegram" />
            </Link>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <Link href="https://github.com/yz13-dev">
              <Image src="https://cdn.simpleicons.org/github/000000/ffffff" unoptimized width={18} height={18} alt="github" />
            </Link>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <Link href="https://x.com/yz13_dev">
              <Image src="https://cdn.simpleicons.org/x/000000/ffffff" unoptimized width={18} height={18} alt="x" />
            </Link>
          </Button>
        </ButtonGroup>
        <ButtonGroup className="*:bg-card">
          <Button variant="outline" size="icon" asChild>
            <Link href="mailto:yz13.dev@gmail.com">
              <MailIcon />
            </Link>
          </Button>
          <CopyButton value="yz13.dev@gmail.com" />
        </ButtonGroup>
      </div>
      <div className="bg-card max-w-2xl w-full mx-auto *:px-6 py-6 space-y-6 rounded-xl border">
        <section className="max-w-2xl mx-auto w-full">
          <div className="pb-4">
            <h3 className="text-lg font-medium">Проекты</h3>
          </div>
          <ul className="space-y-6">
            <li>
              <div className="w-full flex items-center gap-3 justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="size-6">
                    <ThemeImage
                      srcDark="/projects/yzlab/logo/dark.png"
                      srcLight="/projects/yzlab/logo/light.png"
                      width={24}
                      height={24}
                      alt="yzlab"
                    />
                  </div>
                  <span className="text-base font-medium">yzlab</span>
                </div>
                <span className="dashed-line" />
                <InputGroupButton variant="outline" disabled>
                  <span>Открыть</span>
                  <ExternalLinkIcon />
                </InputGroupButton>
              </div>
            </li>
            <li>
              <div className="w-full flex items-center gap-3 justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="size-6">
                    <ThemeImage
                      srcDark="/projects/blog/logo/dark.png"
                      srcLight="/projects/blog/logo/light.png"
                      width={24}
                      height={24}
                      alt="blog"
                    />
                  </div>
                  <span className="text-base font-medium">Блог</span>
                </div>
                <span className="dashed-line" />
                <InputGroupButton variant="outline" disabled>
                  <span>Открыть</span>
                  <ArrowRightIcon />
                </InputGroupButton>
              </div>
            </li>
            <li>
              <div className="w-full flex items-center gap-3 justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="size-6">
                    <ThemeImage
                      srcDark="/projects/pins/logo/dark.png"
                      srcLight="/projects/pins/logo/light.png"
                      width={24}
                      height={24}
                      alt="blog"
                    />
                  </div>
                  <span className="text-base font-medium">Пины</span>
                </div>
                <span className="dashed-line" />
                <InputGroupButton variant="outline" disabled>
                  <span>Открыть</span>
                  <ArrowRightIcon />
                </InputGroupButton>
              </div>
            </li>
            <li>
              <div className="w-full flex items-center gap-3 justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="size-6 rounded-full border overflow-hidden">
                    <ThemeImage
                      srcDark="/projects/link/logo/dark.png"
                      srcLight="/projects/link/logo/light.png"
                      width={24}
                      height={24}
                      alt="blog"
                    />
                  </div>
                  <span className="text-base font-medium">Link</span>
                </div>
                <span className="dashed-line" />
                <InputGroupButton variant="outline" disabled>
                  <span>Открыть</span>
                  <ExternalLinkIcon />
                </InputGroupButton>
              </div>
            </li>
            <li>
              <div className="w-full flex items-center gap-3 justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="size-6">
                    <ThemeImage
                      srcDark="/projects/news/logo/dark.png"
                      srcLight="/projects/news/logo/light.png"
                      width={24}
                      height={24}
                      alt="blog"
                    />
                  </div>
                  <span className="text-base font-medium">Новостная лента</span>
                </div>
                <span className="dashed-line" />
                <InputGroupButton variant="outline" disabled>
                  <span>Открыть</span>
                  <ArrowRightIcon />
                </InputGroupButton>
              </div>
            </li>
          </ul>
        </section>
        <section className="max-w-2xl mx-auto w-full">
          <div className="pb-4">
            <h3 className="text-lg font-medium">Блог</h3>
          </div>
          {
            false &&
            <ul className="space-y-6">
              <li>
                <div className="w-full flex items-center gap-3 justify-between">
                  <span className="text-base font-medium">Заголовок</span>
                  <span className="dashed-line" />
                  <Badge variant="outline">
                    12 Сентября
                  </Badge>
                </div>
              </li>
              <li>
                <div className="w-full flex items-center gap-3 justify-between">
                  <span className="text-base font-medium">Заголовок</span>
                  <span className="dashed-line" />
                  <Badge variant="outline">
                    12 Сентября
                  </Badge>
                </div>
              </li>
              <li>
                <div className="w-full flex items-center gap-3 justify-between">
                  <span className="text-base font-medium">Заголовок</span>
                  <span className="dashed-line" />
                  <Badge variant="outline">
                    12 Сентября
                  </Badge>
                </div>
              </li>
            </ul>
          }
        </section>
      </div>
      <footer className="p-6 max-w-2xl mx-auto w-full">
        <LogoSvg className="opacity-10" />
      </footer>
    </>
  )
}
