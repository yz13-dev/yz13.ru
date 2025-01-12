"use server";
import { API_URL } from "@/const/api";

const postVisitorSession = async (visitorId: string, duration: number) => {
  console.log("Posting visitor session: ", visitorId, duration);
  try {
    const path = `/visitor-session`;
    const url = new URL(path, API_URL);
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const res = await fetch(url.toString(), {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        visitor_id: visitorId,
        duration,
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
