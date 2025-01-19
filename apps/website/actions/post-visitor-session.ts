"use server";
import { API_URL } from "@/const/api";

export type VisitorSessionBody = {
  visitor_id: string;
  duration: number;
  user_agent: string | null;
  user_id: string | null;
};

const postVisitorSession = async ({
  duration,
  user_agent,
  user_id,
  visitor_id,
}: VisitorSessionBody) => {
  console.log("Posting visitor session: ", visitor_id, duration);
  try {
    const path = `/visitor-session`;
    const url = new URL(path, API_URL);
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const res = await fetch(url.toString(), {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        visitor_id,
        duration,
        user_id,
        user_agent,
      }),
    });
    if (res.status !== 200) throw new Error("Failed to post visitor session");
    return await res.json();
  } catch (error) {
    console.error(error);
    return { status: "error" };
  }
};

export default postVisitorSession;
