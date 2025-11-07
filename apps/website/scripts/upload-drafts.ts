// import { postBlogV1Drafts } from "@yz13/api";
import { readdir, readFile } from "fs/promises";

const uploadDraft = async (filename: string) => {
  try {

    const buffer = await readFile(`./drafts/${filename}`);
    const blob = new Blob([buffer]);
    const name = filename.replace(".md", "");

    // await postBlogV1Drafts({
    //   file: blob,
    // }, {
    //   name
    // },
    //   { params: { "token": import.meta.env.API_TOKEN, name } }
    // )

  } catch (error) {
    // console.error(error?.response?.data);
  }
}

const uploadDrafts = async () => {
  try {
    const drafts = await readdir("./drafts")

    if (drafts.length === 0) {
      console.log("No drafts found");
      return;
    }

    for (const draft of drafts) {
      await uploadDraft(draft);
    }

  } catch (error) {
    console.error(error);
  }
}

uploadDrafts();
