import { type Json, jsonSchema } from "../schemas/link.schema";
import { randomSlice } from "./random-slice";


type LinkResponse = {
  data: Json | null;
  exists: boolean
  error: boolean
  message: string
}

export const getLink = async (id: string): Promise<LinkResponse> => {
  try {
    const response = await fetch(`https://cdn.links.yz13.ru/register/${id}/data.json`)

    if (!response.ok) throw new Error("Not exist")

    const json = await response.json();

    const result = jsonSchema.safeParse(json)

    if (result.success) return {
      exists: true,
      data: json as Json,
      error: false,
      message: "ok"
    }

    return {
      exists: false,
      data: null,
      error: true,
      message: result.error.message
    }

  } catch (error) {
    console.log(error)
    return {
      exists: false,
      data: null,
      error: true,
      message: "error"
    }
  }
}

export const checkLink = async (id: string): Promise<boolean> => {

  const response = await fetch("https://api.github.com/repos/yz13-dev/links/contents/register");

  const json: any[] = await response.json();

  const list = json.map(item => ({ id: item.name }));

  return list.some(item => item.id === id);
}

export const getLinksList = async () => {
  try {

    const response = await fetch("https://api.github.com/repos/yz13-dev/links/contents/register");

    const json: any[] = await response.json();

    const list = json.map(item => ({ id: item.name }));

    const result = await Promise.all(list.map(item => getLink(item.id)));

    if (result.length < 5) return result;

    const range = randomSlice(result.length - 1)

    return result.slice(...range)

  } catch (error) {
    console.log(error)
    return []
  }
}
