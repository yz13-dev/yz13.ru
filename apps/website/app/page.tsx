import CopyButton from "@/components/copy-button";
import Experience from "@/components/experience";
import GithubContributions from "@/components/github-contributions";
import LogoSvg from "@/components/logo-svg";
import { ThemeImage } from "@/components/theme-image";
import { Badge } from "@yz13/ui/badge";
import { Button } from "@yz13/ui/button";
import { ButtonGroup } from "@yz13/ui/button-group";
import { ArrowRightIcon, ExternalLinkIcon, MailIcon } from "@yz13/ui/icons";
import { InputGroupButton } from "@yz13/ui/input-group";
import Image from "next/image";
import Link from "next/link";




export default function Root() {
  return (
    <>
      <header className="max-w-2xl mx-auto w-full px-4 py-6">
        <Link href="/">
          <ThemeImage
            srcDark="/logo/dark-full.png"
            srcLight="/logo/light-full.png"
            width={128}
            height={32}
            alt="logo"
          />
        </Link>
      </header>
      <main className="px-4 py-6 max-w-2xl mx-auto w-full *:block space-y-1">
        <h1 className="text-4xl font-medium">YZ13 - фронтенд разработчик</h1>
        <p className="text-muted-foreground">
          Нужен разработчик? Разработаю фронтенд для вашего проекта.
        </p>
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
            <h3 className="text-lg font-medium">Опыт работы</h3>
          </div>
          <Experience />
        </section>
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
                <InputGroupButton variant="outline">
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
                <InputGroupButton variant="outline">
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
                <InputGroupButton variant="outline">
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
                <InputGroupButton variant="outline">
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
                <InputGroupButton variant="outline">
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
        </section>
      </div>
      <footer className="p-6 max-w-2xl mx-auto w-full">
        <LogoSvg className="opacity-10" />
      </footer>
    </>
  )
}
