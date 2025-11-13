

type ClientOptions = {
  appId: string
}

export const createClient = ({ appId }: ClientOptions) => {
  const filename = "flags.json"

  const cdn = (id: string) => {
    // appId ==> id
    // `/${appId}/flags.json`
    const base = "https://cdn.flags.yz13.ru"
    const path = `/${id}/${filename}`
    const url = new URL(path, base).toString()
    // if (process.env.NODE_ENV === "development") console.log("cdn", url);
    return url.toString();
  }

  const get = async (url: string) => {
    try {
      const start = Date.now()
      const response = await fetch(url, {
        // @ts-expect-error
        next: {
          // one hour
          revalidate: 60 * 60 * 1000,
          tags: ["flags"]
        }
      });

      const end = Date.now()
      if (process.env.NODE_ENV === "development") console.log("get", url, end - start);
      return await response.json()
    } catch (error) {
      console.error(error)
      return {
        items: {}
      }
    }
  }

  return {
    async get<T>(key: string): Promise<T> {
      const json = await get(cdn(appId))
      return json["items"][key];
    },
    async getAll<T>(): Promise<T> {
      const json = await get(cdn(appId))
      return json["items"];
    }
  }
}
