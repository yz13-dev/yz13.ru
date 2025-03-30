"use server";
import { customFetch } from "@/const/fetch";
import { VisitorSessionBody } from "@/types/session";

export const sendVisitorSession = async ({
  duration,
  user_agent,
  user_id,
  visitor_id,
}: VisitorSessionBody) => {
  return await customFetch<VisitorSessionBody | null>("/visitor-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      visitor_id,
      duration,
      user_id,
      user_agent,
    }),
  });
};
