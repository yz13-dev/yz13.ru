"use server";
import client from "@/actions/client";
import { API_URL } from "@/const/api";
import { schema } from "./schema";

export type Workspace = {
  id: string;
  user: string;
  name: string | null;
  created_at: string;
  updated_at: string;
};

export const action = client
  .schema(schema)
  .action(async ({ parsedInput: { userId, workspaceId } }) => {
    if (workspaceId) {
      try {
        const url = new URL(
          `/user/${userId}/workspace/${workspaceId}`,
          API_URL
        );
        const res = await fetch(url.toString());
        const data = await res.json();
        return data;
      } catch (e) {
        console.log(e);
        return null;
      }
    } else {
      try {
        const url = new URL(`/user/${userId}/workspace`, API_URL);
        const res = await fetch(url.toString());
        const data = await res.json();
        return data[0];
      } catch (e) {
        console.log(e);
        return null;
      }
    }
  });
