import { allPosts } from "@/.content-collections/generated";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { ThemeImage } from "@/components/theme-image";
import { Button } from "@yz13/ui/button";
import { ChevronRightIcon, FilterIcon } from "@yz13/ui/icons";
import { format } from "date-fns";
import { ru } from "date-fns/locale";


export default function Blog() {
  return (
    <>
      <Header />

      <div className="w-full container px-6 mx-auto h-fit md:pt-32 pt-24 md:pb-16 pb-12 space-y-12">
        <div className="size-32 relative outline-6 border outline-border/40 rounded-3xl bg-card flex items-center justify-center">
          <ThemeImage
            className="relative"
            srcDark="/projects/blog/logo/dark.png"
            srcLight="/projects/blog/logo/light.png"
            width={96}
            height={96}
            alt="logo"
          />
        </div>
      </div>
      <div className="w-full container px-6 mx-auto h-fit py-6 space-y-12">
        <h1 className="text-6xl block font-medium">Блог</h1>
        {
          false &&
          <div className="pt-6 flex items-center gap-2">
            <Button variant="secondary"><FilterIcon /><span>Фильтры</span></Button>
          </div>
        }
      </div>

      <div className="w-full divide-y border-y">

        {
          allPosts.length === 0 &&
          <div className="w-full container mx-auto px-6 py-6 space-y-6">
            <div className="text-center">
              <span className="text-muted-foreground">
                Нет записей в блоге
              </span>
            </div>
          </div>
        }

        {
          allPosts
            .map((post) => {

              const date = new Date(post.date);

              return (
                <div key={post._meta.fileName} className="w-full hover:bg-card transition-colors py-6">
                  <article className="container mx-auto px-6">
                    <div className="flex items-center gap-2">
                      <time dateTime={post.date} className="font-medium text-muted-foreground">
                        {format(date, "dd MMMM yyyy", { locale: ru })}
                      </time>
                    </div>
                    <div className="py-4 *:block space-y-1">
                      <h2 className="text-2xl font-medium">{post.title}</h2>
                      <p className="text-base text-muted-foreground">{post.summary}</p>
                    </div>
                    <div className="flex items-start flex-wrap gap-2">
                      {
                        post.categories.map((category) => {
                          return (
                            <Button
                              className="text-base capitalize text-muted-foreground px-3"
                              size="sm"
                              variant="outline"
                              key={category}
                            >
                              {category}
                              <ChevronRightIcon className="size-4!" />
                            </Button>
                          );
                        })
                      }
                    </div>
                  </article>
                </div>
              )
            })
        }

      </div>

      <Footer />

    </>
  )
}
