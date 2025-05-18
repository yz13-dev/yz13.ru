import { customFetch } from "@/const/fetch";
import { Position } from "@/types/positions";

export const getPositions = async (locale: string) => {
  const url = `/positions/${locale}`;
  return await customFetch<Position[]>(url, {
    method: "GET",
  });
};
