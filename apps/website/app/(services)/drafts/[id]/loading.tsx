import Header from "@/components/header";
import { XIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Skeleton } from "mono/components/skeleton";
import Link from "next/link";

const loading = () => {
  return (
    <>
      <Header className="w-full h-14 flex items-center px-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/drafts">
            <XIcon size={16} />
          </Link>
        </Button>
      </Header>
      <div className="w-full p-6">
        <Skeleton className="max-w-xl aspect-[4/2.5] mx-auto w-full" />
      </div>
    </>
  );
};

export default loading;
