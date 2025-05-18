import { customFetch } from "@/const/fetch";
import { Position } from "@/types/positions";

export const getPositions = async (locale: string) => {
  const url = `/positions/${locale}`;
  return await customFetch<Position[]>(url, {
    method: "GET",
  });
};

export const getPosition = async (locale: string, positionId: string) => {
  const url = `/positions/${locale}/${positionId}`;
  return await customFetch<Position>(url, {
    method: "GET",
  });
};
