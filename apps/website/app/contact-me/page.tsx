import Availability from "@/components/availability";
import Header from "@/components/header";
import { Logo } from "@/components/logo";
import Nav from "@/components/nav/nav";
import User from "@/components/user";
import { auth } from "@/lib/auth";
import { get } from "@vercel/edge-config";
import { Button } from "@yz13/ui/components/button";
import { Skeleton } from "@yz13/ui/components/skeleton";
import { LayoutGridIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { isDev } from "../login/get-url";
import ContactForm from "./contact-form";

const page = async () => {
  const user = await auth();
  const email = user?.email;
  const busy = (await get<boolean>("busy")) ?? false;
  if (busy && !isDev) return redirect("/");
  return (
    <>
      <Header className="sticky top-0">
        <Nav side="left">
          <Link href="/">
            <Logo size={20} type="full" />
          </Link>
        </Nav>
        <div className="flex items-center gap-2">
          <Suspense fallback={<Skeleton className="size-9" />}>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/apps">
                <LayoutGridIcon size={16} />
              </Link>
            </Button>
          </Suspense>
          <Suspense fallback={<Skeleton className="h-9 w-[75px]" />}>
            {isDev && <User />}
          </Suspense>
        </div>
      </Header>
      <div className="w-full h-[calc(100dvh-56px)] flex divide-x border-x max-w-screen-2xl mx-auto">
        <div className="lg:w-1/3 w-full h-full flex flex-col justify-center items-center">
          <ContactForm
            userEmail={email}
            className="border-y py-6 rounded-none"
          />
        </div>
        <div className="w-2/3 lg:flex items-center hidden">
          <div className="w-12 h-full pattern-lines border-r" />
          <div className="w-[calc(100%-48px)] divide-y">
            <div className="p-6">
              <div className="w-full aspect-video rounded-lg border-2" />
            </div>
            <div className="p-6">
              <Availability />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
