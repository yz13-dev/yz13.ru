import Header from "@/components/header";
import { getBlogPost } from "@/utils/blog/blog";
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
    </>
  )
}
