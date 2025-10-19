import { getBlogV1Posts, getNewsV1 } from "@yz13/api";
import { Badge } from "@yz13/ui/badge";
import { Button } from "@yz13/ui/button";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@yz13/ui/input-group";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { ArrowRightIcon, ExternalLinkIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { Logo } from "./components/logo";

export default async function () {

  const blog = await getBlogV1Posts();
  const news = await getNewsV1();

  return (
    <>
      <header className="w-full flex px-6 pt-4 items-center justify-between">
        <div className="w-1/3 flex justify-start">
          <Logo type="full" />
        </div>
        <div className="w-1/3 flex justify-end">
          <div className="size-10 rounded-full border bg-secondary" />
        </div>
      </header>
      <div className="max-w-4xl mx-auto py-12 space-y-2">
        <div className="shrink-0 rounded-xl w-full h-12 bg-card border">
          <InputGroup className="w-full h-12 !text-xl font-medium rounded-xl border-none bg-none shadow-none">
            <InputGroupInput placeholder="Поиск среди сервисов YZ13" className="w-full h-12 !text-xl font-medium rounded-xl border-none bg-none shadow-none px-4" />
            <InputGroupAddon>
              <SearchIcon className="size-6" />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end" className="px-4 py-2 h-full">
              <InputGroupButton variant="secondary" className="h-full aspect-square"><ArrowRightIcon className="size-4" /></InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div className="flex justify-between items-center">
          <div></div>
          <div>
            <Button variant="secondary" size="sm" asChild>
              <Link href="https://yz13.dev">
                <span>yz13.dev</span>
                <ArrowRightIcon />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full max-w-4xl mx-auto pb-6 *:pt-6">
        <div className="w-full flex gap-4">
          <section className="w-2/3">
            <div className="w-full py-4">
              <h3 className="text-2xl font-medium">Новостная лента</h3>
            </div>
            <ul>
              {
                (news || [])
                  .slice(0, 5)
                  .map(article => {

                    // @ts-expect-error
                    const source = article.news_source as { name: string, url: string };
                    const name = source.name;

                    const source_url = source.url;
                    const url = article.url;

                    return (
                      <li key={article.id} className="w-full cursor-pointer group justify-between flex items-center gap-2 py-2">
                        <div className="flex items-center gap-2 max-w-[75%] relative">
                          <Link href={url} className="absolute inset-0" />
                          <div className="size-5 rounded-full shrink-0 border bg-secondary" />
                          <span className="text-sm line-clamp-1 group-hover:underline">{article.title}</span>
                        </div>
                        <span className="dashed-line" />
                        <Badge variant="outline" asChild>
                          <Link href={source_url}>
                            {name}<ExternalLinkIcon />
                          </Link>
                        </Badge>
                      </li>
                    )
                  })
              }
            </ul>
          </section>
          <section className="w-1/3">
            <div className="w-full py-4">
              <h3 className="text-2xl font-medium">Блог</h3>
            </div>
            <ul>
              {
                blog
                  .map(post => {
                    const id = post.id;

                    const date = new Date(post.date);
                    const url = `https://blog.yz13.ru/${post.id}`;

                    return (
                      <li key={id} className="w-full justify-between relative group flex items-center gap-2 py-2">
                        <Link href={url} className="absolute inset-0" />
                        <span className="text-sm group-hover:underline">{post.title}</span>
                        <span className="dashed-line" />
                        <Badge variant="outline">{format(date, "dd LLLL", { locale: ru })}</Badge>
                      </li>
                    )
                  })
              }
            </ul>
          </section>
        </div>
        <section className="w-full">
          <div className="w-full py-4">
            <h3 className="text-2xl font-medium">Пины</h3>
          </div>
          <div className="w-full flex gap-2">
            <div className="w-1/4 space-y-2">
              <div className="w-full aspect-square bg-secondary rounded-xl" />
              <div className="w-full aspect-[9/16] bg-secondary rounded-xl" />
              <div className="w-full aspect-square bg-secondary rounded-xl" />
              <div className="w-full aspect-[9/16] bg-secondary rounded-xl" />
            </div>
            <div className="w-1/4 space-y-2">
              <div className="w-full aspect-[9/16] bg-secondary rounded-xl" />
              <div className="w-full aspect-square bg-secondary rounded-xl" />
              <div className="w-full aspect-[9/16] bg-secondary rounded-xl" />
              <div className="w-full aspect-square bg-secondary rounded-xl" />
            </div>
            <div className="w-1/4 space-y-2">
              <div className="w-full aspect-square bg-secondary rounded-xl" />
              <div className="w-full aspect-[9/16] bg-secondary rounded-xl" />
              <div className="w-full aspect-square bg-secondary rounded-xl" />
              <div className="w-full aspect-[9/16] bg-secondary rounded-xl" />
            </div>
            <div className="w-1/4 space-y-2">
              <div className="w-full aspect-[9/16] bg-secondary rounded-xl" />
              <div className="w-full aspect-square bg-secondary rounded-xl" />
              <div className="w-full aspect-[9/16] bg-secondary rounded-xl" />
              <div className="w-full aspect-square bg-secondary rounded-xl" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
