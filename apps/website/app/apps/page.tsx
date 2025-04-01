import { getProjects } from "rest-api/projects";
import Header from "@/components/header";
import { Logo } from "@/components/logo";
import Nav from "@/components/nav/nav";
import User from "@/components/user";
import { showAppsLink } from "@/const/flags";
import { getGroups, ReleaseType } from "@/const/releases";
import { groupByFirstLetter } from "@/lib/group";
import { ExternalLinkIcon, LayoutGridIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Skeleton } from "mono/components/skeleton";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { isDev } from "../login/get-url";
import ProjectTypeIcons from "../projects/project-type-icons";
import Empty from "./empty";
import AppCard from "./app-card";

const page = async () => {
  const { data: releases } = await getProjects();
  const groups = getGroups(releases ?? []);
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
      <div className="w-full divide-y border-b">
        <div className="w-full">
          <div className="grid-template max-w-screen-2xl w-full mx-auto border-x">
            <div className="w-full h-full pattern-lines" />
            <div className="lg:!min-h-20 min-h-10 flex items-center border-x p-6">
              <h1 className="text-2xl font-medium">Приложения</h1>
            </div>
            <div className="w-full h-full pattern-lines" />
          </div>
        </div>
        {keys.length ? (
          keys.map((key) => {
            const items = abc[key] ?? [];
            return (
              <div key={key} className="w-full">
                <div className="grid-template max-w-screen-2xl w-full mx-auto border-x">
                  <div className="w-full h-full pattern-lines" />
                  <div className="flex flex-col gap-2 p-6 border-x">
                    <span className="text-xl font-medium capitalize">
                      {key} ({items.length})
                    </span>
                    <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2 *:min-h-24">
                      {items.map((item) => {
                        return <AppCard key={`${key}/${item.id}`} app={item} />;
                      })}
                    </div>
                  </div>
                  <div className="w-full h-full pattern-lines" />
                </div>
              </div>
            );
          })
        ) : (
          <Empty />
        )}
      </div>
    </>
  );
};

export default page;
