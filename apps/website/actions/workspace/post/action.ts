"use server";
import client from "@/actions/client";
import { API_URL } from "@/const/api";
import { schema } from "./schema";

export const action = client
  .schema(schema)
  .action(async ({ parsedInput: { userId } }) => {
    try {
      const url = new URL(`/user/${userId}/workspace`, API_URL);
      const res = await fetch(url.toString(), { method: "POST" });
      const data = await res.json();
      return data;
    } catch (e) {
      console.log(e);
      return null;
    }
  });
