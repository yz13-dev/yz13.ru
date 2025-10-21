import { getStoreV1Id } from "@yz13/api";
import Form from "./form";

type Props = {
  searchParams: Promise<{
    appId: string;
    next: string;
  }>;
};

export default async function ({ searchParams }: Props) {
  const { appId } = await searchParams;

  const app = await getStoreV1Id(appId);

  return <Form app={app} />;
}
