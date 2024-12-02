import client from "@/actions/client";
import { API_URL } from "@/const/api";
import { schema } from "./schema";

export const action = client
  .schema(schema)
  .action(async ({ parsedInput: { id } }) => {
    try {
      const url = new URL(`/workspace/${id}`, API_URL);
      const res = await fetch(url.toString());
      const data = await res.json();
      return data;
    } catch (e) {
      console.log(e);
      return null;
    }
  });
