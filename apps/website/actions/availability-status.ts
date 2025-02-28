import { get } from "@vercel/edge-config";

export async function isAvailable(): Promise<boolean> {
  return (await get("busy")) ?? false;
}
