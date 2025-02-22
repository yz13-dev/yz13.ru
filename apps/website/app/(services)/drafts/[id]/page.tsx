import { getDraft } from "@/actions/drafts/drafts";
import { getUserById } from "@/actions/user/user";
import { isDev } from "@/app/login/get-url";
import Header from "@/components/header";
import PageDockFiller from "@/components/page-dock-filler";
import User from "@/components/user";
import { authorized } from "@/lib/auth";
import { cdn } from "@/lib/cdn";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Skeleton } from "mono/components/skeleton";
import { unstable_noStore } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import DraftDock from "./dock";

type PageProps = {
  params: {
    id: string;
  };
};
const page = async ({ params }: PageProps) => {
  unstable_noStore();
  const id = params.id;
  const draft = await getDraft(id);
  if (!draft) return notFound();
  const user = await getUserById(draft.by);
  return (
    <>
      <Header className="w-full h-14 flex items-center px-6">
        <Button variant="ghost" className="flex items-center gap-2" asChild>
          <Link href="/drafts">
            <ArrowLeftIcon size={16} />
            Вернуться
          </Link>
        </Button>
        <div className="flex items-center gap-4">
          {(await authorized()) && (
            <Button variant="secondary" asChild>
              <Link href="/drafts/new">Опубликовать</Link>
            </Button>
          )}
          <Suspense fallback={<Skeleton className="h-9 w-[75px]" />}>
            {isDev && <User />}
          </Suspense>
        </div>
      </Header>
      <div className="w-full p-6">
        {draft.thumbnail && (
          <div className="max-w-xl aspect-[4/2.5] mx-auto">
            <Image
              src={cdn(draft.thumbnail)}
              fill
              alt="thumbnail"
              className="!static"
            />
          </div>
        )}
      </div>
      <DraftDock draft={draft} user={user} />
      <PageDockFiller />
    </>
  );
};

export default page;
