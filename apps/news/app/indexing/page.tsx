import { getCountryCodes } from "@/actions/codes/codes";
import { SidebarProvider } from "mono/components/sidebar";
import { Suspense } from "react";
import AppSidebar from "../(root)/sidebar/app-sidebar";
import CountryNewsSource, {
  CountryNewsSourceSkeleton,
} from "./country-news-source";

const page = async () => {
  const codes = await getCountryCodes();
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full p-6">
        <ul className="space-y-12">
          {codes.map((code) => {
            return (
              <li key={code}>
                <div className="w-full flex flex-col gap-4">
                  <span className="text-2xl font-semibold text-secondary">
                    {code}
                  </span>
                  <Suspense fallback={<CountryNewsSourceSkeleton />}>
                    <CountryNewsSource code={code} />
                  </Suspense>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </SidebarProvider>
  );
};

export default page;
