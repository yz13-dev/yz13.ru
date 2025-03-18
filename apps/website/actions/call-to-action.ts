"use server";

import { get } from "@vercel/edge-config";

export const getCallToAction = async () => {
  return await get<{ label: string; href: string | null }>("call-to-action");
};
