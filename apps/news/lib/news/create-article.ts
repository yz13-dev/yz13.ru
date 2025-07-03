import { sourcesWithObjectTags } from "@/const/sources-rules";
import type { PostV1NewsArticlesNewBody } from "@yz13/api/types";
import { createClient } from "@yz13/supabase/server";
import { cookies } from "next/headers";
import { parseObjTags } from "../parse-obj-tags";



export async function createArticle(article: PostV1NewsArticlesNewBody) {

  try {
    // const NEWS_API_TOKEN = process.env.NEWS_API_TOKEN;
    // const tokenValid = token.replace("Bearer ", "") === NEWS_API_TOKEN;

    // if (!tokenValid) {
    // return { error: "Unauthorized" };
    // }

    if (!article.source_id) {
      console.log("article.source_id", article.source_id);
      return null;
    }

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const title = article.title;
    const source_id = article.source_id;

    const { data: similarArticles } = await supabase
      .from("news")
      .select()
      .eq("title", title)
      .eq("source_id", source_id);

    if (similarArticles && similarArticles.length > 0) {
      console.log("article already exists", title, similarArticles.length);
      return null
    }

    const tags: string[] = (article.tags || []).filter(
      (tag: string | null) => tag !== null,
    );
    const isSourceWithObjectTags = sourcesWithObjectTags.includes(source_id || "");
    const articleTags = isSourceWithObjectTags ? parseObjTags(tags) : tags;

    const { data, error } = await supabase
      .from("news")
      .insert({ ...article, tags: articleTags })
      .select()
      .maybeSingle();

    console.log(data, error);
    if (error) {
      console.log(error)
      return null
    }

    if (!data) {
      return null
    }

    return data
  } catch (error) {
    console.log(error);
    return null;
  }

}
