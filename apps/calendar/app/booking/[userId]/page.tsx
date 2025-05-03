import { ArrowLeftIcon } from "lucide-react";
import { Button } from "mono/components/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getUserAvailability } from "rest-api/calendar/schedule";
import { getUserById } from "rest-api/user";
import { cn } from "yz13/cn";
import Form from "./form";
import Header from "./header";

type PageProps = {
  params: Promise<{
    userId: string;
  }>;
  searchParams: Promise<{
    date?: string;
  }>;
};
export default async function page({ params, searchParams }: PageProps) {
  const { userId } = await params;
  const search = await searchParams;
  const { data: user } = await getUserById(userId);
  // const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (!user) return notFound();
  const date = search.date;
  const { data: availability } = await getUserAvailability(userId, date);
  return (
    <>
      <div className="max-w-2xl w-full mx-auto px-6 space-y-6 mt-[10%]">
        <Button variant="outline" asChild>
          <Link href="/">
            <ArrowLeftIcon size={16} />
            Вернуться
          </Link>
        </Button>
        <div className="space-y-3">
          <h1 className="text-2xl font-medium">Новый созвон</h1>
          <p className="text-sm text-muted-foreground">
            Создайте новый созвон, чтобы обговорить ваши планы или подробности о
            проекте.
          </p>
        </div>
      </div>
      <div
        className={cn(
          "max-w-2xl flex flex-col w-full mx-auto",
          "rounded-3xl border bg-background-secondary divide-y mt-12",
        )}
      >
        <Header user={user} />
        <Form uid={userId} availability={availability ?? undefined} />
      </div>
      <footer className="max-w-2xl flex flex-row justify-center w-full mx-auto p-6 mt-12">
        <span className="text-base text-muted-foreground text-center">
          YZ13
        </span>
      </footer>
    </>
  );
}
