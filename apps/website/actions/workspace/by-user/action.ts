import { API_URL } from "@/const/api";

export const getUserWorkspaces = async (uid: string) => {
  try {
    const path = `/user/${uid}/workspaces`;
    const url = new URL(path, API_URL);
    const res = await fetch(url.toString());
    if (res.status === 200) return await res.json();
    else return [];
  } catch (e) {
    console.log(e);
    return [];
  }
};
