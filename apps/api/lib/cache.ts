import { redis } from "@/extensions/redis";




export const getNewsCache = async () => {
  const matched = await redis.scan("0", {
    match: "news:*"
  })

  const keys = matched[1];

  return keys;
}


export const clearNewsCache = async () => {
  const keys = await getNewsCache();

  for (const key of keys) {
    await redis.del(key);
  }
}
