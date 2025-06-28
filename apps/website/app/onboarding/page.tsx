import { Logo } from "@/components/logo";
import { auth } from "@/lib/auth";
import { getV1PositionsLang } from "@yz13/api";
import { cn } from "@yz13/ui/cn";
import { Button } from "@yz13/ui/components/button";
import { Skeleton } from "@yz13/ui/components/skeleton";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Background from "../(root)/components/background";
import Form from "./form";

type PageProps = {
  searchParams: Promise<{
    continue?: string;
  }>;
};
export default async function page({ searchParams }: PageProps) {
  const search = await searchParams;
  const continueLink = search.continue;
  const positions = await getV1PositionsLang("ru");
  const disabled = !continueLink;
  const href = continueLink ? continueLink : "/";
  const user = await auth();
  if (!user) return redirect(href);

  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center">
      <Suspense
        fallback={
          <Skeleton className="w-full h-dvh absolute top-0 left-0 rounded-none" />
        }
      >
        <Background />
      </Suspense>
      <div className="max-w-4xl mb-8 justify-center flex">
        <Link
          href="/"
          className="opacity-60 hover:opacity-100 transition-opacity"
        >
          <Logo size={24} type="full" />
        </Link>
      </div>
      <div
        className={cn(
          "w-full max-w-4xl bg-background/80 rounded-3xl mx-auto z-20",
          "grid md:grid-cols-2 grid-cols-1 divide-x *:h-full *:w-full border *:px-6 *:py-8",
        )}
      >
        <div className="w-full h-fit flex flex-col gap-2 justify-start">
          <h1 className="text-2xl font-medium">Заполните информацию</h1>
          <p className="text-base text-muted-foreground">
            Ваша информация будет отображена в профиле, в комментариях в других
            местах и на сайте.
          </p>
        </div>
        <div className="w-full h-fit space-y-6 relative">
          <Form defaultUser={user} positions={positions ?? []} />
          <div className="flex justify-end mt-24">
            {href ? (
              <Button asChild disabled={disabled}>
                <Link href={href}>Завершить</Link>
              </Button>
            ) : (
              <Button disabled={disabled}>Завершить</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
