import Dock, { DockSkeleton } from "@/components/dock/dock";
import PageDockFiller from "@/components/page-dock-filler";
import { showUser } from "@/const/flags";
import { getGroups } from "@/const/releases";
import { groupByFirstLetter } from "@/lib/group";
import { Suspense } from "react";
import { getProjects } from "rest-api/projects";
import RootHeader, { RootHeaderSkeleton } from "../new-root/header";
import AppCard from "./app-card";
import Empty from "./empty";

const page = async () => {
  const { data: releases } = await getProjects();
  const groups = getGroups(releases ?? []);
  const released = groups["released"];
  const abc = groupByFirstLetter("name", released);
  const keys = Object.keys(abc).sort();
  return (
    <>
      <Suspense fallback={<RootHeaderSkeleton />}>
        <RootHeader />
      </Suspense>
      <div className="w-full h-fit space-y-10 md:p-[2.5%] p-[5%]">
        <h1 className="text-2xl font-medium">Приложения</h1>
      </div>
      <div className="w-full space-y-6">
        {keys.length ? (
          keys.map((key) => {
            const items = abc[key] ?? [];
            return (
              <div key={key} className="w-full h-fit md:px-[2.5%] px-[5%]">
                <div className="flex flex-col gap-2">
                  <span className="text-xl font-medium capitalize">
                    {key} ({items.length})
                  </span>
                  <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2 *:min-h-24">
                    {items.map((item) => {
                      return <AppCard key={`${key}/${item.id}`} app={item} />;
                    })}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <Empty />
        )}
      </div>
      <PageDockFiller />
      <Suspense fallback={<DockSkeleton />}>
        <Dock showUser={await showUser()} />
      </Suspense>
    </>
  );
};

export default page;
