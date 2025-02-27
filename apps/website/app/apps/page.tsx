import { getProjects } from "@/actions/projects/projects";
import Header from "@/components/header";
import { Logo } from "@/components/logo";
import Nav from "@/components/nav/nav";
import User from "@/components/user";
import { showAppsLink } from "@/const/flags";
import { getGroups } from "@/const/releases";
import { groupByFirstLetter } from "@/lib/group";
import { LayoutGridIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Skeleton } from "mono/components/skeleton";
import Link from "next/link";
import { Suspense } from "react";
import { isDev } from "../login/get-url";
import Empty from "./empty";

const page = async () => {
  const releases = await getProjects();
  const groups = getGroups(releases);
  const released = groups["released"];
  const abc = groupByFirstLetter("name", released);
  const keys = Object.keys(abc).sort();
  return (
    <>
      <Header className="sticky top-0">
        <Nav side="left">
          <Link href="/">
            <Logo size={{ width: 110, height: 20 }} type="full" />
          </Link>
        </Nav>
        <div className="flex items-center gap-2">
          <Suspense fallback={<Skeleton className="size-9" />}>
            {(await showAppsLink()) && (
              <Button variant="ghost" size="icon" asChild>
                <Link href="/apps">
                  <LayoutGridIcon size={16} />
                </Link>
              </Button>
            )}
          </Suspense>
          <Suspense fallback={<Skeleton className="h-9 w-[75px]" />}>
            {isDev && <User />}
          </Suspense>
        </div>
      </Header>
      <div className="w-full">
        <div className="max-w-screen-2xl w-full mx-auto border-x">
          {keys.length ? (
            keys.map((key) => {
              const items = abc[key];
              return (
                <div key={key}>
                  <span>{key}</span>
                </div>
              );
            })
          ) : (
            <Empty />
          )}
        </div>
      </div>
    </>
  );
};

export default page;
