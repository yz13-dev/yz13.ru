import { showResources } from "@/flags";
import { Project, projects } from "@yz13/registries";
import { filter } from "@yz13/registries/utils/filter";
import { ArrowRightIcon, ExternalLinkIcon } from "@yz13/ui/icons";
import { Skeleton } from "@yz13/ui/skeleton";
import Link from "next/link";
import { Suspense } from "react";
import Availability, { AvailabilitySkeleton } from "./availability";
import { ThemeImage } from "./theme-image";
import { ThemeSwitcher } from "./theme-switcher";
import TrackableLink from "./trackable-link";

export default async function Footer() {

  const enableResources = await showResources();
  const allProjects = filter<Project>(projects, (project) => project.type === "project");

  return (
    <footer className="container py-12 mx-auto px-6 w-full">
      <div className="w-full flex md:flex-row gap-10 flex-col">
        <div className="max-w-sm flex flex-col gap-10">
          <ThemeImage
            srcDark="/logo/dark.png"
            srcLight="/logo/light.png"
            width={64}
            height={64}
            alt="logo"
          />
          <span className="text-2xl font-medium">
            Нужен разработчик? Разработаю фронтенд для вашего проекта.
          </span>
          <Suspense
            fallback={<AvailabilitySkeleton className="h-10" type="full" />}
          >
            <Availability
              textType="full"
              className="h-10 justify-start w-fit text-base"
            />
          </Suspense>
        </div>
        <div className="w-full grid md:grid-cols-3 grid-cols-2 gap-4">
          <div>
            <div className="py-2">
              <span className="text-base text-muted-foreground uppercase">
                yz13
              </span>
            </div>
            <ul className="*:py-1">
              <li>
                <Link href="/" className="text-lg hover:underline">
                  Главная
                </Link>
              </li>
              <li className="space-x-1.5">
                <Link href="/projects" className="text-lg hover:underline">
                  Проекты
                </Link>
                <span className="text-muted-foreground">/</span>
                <Link href="/works" className="text-lg hover:underline">
                  Работы
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-lg hover:underline">
                  Блог
                </Link>
              </li>
            </ul>
          </div>

          {enableResources && (
            <div>
              <div className="py-2">
                <span className="text-base text-muted-foreground uppercase">
                  ресурсы
                </span>
              </div>
              <ul className="*:py-1">
                <li>
                  <Link href="/open-stats" className="text-lg hover:underline">
                    Открытая статистика
                  </Link>
                </li>
              </ul>
            </div>
          )}
          <div>
            <div className="py-2">
              <Link href="/projects" className="text-base inline-flex items-center gap-1 text-muted-foreground uppercase">
                проекты
                <ArrowRightIcon size={14} />
              </Link>
            </div>
            <ul className="*:py-1">
              {
                allProjects.map((project) => {
                  if (!project.url) return null;
                  return (
                    <li key={project.id}>
                      <Link href={project.url} target="_blank" className="text-lg hover:underline">
                        {project.name}
                      </Link>
                    </li>
                  )
                })
              }
            </ul>
          </div>

          <div>
            <div className="py-2">
              <span className="text-base text-muted-foreground uppercase">
                также в
              </span>
            </div>
            <ul className="*:py-1">
              <li className="group">
                <Suspense fallback={<Skeleton className="h-[23px] w-1/3" />}>
                  <TrackableLink
                    track
                    href="/me/telegram"
                    target="_blank"
                    className="text-lg inline-flex items-center gap-2 hover:underline [&>svg]:size-4"
                  >
                    Telegram
                    <ExternalLinkIcon className="transition-colors text-muted-foreground group-hover:text-foreground" />
                  </TrackableLink>
                </Suspense>
              </li>
              <li className="group">
                <Suspense fallback={<Skeleton className="h-[23px] w-1/3" />}>
                  <TrackableLink
                    track
                    href="/me/github"
                    target="_blank"
                    className="text-lg inline-flex items-center gap-2 hover:underline [&>svg]:size-4"
                  >
                    Github
                    <ExternalLinkIcon className="transition-colors text-muted-foreground group-hover:text-foreground" />
                  </TrackableLink>
                </Suspense>
              </li>
              <li className="group">
                <Suspense fallback={<Skeleton className="h-[23px] w-1/3" />}>
                  <TrackableLink
                    track
                    href="/me/x"
                    target="_blank"
                    className="text-lg inline-flex items-center gap-2 hover:underline [&>svg]:size-4"
                  >
                    X
                    <ExternalLinkIcon className="transition-colors text-muted-foreground group-hover:text-foreground" />
                  </TrackableLink>
                </Suspense>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center pt-8 justify-end">
        <ThemeSwitcher />
      </div>
      <div className="pt-20 container flex items-center justify-between mx-auto w-full">
        <span className="text-sm text-muted-foreground">
          YZ13 - фронтенд разработчик.
        </span>
        <span className="text-sm text-muted-foreground">2025</span>
      </div>
    </footer>
  );
}
