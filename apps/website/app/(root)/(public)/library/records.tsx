import { HTMLAttributes } from "react";
import { finance, Release } from "../../releases/releases";

type LibraryRecord = {
  content: Array<RecordContent>;
} & Release;

type RecordContent = {
  tag: keyof HTMLElementTagNameMap; // HTML тег, например, 'div', 'span'
  attributes: Partial<
    HTMLAttributes<HTMLElementTagNameMap[RecordContent["tag"]]>
  >; // Частичные атрибуты для соответствующего тега
  sub?: Array<RecordContent>;
};

export const records: LibraryRecord[] = [
  {
    ...finance,
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
