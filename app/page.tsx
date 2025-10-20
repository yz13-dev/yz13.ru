import {
    getBlogV1Posts,
    getNewsV1Recent,
    getPinsV1PinsRecommendations,
} from "@yz13/api";
import { Badge } from "@yz13/ui/badge";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import Favicon from "./components/favicon";
import { Logo } from "./components/logo";
import LogoSvg from "./components/logo-svg";
import LinkLogo from "./components/logos/link-logo";
import PinsGrid from "./components/pins/pins-grid";
import SearchInput from "./components/search-input";
import User from "./components/user";
import News, { NewsLoading } from "./components/news";
import { Suspense } from "react";
import Blog, { BlogLoading } from "./components/blog";
import Pins from "./components/pins";
import { Skeleton } from "@yz13/ui/skeleton";

export default function () {
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
            <div className="max-w-4xl md:h-[calc(75dvh-56px)] h-fit mx-auto flex flex-col items-center justify-center pt-12 md:pb-36 pb-12 gap-2">
                <div className="w-full px-6 flex flex-col justify-center gap-24">
                    <div className="flex items-center mx-auto gap-6">
                        <div className="px-6">
                            <div className="flex flex-col gap-1.5 justify-center items-center group cursor-pointer">
                                <div className="size-16 rounded-lg border-2 group-hover:bg-secondary/50 group-hover:!border-foreground flex justify-center items-center p-2">
                                    <Logo type="icon" />
                                </div>
                                <span className="text-center text-sm font-medium text-muted-foreground">
                                    Портфолио
                                </span>
                            </div>
                        </div>

                        <div className="px-6">
                            <div className="flex flex-col gap-1.5 justify-center items-center group cursor-pointer">
                                <div className="size-16 rounded-lg border-2 group-hover:bg-secondary/50 group-hover:!border-foreground flex justify-center items-center p-2">
                                    <LinkLogo type="icon" />
                                </div>
                                <span className="text-center text-sm font-medium text-muted-foreground">
                                    Линк
                                </span>
                            </div>
                        </div>
                    </div>
                    <SearchInput />
                </div>
                <div className="flex px-6 justify-between w-full items-center">
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div className="w-full max-w-6xl mx-auto pb-6 *:px-6 *:pt-6">
                <div className="w-full flex md:flex-row flex-col gap-6">
                    <section className="md:w-2/3 w-full">
                        <div className="w-full py-4">
                            <h3 className="text-2xl font-medium">
                                Новостная лента
                            </h3>
                        </div>
                        <Suspense fallback={<NewsLoading />}>
                            <News />
                        </Suspense>
                    </section>
                    <section className="md:w-1/3 w-full">
                        <div className="w-full py-4">
                            <h3 className="text-2xl font-medium">Блог</h3>
                        </div>
                        <Suspense fallback={<BlogLoading />}>
                            <Blog />
                        </Suspense>
                    </section>
                </div>
                <section className="w-full">
                    <div className="w-full py-4">
                        <h3 className="text-2xl font-medium">Пины</h3>
                    </div>
                    <div className="w-full flex gap-2">
                        <Suspense fallback={<Skeleton className="w-full" />}>
                            <Pins />
                        </Suspense>
                    </div>
                </section>
            </div>
            <footer className="max-w-6xl mx-auto w-full px-6 pt-24 pb-6">
                <LogoSvg className="opacity-10" />
            </footer>
        </>
    );
}
