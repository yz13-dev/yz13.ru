import { Json } from "../schemas/link.schema"





export function makeJson(username: string): Json {
  return {
    items: [],
    user: {
      avatar_url: "",
      username
    }
  }
}
