import { getDraft } from "@/actions/drafts/drafts";
import { getUserById } from "@/actions/user/user";
import PageDockFiller from "@/components/page-dock-filler";
import { cdn } from "@/lib/cdn";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { unstable_noStore } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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
      <header className="w-full h-14 flex items-center px-6">
        <Button variant="ghost" className="flex items-center gap-2" asChild>
          <Link href="/drafts">
            <ArrowLeftIcon size={16} />
            Вернуться
          </Link>
        </Button>
      </header>
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
