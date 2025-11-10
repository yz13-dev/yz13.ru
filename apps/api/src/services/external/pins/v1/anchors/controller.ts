import { Context } from "hono";
import { getSupabase } from "../../../../../middlewares/supabase.middleware";
import { cdn } from "../../../../../utils/cdn";

export const getJoinedBoardPins = async (c: Context) => {
  const boardId = c.req.param("boardId")
  try {

    const supabase = getSupabase(c);

    const { data, error } = await supabase
      .from("pins_boards_anchors")
      .select(`
        pin: pins(*, owner: profiles(*)),
        board: pins_boards(*),
        owner: profiles(*)
      `)
      .eq("board_id", boardId)

    if (error) {
      console.log(error)
      return [];
    }

    return data;

  } catch (error) {
    console.log(error)
    return [];
  }
}

export const getJoinedPins = async (c: Context) => {
  const boardId = c.req.param("boardId")
  try {

    const supabase = getSupabase(c);

    const { data, error } = await supabase
      .from("pins_boards_anchors")
      .select(`
        pins(*, owner: profiles(*))
      `)
      .eq("board_id", boardId)

    if (error) {
      console.log(error)
      return [];
    }

    const pins = data
      .map((pin) => pin.pins)
      .map(pin => ({
        ...pin,
        attachment: pin.attachment ? cdn(`/pins/${pin.attachment}`) : pin.attachment,
        thumbnail: pin.thumbnail ? cdn(`/pins/${pin.thumbnail}`) : pin.thumbnail,
      }))

    return pins;

  } catch (error) {
    console.log(error)
    return [];
  }
}

export const createAnchor = async (c: Context) => {
  const boardId = c.req.param("boardId")
  const pinId = c.req.param("pinId")

  try {
    const supabase = getSupabase(c);

    const isExist = await checkAnchor(c, boardId, pinId)

    if (isExist) {
      return c.json(null, 409);
    }

    const { data, error } = await supabase
      .from("pins_boards_anchors")
      .insert({
        board_id: boardId,
        pin_id: pinId,
      })
      .select(`
        pin: pins(*, owner: profiles(*)),
        board: pins_boards(*),
        owner: profiles(*)
      `)
      .maybeSingle()

    if (error) {
      console.log(error)
      return c.json(null, 502);
    }

    return c.json(data, 200);

  } catch (error) {
    console.log(error)
    return c.json(null, 502);
  }
}

export const getAnchor = async (c: Context) => {
  const pinId = c.req.param("pinId")
  try {

    const supabase = getSupabase(c);

    const { data, error } = await supabase
      .from("pins_boards_anchors")
      .select("*")
      .eq("pin_id", pinId)
      .limit(1)
      .maybeSingle()

    if (error) {
      console.log(error)
      return c.json(null, 502)
    }

    return c.json(data, 200);

  } catch (error) {
    console.log(error)
    return c.json(null, 502)
  }
}


export const checkAnchor = async (c: Context, boardId: string, pinId: string) => {

  try {

    const supabase = getSupabase(c);

    const { data, error } = await supabase
      .from("pins_boards_anchors")
      .select("*")
      .eq("board_id", boardId)
      .eq("pin_id", pinId)
      .limit(1)
      .maybeSingle()

    if (error) {
      console.log(error)
      return false;
    }

    return !!data;
  } catch (error) {
    return false;
  }
}


export const deleteAnchor = async (c: Context) => {
  const boardId = c.req.param("boardId")
  const pinId = c.req.param("pinId")
  try {

    const supabase = getSupabase(c);

    const { data, error } = await supabase
      .from("pins_boards_anchors")
      .delete()
      .eq("board_id", boardId)
      .eq("pin_id", pinId)
      .select()
      .maybeSingle()

    if (error) {
      console.log(error)
      return c.json(null, 502);
    }

    return c.json(data, 200);

  } catch (error) {
    console.log(error)
    return c.json(null, 502);
  }
}
