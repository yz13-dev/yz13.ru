"use server";
import { getV1AuthCurrent } from "@yz13/api";
import type { GetV1AuthCurrent200 } from "@yz13/api/types";

type UserObject = GetV1AuthCurrent200;

export const auth = async (): Promise<UserObject> => {
  return await getV1AuthCurrent({ withCredentials: true });
};

export const authorized = async (): Promise<boolean> => {
  return !!(await auth());
};
