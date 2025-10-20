import { getBlogV1Posts } from "@yz13/api";
import { Badge } from "@yz13/ui/badge";
import { Skeleton } from "@yz13/ui/skeleton";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import Link from "next/link";

export default async function () {
    const blog = await getBlogV1Posts();

    return (
        <ul>
            {blog.map((post) => {
                const id = post.id;

                const date = new Date(post.date);
                const url = `https://blog.yz13.ru/${post.id}`;

                return (
                    <li
                        key={id}
                        className="w-full justify-between relative group flex items-center gap-2 py-2"
                    >
                        <Link href={url} className="absolute inset-0" />
                        <span className="text-sm group-hover:underline">
                            {post.title}
                        </span>
                        <span className="dashed-line" />
                        <Badge variant="outline">
                            {format(date, "dd LLLL", {
                                locale: ru,
                            })}
                        </Badge>
                    </li>
                );
            })}
        </ul>
    );
}

export const BlogLoading = () => {
    return (
        <ul>
            <li className="py-2">
                <Skeleton className="h-5 w-full" />
            </li>
            <li className="py-2">
                <Skeleton className="h-5 w-full" />
            </li>
            <li className="py-2">
                <Skeleton className="h-5 w-full" />
            </li>
            <li className="py-2">
                <Skeleton className="h-5 w-full" />
            </li>
            <li className="py-2">
                <Skeleton className="h-5 w-full" />
            </li>
        </ul>
    );
};
