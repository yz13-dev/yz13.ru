import OtherProjects from "@/app/(root)/other-projects";
import { Logo } from "@/components/logo";
import Footer from "@/components/small-footer";
import User from "@/components/user";
import { wait } from "@/helpers/wait";
import { ExternalLinkIcon } from "lucide-react";
import { Badge } from "mono/components/badge";
import { Button } from "mono/components/button";
import { Separator } from "mono/components/separator";
import { Skeleton } from "mono/components/skeleton";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getPublication } from "rest-api/store";
import AppLogo from "../components/app-logo";
import { UserPublisher, UserPublisherSkeleton } from "../components/publisher";
import ShareButton from "../components/share-button";

type Props = {
  params: Promise<{ appId: string }>;
};
export default async function page({ params }: Props) {
  const { appId } = await params;
  await wait(3000);
  const { data: publication } = await getPublication(appId);
  if (!publication) return notFound();
  const noPublicUrl = !publication.public_url;
  const sliceCount = 2;
  const categoriesSlice = publication.categories?.slice(0, sliceCount) ?? [];
  const restCount = (publication.categories?.length ?? 0) - sliceCount;
  const stage = publication.stage;
  return (
    <>
      <header className="max-w-screen-2xl w-full mx-auto flex items-center justify-between p-6">
        <Link href="/">
          <Logo size={{ width: 128, height: 64 }} type="full" />
        </Link>
        <Suspense fallback={<Skeleton className="h-9 w-16" />}>
          <User />
        </Suspense>
      </header>
      <div className="max-w-screen-2xl w-full mx-auto py-12 px-6 space-y-6">
        <div className="size-24 relative border rounded-[25%] overflow-hidden shrink-0 flex items-center justify-center">
          <AppLogo publication={publication} className="aspect-square" />
        </div>
        <div className="w-full space-x-2 *:inline *:lg:text-4xl *:text-2xl max-w-lg">
          <h1 className="lg:font-semibold font-medium">{publication?.name}</h1>
          {publication.description && (
            <>
              <span className="lg:font-semibold font-medium">—</span>
              <p className="lg:font-semibold font-medium">
                {publication.description}
              </p>
            </>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground">Автор</span>
            <Suspense fallback={<UserPublisherSkeleton />}>
              {publication.publisher_type === "user" &&
                publication.publisher_id && (
                  <UserPublisher uid={publication.publisher_id} />
                )}
            </Suspense>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground">Категории</span>
            <div className="flex items-center gap-2 *:h-6 *:text-sm">
              {categoriesSlice.map((category) => (
                <Badge key={category} className="capitalize" variant="outline">
                  {category}
                </Badge>
              ))}
              {restCount > 0 && <Badge variant="ghost">{+restCount}</Badge>}
            </div>
          </div>
          {stage && (
            <div className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground">Стадия</span>
              <Badge variant="outline" className="capitalize h-6 text-sm">
                {stage}
              </Badge>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          {!publication.public_url ? (
            <Button disabled={noPublicUrl}>
              Открыть <ExternalLinkIcon />
            </Button>
          ) : (
            <Button asChild>
              <Link href={publication.public_url} target="_blank">
                Открыть <ExternalLinkIcon />
              </Link>
            </Button>
          )}
          <ShareButton appId={appId} />
        </div>
      </div>
      <div className="w-full space-y-4 max-w-screen-2xl mx-auto p-6">
        <span className="text-base block font-medium">Другие проекты</span>
        <ul className="w-full grid grid-cols-3 gap-6">
          <OtherProjects exclude={[appId]} />
        </ul>
      </div>
      <div className="w-full gap-6 max-w-screen-2xl mx-auto p-6 space-y-6">
        <Separator />
        <Footer />
      </div>
    </>
  );
}
