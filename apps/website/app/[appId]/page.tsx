import { permanentRedirect } from "next/navigation";

type Props = {
  params: Promise<{ appId: string }>;
};
export default async function ({ params }: Props) {
  const { appId } = await params;
  const url = `/${appId}/screens`;
  return permanentRedirect(url);
}
