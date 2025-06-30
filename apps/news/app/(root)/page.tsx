import Footer from "@/components/footer";
import { type CalendarLocale, contries, locales } from "@/const/locale-to-country";
import { chunk } from "@/lib/chunk";
import { getLocaleFromCookie } from "@/lib/locale";
import { getV1NewsCountryCodeArticles } from "@yz13/api";
import { Button } from "@yz13/ui/components/button";
import { format } from "date-fns";
import { BracketsIcon, CalendarIcon } from "lucide-react";
import AutoGrid from "./auto-grid";
import CalendarPicker from "./calendar-picker";
import NewsChunk from "./news-chunk";
import Time from "./time";

const page = async () => {
  const language = (await getLocaleFromCookie()) || "RU";

  const data = await getV1NewsCountryCodeArticles(language);

  const articles = data ?? [];
  const sliceNumber = 8;
  const chunks = chunk(articles, sliceNumber);
  const firstChunk = chunks[0] ?? [];
  const restOfChunks = chunks.slice(1);
  const flattedRestOfChunks = restOfChunks.flat();
  const country = contries[language as keyof typeof contries];

  const calendarDate = format(new Date(), "EEEE, dd MMMM", {
    locale: locales[language.toLowerCase() as CalendarLocale],
  });

  return (
    <>
      <div className="py-6 space-y-6 mt-[10dvh] *:px-6 max-w-4xl mx-auto">
        <div className="flex w-full flex-col gap-2">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-medium">Сводка новостей</h1>
            <span className="text-3xl font-medium">/</span>
            {/* <CountryPicker country={language}> */}
            <span className="text-3xl font-medium">{country}</span>
            {/* </CountryPicker> */}
          </div>
          <div className="flex items-center gap-4">
            <Time className="text-2xl text-muted-foreground font-medium" />
            <CalendarPicker locale={language.toLowerCase() as CalendarLocale}>
              <Button variant="secondary" className="w-fit text-muted-foreground">
                <CalendarIcon className="lg:size-5 size-4" />
                <span className="lg:text-lg text-sm capitalize">
                  {calendarDate}
                </span>
              </Button>
            </CalendarPicker>
          </div>
        </div>
      </div>
      <div className="*:p-6 max-w-4xl border mx-auto rounded-3xl bg-background divide-y">
        {
          firstChunk?.length === 0
            ?
            <div className="w-full gap-2 aspect-video flex items-center justify-center">
              <BracketsIcon size={18} className="text-muted-foreground" />
              <span className="text-base text-muted-foreground">
                Список пустой
              </span>
            </div>
            :
            <NewsChunk
              articles={firstChunk}
              locale={language.toLowerCase() as CalendarLocale}
            />
        }
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
