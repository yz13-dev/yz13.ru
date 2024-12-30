import Link from "next/link";
import { redirect } from "next/navigation";
import { createElement } from "react";
import { records } from "../records";

type PageProps = {
  params: {
    record: string;
  };
};
const page = ({ params }: PageProps) => {
  const recordId = params.record;
  const record = records.find((rc) => rc.id === recordId);
  if (!record) return redirect("/library");
  return (
    <>
      <div className="h-fit w-full p-3 max-w-4xl mx-auto min-h-[calc(100dvh - 64px)] space-y-6">
        <div className="flex items-center gap-1 *:text-sm *:text-secondary">
          <Link
            href="/library"
            className="hover:text-foreground transition-colors"
          >
            Library
          </Link>
          <span>/</span>
          <Link
            href={`/library/${recordId}`}
            className="hover:text-foreground transition-colors"
          >
            {record.name}
          </Link>
        </div>
        {record.content.map(({ tag, attributes }, index) => {
          return createElement(tag, {
            key: `${tag}-${record.id}-${index}`,
            ...attributes,
          });
        })}
      </div>
    </>
  );
};

export default page;
