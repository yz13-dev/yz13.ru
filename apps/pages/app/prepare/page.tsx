import { parsePages } from "@/actions/parse-pages";
import { Logo } from "@/components/logo";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import { permanentRedirect } from "next/navigation";
import PrepareList from "./prepare-list";

export const dynamic = "force-dynamic";

const page = () => {
  unstable_noStore();
  const pages = parsePages();
  if (!(process.env.NODE_ENV === "development")) return permanentRedirect("/");
  return (
    <>
      <div className="w-full h-16 border-b">
        <header className="container border-x mx-auto w-full h-full px-6 flex items-center justify-between">
          <Link href="/">
            <Logo size={{ width: 96, height: 18 }} type="full" />
          </Link>
          <Button className="gap-2" asChild>
            <Link href="https://yz13.ru">
              <span>yz13.ru</span>
              <ArrowRightIcon size={16} />
            </Link>
          </Button>
        </header>
      </div>
      <PrepareList pages={pages} />
    </>
  );
};

export default page;
