import dayjs from "dayjs";
import { HTMLAttributes } from "react";

type LibraryRecord = {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  description?: string;
  content: Array<RecordContent>;
};

type RecordContent = {
  tag: keyof HTMLElementTagNameMap; // HTML тег, например, 'div', 'span'
  attributes: Partial<
    HTMLAttributes<HTMLElementTagNameMap[RecordContent["tag"]]>
  >; // Частичные атрибуты для соответствующего тега
  sub?: Array<RecordContent>;
};

export const expampleRecord: LibraryRecord = {
  id: "example",
  created_at: dayjs().toString(),
  updated_at: dayjs().toString(),
  title: "Example",
  description: "This is example, how to use library record type",
  content: [
    {
      tag: "h1",
      attributes: {
        className: "text-2xl font-semibold",
        children: "Expample",
      },
    },
    {
      tag: "p",
      attributes: {
        className: "text-sm text-secondary",
        children: "This is example, how to use library record type",
      },
    },
  ],
};

export const records: LibraryRecord[] = [
  {
    id: "finance",
    created_at: dayjs("28.12.2024").toString(),
    updated_at: dayjs("29.12.2024").toString(),
    title: "Finance",
    description: "Finance app",
    content: [
      {
        tag: "h1",
        attributes: {
          className: "text-2xl font-semibold",
          children: "Finance",
        },
      },
      {
        tag: "p",
        attributes: {
          className: "text-sm text-secondary",
          children: "There i cound describe what is this app are.",
        },
      },
      {
        tag: "img",
        attributes: {
          className: "w-full object-conver rounded-xl aspect-[16/10]",
          // @ts-expect-error
          src: "/layers/finance-16-10.png",
          alt: "finance-app",
        },
      },
    ],
  },
];
