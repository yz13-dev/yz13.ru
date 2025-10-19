import { sortToColumns } from "@/app/utils/sort-columns";
import type { GetPinsV1PinsRecommendations200Item } from "@yz13/api/types";
import { configResponsive, useResponsive } from "ahooks";
import { useMemo } from "react";

export type Pin = GetPinsV1PinsRecommendations200Item;

configResponsive({
  "extra-large": 1600,
  large: 1024,
  medium: 768,
  small: 480,
})

type ColsOptions = {
  "extra-large"?: number,
  large?: number;
  medium?: number;
  small?: number;
}

const defaultOptions: ColsOptions = {
  "extra-large": 3,
  large: 3,
  medium: 3,
  small: 2,
}

export default function (pins?: Pin[], options?: ColsOptions): Pin[][] {

  const list = useMemo(() => pins || [], [pins])

  const opts = options ?? defaultOptions;

  const responsive = useResponsive();

  const keys = Object.keys(responsive ?? {});

  let columns = sortToColumns(list, 2);

  for (const key of keys) {

    const value = opts[key as keyof ColsOptions] ?? defaultOptions[key as keyof ColsOptions];
    const isTrue = responsive[key as keyof ColsOptions] === true;

    console.log(key, value)

    if (isTrue && value) {
      columns = sortToColumns(list, value);
      break;
    }

  }

  return columns
}
