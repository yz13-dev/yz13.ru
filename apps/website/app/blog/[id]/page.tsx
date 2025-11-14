import Content from "@/app/(library)/components/content";
import Header from "@/components/header";
import { getBlogPost } from "@/utils/blog/blog";
import { Button } from "@yz13/ui/button";
import { ChevronRightIcon } from "@yz13/ui/icons";
import { Separator } from "@yz13/ui/separator";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { notFound } from "next/navigation";





type Props = {
  params: Promise<{
    id: string
  }>
}
export default async function Blog({ params }: Props) {

  const { id } = await params;

  const post = getBlogPost(id);

  if (!post) return notFound();

  return (
    <>
      <Header />
      <main className="space-y-12 py-6">
        <div className="max-w-2xl mx-auto w-full px-6">
          <div className="w-full pb-6">
            <time
              dateTime={post.date}
              className="text-sm text-muted-foreground capitalize"
            >
              {format(new Date(post.date), "LLLL, yyyy", { locale: ru })}
            </time>
          </div>
          <div className="*:block space-y-2">
            <h3 className="lg:text-4xl text-2xl font-medium text-muted-foreground">
              {post.title}
            </h3>
            <p className="lg:text-4xl text-2xl font-medium text-foreground">
              {post.summary}
            </p>
          </div>
          <div className="w-full pt-6">
            {
              post.categories.map(category => {
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

        </div>

        <Separator className="max-w-2xl mx-auto" />

        <Content content={post.body} />

      </main>
    </>
  )
}
