import Dock from "@/components/dock/dock";
import { HandwrittenStrikethrough } from "@/components/handwritten-strikethrough";
import { Logo } from "@/components/logo";
import { Typewriter } from "@/components/text-writter";
import { Skeleton } from "mono/components/skeleton";
import Link from "next/link";
import { Suspense } from "react";
import Availability from "../(root)/availability";
import ConnectButton from "../(root)/connect-button";
import LoginButton from "./login-button";

const page = async () => {
  return (
    <>
      <header className="w-full h-fit px-6 pt-6 flex items-center justify-between">
        <Link href="/">
          <Logo size={{ width: 64, height: 64 }} type="only-icon" />
        </Link>
        <LoginButton />
      </header>
      <main className="w-full h-[calc(100dvh-88px)] flex flex-col items-center justify-center pb-12">
        <div className="w-full max-w-xl space-y-6 mx-auto *:px-6 py-6 ">
          <div className="flex flex-row gap-x-2 flex-wrap w-full">
            <div className="w-full">
              <Typewriter
                text={[
                  "Фронтенд разработчик.",
                  "Сайты и веб-приложения.",
                  "YZ13",
                ]}
                speed={100}
                loop={true}
                className="text-foreground text-2xl font-medium"
              />
            </div>
            <span className="text-secondary text-2xl w-fit font-medium">
              На пути к{" "}
              <HandwrittenStrikethrough>отдыху</HandwrittenStrikethrough>{" "}
              фуллстеку.
              <ConnectButton className="inline-block text-2xl mx-2" />
            </span>
          </div>
          <div className="w-full">
            <Suspense fallback={<Skeleton className="h-4 w-full rounded-md" />}>
              <Availability />
            </Suspense>
          </div>
        </div>
      </main>
      <Dock />
    </>
  );
};

export default page;
