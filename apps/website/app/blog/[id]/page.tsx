import Footer from "@/components/footer";
import Header from "@/components/header";
import { Skeleton } from "@yz13/ui/skeleton";
import { Suspense } from "react";
import Post from "./components/post";





type Props = {
  params: Promise<{
    id: string
  }>
}
export default async function Blog({ params }: Props) {

  const id = params.then(it => it.id);

  return (
    <>
      <Suspense fallback={<Skeleton className="w-full h-16 rounded-none" />}>
        <Header />
      </Suspense>
      <Suspense fallback={<Skeleton className="w-full h-16 rounded-none" />}>
        <Post id={id} />
      </Suspense>
      <Footer />
    </>
  )
}
