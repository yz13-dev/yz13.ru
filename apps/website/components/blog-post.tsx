import type { BlogPost as Post } from "@/utils/blog/blog";
import { Button } from "@yz13/ui/button";
import { ChevronRightIcon } from "@yz13/ui/icons";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

type Props = {
  post: Post;
};
export default function BlogPost({ post }: Props) {
  const { title, summary, categories, ...rest } = post;

  const date = new Date(rest.date);

  return (
    <article className="container mx-auto px-6">
      <div className="flex items-center gap-2">
        <time dateTime={rest.date} className="font-medium text-muted-foreground">
          {format(date, "dd MMMM yyyy", { locale: ru })}
        </time>
      </div>
      <div className="py-4 *:block space-y-1">
        <h2 className="text-2xl font-medium">{title}</h2>
        <p className="text-base text-muted-foreground">{summary}</p>
      </div>
      <div className="flex items-start flex-wrap gap-2">
        {
          categories.map((category) => {
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
  )
}
export const BlogPostContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full hover:bg-card transition-colors py-6">
      {children}
    </div>
  )
}
