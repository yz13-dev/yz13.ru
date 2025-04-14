import { isDev } from "@/app/login/get-url";
import Header from "@/components/header";
import User from "@/components/user";
import { cdn } from "@/lib/cdn";
import { XIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Skeleton } from "mono/components/skeleton";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getDraft } from "rest-api/drafts";
import { getUserById } from "rest-api/user";
import DraftDock from "./dock";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};
const page = async ({ params }: PageProps) => {
  const { id } = await params;
  const { data: draft } = await getDraft(id);
  if (!draft) return notFound();
  const { data: author } = await getUserById(draft.by);
  return (
    <>
      <Header className="w-full h-14 flex items-center px-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/drafts">
            <XIcon size={16} />
          </Link>
        </Button>
        <div className="flex items-center gap-4">
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
              className="!static rounded-lg"
            />
          </div>
        )}
      </div>
      <DraftDock draft={draft} author={author} />
    </>
  );
};

export default page;
