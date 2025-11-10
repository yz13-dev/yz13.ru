import { Context } from "hono";
import { getPlaiceholder } from "plaiceholder";
import sharp from "sharp";
import { getSupabase } from "../../../../../middlewares/supabase.middleware";
import { cdn } from "../../../../../utils/cdn";
import { UpdatePin } from "../../models/pins.model";

export const getPins = async (c: Context) => {
  const boardId = c.req.query("boardId");
  const userId = c.req.query("userId");

  if (!boardId && !userId) return c.json([], 400);

  try {
    const supabase = getSupabase(c);

    if (boardId) {
      const { data, error } = await supabase
        .from("pins")
        .select(
          `
          *,
          owner: profiles(*)
        `,
        )
        .eq("board_id", boardId);

      if (error) {
        console.log(error);
        return c.json([], 500);
      }

      return c.json(data, 200);
    }

    if (userId) {
      const { data, error } = await supabase
        .from("pins")
        .select(
          `
          *,
          owner: profiles(*)
        `,
        )
        .eq("owner", userId);

      if (error) {
        console.log(error);
        return c.json([], 500);
      }

      return c.json(data, 200);
    }

    return c.json([], 400);
  } catch (error) {
    console.log(error);
    return c.json([], 502);
  }
};

export const getPin = async (c: Context) => {
  const pinId = c.req.param("pinId");
  try {
    const supabase = getSupabase(c);

    const { data, error } = await supabase
      .from("pins")
      .select(
        `
        *,
        owner: profiles(*)
      `,
      )
      .eq("id", pinId)
      .limit(1)
      .maybeSingle();

    if (error) {
      console.log(error);
      return c.json(null, 500);
    }

    if (data) {
      return c.json(
        {
          ...data,
          attachment: data.attachment
            ? cdn(`/pins/${data.attachment}`)
            : data.attachment,
          thumbnail: data.thumbnail
            ? cdn(`/pins/${data.thumbnail}`)
            : data.thumbnail,
        },
        200,
      );
    }

    return c.json(data, 200);
  } catch (error) {
    console.log(error);
    return c.json(null, 502);
  }
};

const getPinById = async (c: Context) => {
  const pinId = c.req.param("pinId");
  try {
    const supabase = getSupabase(c);

    const { data, error } = await supabase
      .from("pins")
      .select(
        `
        *,
        owner: profiles(*)
      `,
      )
      .eq("id", pinId)
      .limit(1)
      .maybeSingle();

    if (error) {
      console.log(error);
      return null;
    }

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getSimilarPins = async (c: Context) => {
  const pinId = c.req.param("pinId");
  try {
    const key = `pins:${pinId}:similar`;

    // const redis = getRedis(c);

    // const cache = await getCache<Pin[]>(key);

    // if (cache) return c.json(cache, 200);

    const supabase = getSupabase(c);

    const pin = await getPinById(c);

    if (!pin) return c.json([], 400);

    const tags = pin.tags ?? [];

    if (!tags.length) return c.json([], 400);

    const { data, error } = await supabase
      .from("pins")
      .select(
        `
        *,
        owner: profiles(*)
      `,
      )
      .overlaps("tags", tags)
      .not("id", "eq", pinId);

    if (error) {
      console.log(error);
      return c.json([], 500);
    }

    const withCDN = data.map((pin) => ({
      ...pin,
      attachment: pin.attachment
        ? cdn(`/pins/${pin.attachment}`)
        : pin.attachment,
      thumbnail: pin.thumbnail ? cdn(`/pins/${pin.thumbnail}`) : pin.thumbnail,
    }));

    // if (withCDN.length) {
    //   await setCache(key, withCDN, expire.hour);
    // }

    return c.json(withCDN, 200);
  } catch (error) {
    console.log(error);
    return c.json([], 502);
  }
};

export const uploadPin = async (c: Context) => {
  const body = await c.req.formData();
  const pinId = c.req.param("pinId");

  // as MIME type, like image/png or video/mp4;
  const type = c.req.query("type");

  const file = body.get("file") as Blob;

  try {
    if (!type) return c.json(null, 400);

    const extension = type.split("/")[1];

    const path = (type: string) => `/public/${pinId}/${type}.${extension}`;

    const supabase = getSupabase(c);

    const storage = supabase.storage;

    const { data, error } = await storage
      .from("pins")
      .upload(path("original"), file);

    if (error) {
      console.log(error);
      return c.json(null, 500);
    }

    const attachment = data.path;

    const isVideo = type.includes("video");

    if (isVideo) {
      await updatePinPath(c, { attachment });

      return c.json(data, 200);
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const {
      metadata: { height, width },
    } = await getPlaiceholder(buffer, { size: 10 });

    const minimized = await sharp(buffer)
      .metadata()
      .then(({ width }) =>
        sharp(buffer)
          .resize(Math.round(width * 0.25))
          .toBuffer(),
      );

    const { data: thumbnail } = await storage
      .from("pins")
      .upload(path("thumbnail"), minimized, { contentType: type });
    await updatePinPath(c, {
      attachment,
      width,
      height,
      thumbnail: thumbnail?.path ?? null,
    });

    return c.json(data, 200);
  } catch (error) {
    console.log(error);
    return c.json(null, 502);
  }
};

export const createPin = async (c: Context) => {
  const body = await c.req.json();
  try {
    const supabase = getSupabase(c);

    const { data, error } = await supabase
      .from("pins")
      .insert(body)
      .select(
        `
        *,
        owner: profiles(*)
      `,
      )
      .maybeSingle();

    if (error) {
      console.log(error);
      return c.json(null, 500);
    }

    // const redis = getRedis(c);
    // const key = "pins:recommendations";

    // if (data) await redis.del(key);

    return c.json(data, 200);
  } catch (error) {
    console.log(error);
    return c.json(null, 502);
  }
};

export const updatePinPath = async (c: Context, body: Partial<UpdatePin>) => {
  const pinId = c.req.param("pinId");
  try {
    const supabase = getSupabase(c);

    const { data, error } = await supabase
      .from("pins")
      .update({
        updated_at: new Date().toISOString(),
        ...body,
      })
      .eq("id", pinId)
      .select(
        `
        *,
        owner: profiles(*)
      `,
      )
      .maybeSingle();

    if (error) {
      console.log(error);
      return null;
    }

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updatePin = async (c: Context) => {
  const body = await c.req.json();
  try {
    const supabase = getSupabase(c);

    const { data, error } = await supabase
      .from("pins")
      .update({
        ...body,
        updated_at: new Date().toISOString(),
      })
      .select(
        `
        *,
        owner: profiles(*)
      `,
      )
      .maybeSingle();

    if (error) {
      console.log(error);
      return c.json(null, 500);
    }

    return c.json(data, 200);
  } catch (error) {
    console.log(error);
    return c.json(null, 502);
  }
};

export const deletePin = async (c: Context) => {
  const pinId = c.req.param("pinId");
  try {
    const supabase = getSupabase(c);

    const { data, error } = await supabase
      .from("pins")
      .delete()
      .eq("id", pinId)
      .select(
        `
        *,
        owner: profiles(*)
      `,
      )
      .maybeSingle();

    if (error) {
      console.log(error);
      return c.json(null, 500);
    }

    return c.json(data, 200);
  } catch (error) {
    console.log(error);
    return c.json(null, 502);
  }
};

export const getPinsRecommendations = async (c: Context) => {
  try {
    // const redis = getRedis(c);
    const key = "pins:recommendations";

    // const cache = await getCache<Pin[]>(key);

    // if (cache) {
    // return c.json(cache, 200);
    // }

    const supabase = getSupabase(c);

    const { data, error } = await supabase.from("pins").select(`
        *,
        owner: profiles(*)
      `);

    // https://emsrhdthyrigsgogumbr.supabase.co/storage/v1/object/public/pins/public/3006c440-ebe3-4786-aa8b-51efe9a36f19

    if (error) {
      console.log(error);
      return c.json([], 500);
    }

    const withCDN = data.map((pin) => ({
      ...pin,
      attachment: pin.attachment
        ? cdn(`/pins/${pin.attachment}`)
        : pin.attachment,
      thumbnail: pin.thumbnail ? cdn(`/pins/${pin.thumbnail}`) : pin.thumbnail,
    }));

    // if (withCDN.length) {
    // await setCache(key, withCDN, expire.hour);
    // }

    return c.json(withCDN, 200);
  } catch (error) {
    console.log(error);
    return c.json([], 502);
  }
};

export const getSearchPins = async (c: Context) => {
  const q = c.req.query("q");
  if (!q) return c.json([], 400);
  try {
    const supabase = getSupabase(c);

    const { data, error } = await supabase
      .from("pins")
      .select(
        `
        *,
        owner: profiles(*)
      `,
      )
      .or(`name.ilike.%${q}%, description.ilike.%${q}%, tags.ov.{${q}}`)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return c.json([], 500);
    }

    const pins = data ?? [];

    const withCDN = pins.map((pin) => ({
      ...pin,
      attachment: pin.attachment
        ? cdn(`/pins/${pin.attachment}`)
        : pin.attachment,
      thumbnail: pin.thumbnail ? cdn(`/pins/${pin.thumbnail}`) : pin.thumbnail,
    }));

    return c.json(withCDN, 200);
  } catch (error) {
    console.log(error);
    return c.json([], 502);
  }
};
