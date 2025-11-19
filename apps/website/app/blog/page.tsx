import BlogPost, { BlogPostContainer } from "@/components/blog-post";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { ThemeImage } from "@/components/theme-image";
import { getBlogPosts } from "@/utils/blog/blog";
import { Button } from "@yz13/ui/button";
import { FilterIcon } from "@yz13/ui/icons";
import { Skeleton } from "@yz13/ui/skeleton";
import { Suspense } from "react";


export default function Blog() {

  const posts = getBlogPosts();

  return (
    <>
      <title>Блог</title>
      <Suspense fallback={<Skeleton className="w-full h-16 rounded-none" />}>
        <Header />
      </Suspense>

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
          posts.length === 0 &&
          <div className="w-full container mx-auto px-6 py-6 space-y-6">
            <div className="text-center">
              <span className="text-muted-foreground">
                Нет записей в блоге
              </span>
            </div>
          </div>
        }
        {
          posts
            .map(post => {
              return (
                <BlogPostContainer key={post._meta.fileName}>
                  <BlogPost post={post} />
                </BlogPostContainer>
              )
            })
        }
      </div>

      <Footer />

    </>
  )
}
