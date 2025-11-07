import LogoSvg from "@/components/logo-svg";
import { isDev } from "@/const/enviroment";
import Card from "@yz13/link/card";
import { getLink } from "@yz13/link/utils/link";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const link = await getLink(id);

  const data = link.data
  const user = data?.user;

  if (!user) return notFound();

  const name = user.fullname || user.username;
  const title = `${name} — на Link`;
  const description =
    user.description ||
    `${name} делится своими ссылками, проектами и идеями на Link.`;

  const imageUrl = user.avatar_url
    ? `https://cdn.links.yz13.ru${user.avatar_url}`
    : "https://yz13.link/og/default.png";

  const url = `https://yz13.link/${user.username}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Link",
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: `${name} на Link`,
        },
      ],
      locale: "ru_RU",
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ({ params }: Props) {
  const { id } = await params;
  const { data: json, exists } = await getLink(id);

  if (!exists) return notFound();
  if (!json) return "json is null"

  const user = json.user;

  return (
    <>
      <title>{user.username}</title>
      <div className="w-full md:p-6 p-3">
        <Card data={json} id={id} />

        <footer className="max-w-3xs mx-auto w-full p-6 mt-auto">
          <Link href={isDev ? "/" : "https://yz13.ru"} target="_blank">
            <LogoSvg className="hover:opacity-25 opacity-10 transition-opacity" />
          </Link>
        </footer>
      </div>
    </>
  )
}
