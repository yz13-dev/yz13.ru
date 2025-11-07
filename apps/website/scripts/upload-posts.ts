import { postBlogV1Posts } from "@yz13/api";
import { readdir, readFile } from "fs/promises";

const uploadPost = async (filename: string) => {
  try {

    const buffer = await readFile(`./posts/${filename}`);
    const blob = new Blob([buffer]);
    const name = filename.replace(".md", "");

    await postBlogV1Posts({
      file: blob,
    }, {
      name
    },
      { params: { "token": import.meta.env.API_TOKEN, name } }
    )

  } catch (error) {
    console.error(error?.response?.data);
  }
}

const uploadPosts = async () => {
  try {
    const posts = await readdir("./posts")

    if (posts.length === 0) {
      console.log("No posts found");
      return;
    }

    for (const post of posts) {
      await uploadPost(post);
    }

  } catch (error) {
    console.error(error);
  }
}

uploadPosts();
