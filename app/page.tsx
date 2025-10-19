import { getBlogV1Posts, getNewsV1Recent, getPinsV1PinsRecommendations } from "@yz13/api";
import { Badge } from "@yz13/ui/badge";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@yz13/ui/input-group";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { ArrowRightIcon, ExternalLinkIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import Favicon from "./components/favicon";
import { Logo } from "./components/logo";
import LogoSvg from "./components/logo-svg";
import LinkLogo from "./components/logos/link-logo";
import PinsGrid from "./components/pins-grid";
import User from "./components/user";

export default async function () {

  const blog = await getBlogV1Posts();
  const news = await getNewsV1Recent();
  const pins = await getPinsV1PinsRecommendations();

  return (
    <>
      <header className="w-full flex px-6 pt-4 items-center justify-between">
        <div className="w-1/3 flex justify-start">
          <Logo type="full" />
        </div>
        <div className="w-1/3 flex justify-end">
          <User />
        </div>
      </header>
      <div className="max-w-4xl h-[calc(75dvh-56px)] mx-auto flex flex-col items-center justify-center pt-12 pb-36 gap-2">
        <div className="w-full px-6 flex flex-col justify-center gap-24">
          <div className="flex items-center mx-auto gap-6">

            <div className="px-6">
              <div className="flex flex-col gap-1.5 justify-center items-center group cursor-pointer">
                <div className="size-16 rounded-lg border-2 group-hover:bg-secondary/50 group-hover:!border-foreground flex justify-center items-center p-2">
                  <Logo type="icon" />
                </div>
                <span className="text-center text-sm font-medium text-muted-foreground">Портфолио</span>
              </div>
            </div>

            <div className="px-6">
              <div className="flex flex-col gap-1.5 justify-center items-center group cursor-pointer">
                <div className="size-16 rounded-lg border-2 group-hover:bg-secondary/50 group-hover:!border-foreground flex justify-center items-center p-2">
                  <LinkLogo type="icon" />
                </div>
                <span className="text-center text-sm font-medium text-muted-foreground">Линк</span>
              </div>
            </div>

          </div>
          <div className="shrink-0 rounded-xl w-full h-14 bg-card border">
            <InputGroup className="w-full h-14 *:h-full !text-xl font-medium rounded-xl border-none bg-none shadow-none">
              <InputGroupInput placeholder="Поиск внутри YZ13" className="w-full !text-xl font-medium rounded-xl border-none bg-none shadow-none px-4" />
              <InputGroupAddon>
                <SearchIcon className="size-6" />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end" className="px-4 py-2 h-full">
                <InputGroupButton variant="secondary" className="h-full aspect-square"><ArrowRightIcon className="size-4" /></InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
        <div className="flex px-6 justify-between w-full items-center">
          <div></div>
          <div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-6xl mx-auto pb-6 *:px-6 *:pt-6">
        <div className="w-full flex md:flex-row flex-col gap-6">
          <section className="md:w-2/3 w-full">
            <div className="w-full py-4">
              <h3 className="text-2xl font-medium">Новостная лента</h3>
            </div>
            <ul>
              {
                (news || [])
                  .map(article => {

                    const source = article.news_source as { name: string, url: string };
                    const name = source.name;

                    const source_url = source.url;
                    const url = article.url;

                    return (
                      <li key={article.id} className="w-full cursor-pointer group justify-between flex items-center gap-2 py-2">
                        <div className="flex items-center gap-2 max-w-[75%] relative">
                          <Link href={url} className="absolute inset-0" />
                          <div className="size-5 rounded-full shrink-0 border flex items-center justify-center bg-transparent">
                            <Favicon url={source_url} size={18} />
                          </div>
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
          <section className="md:w-1/3 w-full">
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
            <PinsGrid pins={pins} />
          </div>
        </section>
      </div>
      <footer className="max-w-6xl mx-auto w-full px-6 pt-24 pb-6">
        <LogoSvg className="opacity-10" />
      </footer>
    </>
  );
}
