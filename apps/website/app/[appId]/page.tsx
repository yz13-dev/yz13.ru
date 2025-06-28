import OtherProjects from "@/app/(root)/components/other-projects";
import { Logo } from "@/components/logo";
import Footer from "@/components/small-footer";
import User from "@/components/user";
import { getV1StoreId } from "@yz13/api";
import { Badge } from "@yz13/ui/components/badge";
import { Button } from "@yz13/ui/components/button";
import { Separator } from "@yz13/ui/components/separator";
import { Skeleton } from "@yz13/ui/components/skeleton";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import AppLogo from "./components/app-logo";
import { UserPublisher, UserPublisherSkeleton } from "./components/publisher";
import ShareButton from "./components/share-button";
import { getWiget } from "./registry";

type Props = {
  params: Promise<{ appId: string }>;
};
export default async function page({ params }: Props) {
  const { appId } = await params;
  const publication = await getV1StoreId(appId);
  if (!publication) return notFound();
  const noPublicUrl = !publication.public_url;
  const sliceCount = 2;
  const categories = publication.categories ?? [];
  const categoriesSlice = categories.slice(0, sliceCount) ?? [];
  const restCount = (publication.categories?.length ?? 0) - sliceCount;
  const stage = publication.stage;

  const tags = publication.tags ?? [];

  return (
    <>
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between p-6">
        <Link href="/">
          <Logo size={28} type="full" />
        </Link>
        <Suspense fallback={<Skeleton className="h-9 w-16" />}>
          <User />
        </Suspense>
      </header>
      <div className="max-w-6xl w-full mx-auto py-12 px-6 space-y-6">
        <div className="size-24 relative border rounded-[25%] overflow-hidden shrink-0 flex items-center justify-center">
          <AppLogo publication={publication} className="aspect-square" />
        </div>
        <div className="w-full space-x-2 *:inline *:lg:text-4xl *:text-2xl max-w-2xl">
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
          {
            categories.length !== 0 &&
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
          }
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

      <div className="w-full space-y-24 max-w-6xl mx-auto p-6">
        {
          tags.map(tagId => {
            const Widget = getWiget(tagId)
            if (!Widget) return null;
            return <Widget key={tagId} />;
          })
        }
      </div>

      <div className="w-full space-y-4 max-w-6xl mx-auto p-6">
        <span className="text-base block font-medium">Другие проекты</span>
        <ul className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          <OtherProjects exclude={[appId]} />
        </ul>
      </div>
      <div className="w-full gap-6 max-w-6xl mx-auto p-6 space-y-6">
        <Separator />
        <Footer />
      </div>
    </>
  );
}
