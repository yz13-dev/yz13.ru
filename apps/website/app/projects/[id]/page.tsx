import ContactForm from "@/components/contact-form";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { github, telegram, x } from "@/const/socials";
import { getProject } from "@/utils/blog/projects";
import { getProject as getProjectData } from "@yz13/registries/utils/projects";
import { Avatar, AvatarFallback, AvatarImage } from "@yz13/ui/avatar";
import { cn } from "@yz13/ui/cn";
import { ExternalLink, ExternalLinkIcon } from "@yz13/ui/icons";
import { Separator } from "@yz13/ui/separator";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import QRCode from "react-qr-code";
import Content from "./components/content";

type Props = {
  params: Promise<{
    id: string;
  }>;
};
export default async function Project({ params }: Props) {
  const { id } = await params;

  const project = getProject(id);

  const data = getProjectData(id);

  if (!data) return notFound();
  if (!project) return notFound();

  const authors = project.authors;

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        {project.banner ? (
          <Image
            src={project.banner}
            width={1024}
            height={600}
            alt={project.title}
            className="size-full aspect-video"
          />
        ) : (
          <div className="aspect-video bg-foreground/20 flex items-center justify-center">
            <span className="text-2xl font-medium">{project.title}</span>
          </div>
        )}
      </div>
      <main className="space-y-12 py-6">
        <div className="max-w-2xl mx-auto w-full px-6">
          <div className="*:block space-y-2">
            <h3 className="lg:text-4xl text-2xl font-medium text-muted-foreground">
              {project.title}
            </h3>
            <p className="lg:text-4xl text-2xl font-medium text-foreground">
              {project.summary}
            </p>
          </div>
          <div className="w-full pt-6">
            <time
              dateTime={project.date}
              className="text-sm text-muted-foreground capitalize"
            >
              {format(new Date(project.date), "LLLL, yyyy", { locale: ru })}
            </time>
          </div>
        </div>
        <Separator className="max-w-2xl mx-auto" />
        <div className="max-w-2xl mx-auto w-full px-6">
          <span className="text-sm text-muted-foreground uppercase">стэк</span>
          <div className="w-full py-6 grid md:grid-cols-3 grid-cols-2 gap-4">
            {data.stack.map((item) => {
              return (
                <div
                  key={`${id}/${item.id}`}
                  className="flex items-center gap-3"
                >
                  <div className="h-12 aspect-4/3 rounded-xl border bg-secondary flex items-center justify-center">
                    <Image
                      src={item.icon}
                      width={32}
                      height={32}
                      unoptimized
                      alt={item.name}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm uppercase text-muted-foreground">
                      {item.category}
                    </span>
                    <span className="text-base font-medium">{item.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <Separator className="max-w-2xl mx-auto" />
        <div className="max-w-2xl mx-auto w-full grid grid-cols-3 px-6">
          {data.url && (
            <div className="size-full">
              <span className="text-sm text-muted-foreground uppercase">
                ссылки
              </span>
              <ul className="py-4">
                {data.url && (
                  <li>
                    <Link
                      href={data.url}
                      className="inline-flex items-center gap-1.5"
                    >
                      {new URL(data.url).hostname}
                      <ExternalLink />
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          )}{" "}
          <div className="size-full">
            <span className="text-sm text-muted-foreground uppercase">тип</span>
            <ul className="py-4">
              <li>
                <span>Сайт</span>
              </li>
            </ul>
          </div>
        </div>
        <Separator className="max-w-2xl mx-auto" />
        <div className="max-w-2xl mx-auto w-full px-6">
          <span className="text-sm text-muted-foreground uppercase">
            участники
          </span>
          <ul className="py-4 flex flex-row items-start gap-2">
            {authors.map((author) => {
              return (
                <li
                  key={author}
                  className="flex items-center gap-2 relative group"
                >
                  <Link
                    href={`https://github.com/${author}`}
                    className="absolute inset-0"
                  />
                  <Avatar className="size-6 rounded-full border">
                    <AvatarImage
                      src={`https://github.com/${author}.png`}
                      alt={author}
                    />
                    <AvatarFallback>{author.slice(0, 1)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium group-hover:underline">
                    @{author}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <Separator className="max-w-2xl mx-auto" />

        <Content content={project.body} />
      </main>
      <div className="w-full py-6">
        <section className="container mx-auto overflow-hidden bg-card border rounded-3xl">
          <div className="flex lg:flex-row flex-col">
            <div
              className={cn(
                "lg:max-w-2xs max-w-full w-full lg:border-r border-r-0 lg:border-b-0 border-b",
                "flex lg:flex-col sm:flex-row flex-col justify-between",
              )}
            >
              <div>
                <div className="*:block space-y-2 px-6 pt-6">
                  <h3 className="text-2xl font-medium text-foreground">
                    Готов работать над фронтендом
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    Чем могу помочь?
                  </p>
                </div>
                <ul className="*:py-1 p-6">
                  <li className="group">
                    <Link
                      href={telegram}
                      target="_blank"
                      className="text-lg inline-flex items-center gap-2 hover:underline [&>svg]:size-4"
                    >
                      Telegram
                      <ExternalLinkIcon className="transition-colors text-muted-foreground group-hover:text-foreground" />
                    </Link>
                  </li>
                  <li className="group">
                    <Link
                      href={github}
                      target="_blank"
                      className="text-lg inline-flex items-center gap-2 hover:underline [&>svg]:size-4"
                    >
                      Github
                      <ExternalLinkIcon className="transition-colors text-muted-foreground group-hover:text-foreground" />
                    </Link>
                  </li>
                  <li className="group">
                    <Link
                      href={x}
                      target="_blank"
                      className="text-lg inline-flex items-center gap-2 hover:underline [&>svg]:size-4"
                    >
                      X
                      <ExternalLinkIcon className="transition-colors text-muted-foreground group-hover:text-foreground" />
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="px-6 lg:pt-0 pt-6 pb-6">
                <div className="size-full sm:max-w-full max-w-2xs p-6 rounded-2xl bg-card border">
                  <QRCode
                    className="aspect-square"
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={telegram}
                    viewBox={`0 0 256 256`}
                  />
                </div>
              </div>
            </div>
            <div className="w-full px-6 pt-6 pb-2 flex flex-col justify-between">
              <ContactForm />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
