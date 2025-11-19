import ContactMeForm from "@/components/contact-me-form";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { StackItem } from "@/components/stack-item";
import { isDev } from "@/const/enviroment";
import { getProject } from "@/utils/blog/projects";
import { getProject as getProjectData } from "@yz13/registries/utils/projects";
import { Avatar, AvatarFallback, AvatarImage } from "@yz13/ui/avatar";
import { ExternalLink } from "@yz13/ui/icons";
import { Separator } from "@yz13/ui/separator";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Content from "../../components/content";
import SubProjectPreview from "../../components/sub-project-preview";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {

  const { id } = await params;

  const project = getProject(id);

  return {
    robots: { index: true, follow: false },
    title: project?.title,
    description: project?.summary,
    openGraph: {
      url: new URL(`/works/${id}`, "https://yz13.ru"),
      locale: "ru_RU",
      title: project?.title,
      description: project?.summary,
      type: "article",
      images: project?.banner
        ? [
          {
            url: project.banner as string,
            width: 1024,
            height: 600,
            alt: project?.title,
          },
        ] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: project?.title,
      description: project?.summary,
      creator: "@yz13_dev",
      site: "@yz13_dev",
      images: project?.banner
        ? [
          {
            url: project.banner as string,
            width: 1024,
            height: 600,
            alt: project?.title,
          },
        ] : [],
    },
  }
}

export default async function Project({ params }: Props) {
  const { id } = await params;

  const project = getProject(id);

  const data = getProjectData(id);

  if (!data) return notFound();
  if (!project) return notFound();

  const hasSubProjects = (data?.subProjects || [])?.length > 0;
  const subProjects = data?.subProjects || [];
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
              return <StackItem key={item.id} item={item} />;
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
      {
        hasSubProjects &&
        <div className="w-full py-6 space-y-3">
          <div className="py-4 px-6 mx-auto max-w-2xl w-full">
            <span className="text-2xl font-medium">Подпроекты</span>
          </div>
          <ul className="space-y-12">
            {
              subProjects
                .map(project => {

                  if (!project.contentId) return null;

                  const post = getProject(project.contentId);
                  if (!post) return null;

                  if (!post.published) return null;

                  return <SubProjectPreview key={project.id} project={project} />
                })
            }
          </ul>
        </div>
      }
      <div className="w-full py-6">
        {
          isDev &&
          <ContactMeForm />
        }
      </div>
      <Footer />
    </>
  );
}
