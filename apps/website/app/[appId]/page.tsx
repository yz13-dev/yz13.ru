import Footer from "@/components/footer/footer";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Separator } from "mono/components/separator";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getPublication } from "rest-api/store";
import OtherProjects, { OtherProjectsSkeleton } from "../(root)/other-projects";
import AppLogo from "./app-logo";
import { UserPublisher, UserPublisherSkeleton } from "./publisher";

type PageProps = {
  params: Promise<{
    appId: string;
  }>;
};
export default async function page({ params }: PageProps) {
  const { appId } = await params;
  const { data: publication } = await getPublication(appId);
  if (!publication) return notFound();
  const noPublicUrl = !publication.public_url;
  return (
    <>
      <div className="max-w-6xl w-full mx-auto px-6 space-y-6 mt-[10%]">
        <div className="flex flex-row lg:items-center items-start gap-6 lg:justify-between justify-start">
          <div className="size-16 relative border rounded-[25%] overflow-hidden shrink-0 lg:hidden flex items-center justify-center">
            <AppLogo publication={publication} className="aspect-square" />
          </div>
          <div className="flex flex-col gap-6">
            <Button variant="ghost" asChild className="w-fit">
              <Link href="/">
                <ArrowLeftIcon />
                Вернуться
              </Link>
            </Button>
            <div className="flex w-full flex-col gap-2">
              <h1 className="lg:text-5xl text-3xl lg:font-semibold font-medium">
                {publication?.name}
              </h1>
            </div>
            <Suspense fallback={<UserPublisherSkeleton />}>
              {publication.publisher_type === "user" &&
                publication.publisher_id && (
                  <UserPublisher uid={publication.publisher_id} />
                )}
            </Suspense>
            <div className="flex items-center gap-3">
              <Button disabled={noPublicUrl}>Открыть</Button>
              <Button variant="ghost">Поделиться</Button>
            </div>
          </div>
          <div className="h-60 w-1/3 relative shrink-0 lg:flex hidden items-center justify-center">
            <div className="size-60 relative border rounded-[25%] overflow-hidden flex items-center justify-center">
              <AppLogo publication={publication} className="aspect-square" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full gap-6 flex lg:flex-row flex-col max-w-6xl mx-auto p-6">
        <div className="lg:w-2/3 w-full space-y-8">
          <div className="w-full space-y-4">
            <span className="text-base block font-medium">Описание</span>
            {publication?.description && (
              <p className="text-base text-muted-foreground block">
                {publication?.description}
              </p>
            )}
          </div>
        </div>
        <div className="lg:w-1/3 w-full space-y-6">
          <span className="text-base block font-medium">Другие проекты</span>
          <ul className="space-y-6">
            <Suspense fallback={<OtherProjectsSkeleton />}>
              <OtherProjects exclude={[appId]} />
            </Suspense>
          </ul>
        </div>
      </div>
      <div className="w-full gap-6 max-w-6xl mx-auto p-6 space-y-6">
        <Separator />
        <Footer />
      </div>
    </>
  );
}
