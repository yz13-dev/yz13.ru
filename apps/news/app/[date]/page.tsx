import Footer from "@/components/footer";
import { CalendarLocale, contries, locales } from "@/const/locale-to-country";
import { chunk } from "@/lib/chunk";
import { getLocaleFromCookie } from "@/lib/locale";
import { format, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { getArticlesForCountry } from "rest-api/articles";
import AutoGrid from "../(root)/auto-grid";
import CalendarPicker from "../(root)/calendar-picker";
import NewsChunk from "../(root)/news-chunk";

type PageProps = {
  params: Promise<{ date: string }>;
};
const page = async ({ params }: PageProps) => {
  const { date } = await params;
  const defaultDate = new Date();
  const dateParam = parse(date, "yyyy-MM-dd", new Date());
  const targetDate = dateParam ?? defaultDate;
  const language = (await getLocaleFromCookie()) || "RU";
  const { data } = await getArticlesForCountry(
    language,
    0,
    format(date, "yyyy-MM-dd"),
  );
  const articles = data ?? [];
  const sliceNumber = 4;
  const chunks = chunk(articles, sliceNumber);
  const firstChunk = chunks[0];
  const restOfChunks = chunks.slice(1);
  const flattedRestOfChunks = restOfChunks.flat();
  const country = contries[language as keyof typeof contries];

  const calendarDate = format(targetDate, "EEEE, dd MMMM", {
    locale: locales[language.toLowerCase() as CalendarLocale],
  });

  return (
    <>
      <div className="py-6 space-y-6 mt-[10dvh] *:px-6 max-w-4xl mx-auto">
        <div className="flex w-full flex-col gap-2">
          <h1 className="text-3xl font-medium">Сводка новостей / {country}</h1>
          <CalendarPicker
            locale={language.toLowerCase() as CalendarLocale}
            date={format(targetDate, "yyyy-MM-dd")}
          >
            <Button variant="secondary" className="w-fit text-muted-foreground">
              <CalendarIcon className="lg:size-5 size-4" />
              <span className="lg:text-lg text-sm capitalize">
                {calendarDate}
              </span>
            </Button>
          </CalendarPicker>
        </div>
      </div>
      <div className="*:p-6 max-w-4xl mx-auto rounded-3xl bg-background divide-y">
        <NewsChunk
          articles={firstChunk}
          locale={language.toLowerCase() as CalendarLocale}
        />
        <AutoGrid
          data={flattedRestOfChunks}
          defaultOffset={articles.length}
          locale={language}
        />
      </div>
      <Footer />
    </>
  );
};

export default page;
