"use client";
import { MDXContent } from "@content-collections/mdx/react";
import { cn } from "@yz13/ui/cn";
import Image from "next/image";

export default function Content({ content }: { content: string }) {
  return (
    <article
      className={cn(
        "markdown *:px-6 *:mx-auto",
        "[&>h1]:max-w-2xl",
        "[&>h2]:max-w-2xl",
        "[&>h3]:max-w-2xl",
        "[&>h4]:max-w-2xl",
        "[&>h5]:max-w-2xl",
        "[&>h6]:max-w-2xl",
        "[&>p]:max-w-2xl",
        "[&>ul]:max-w-2xl",
        "[&>img]:py-12",
      )}
    >
      <MDXContent
        code={content}
        components={{
          img: ({ src, alt, width, height, className = "", ...props }) => {
            return (
              <Image
                src={src}
                className={cn("w-full max-w-4xl py-12 relative", className)}
                alt={alt}
                width={width}
                height={height}
                {...props}
              />
            );
          },
        }}
      />
    </article>
  );
}
