import { getDraft } from "@/actions/drafts/drafts";
import PageDockFiller from "@/components/page-dock-filler";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { unstable_noStore } from "next/cache";
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
        <div className="max-w-xl w-full aspect-[4/2.5] mx-auto rounded-xl border"></div>
      </div>
      <DraftDock draft={draft} />
      <PageDockFiller />
    </>
  );
};

export default page;
