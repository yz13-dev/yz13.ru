import { Context } from "hono";
import { getSupabase } from "../../../../../middlewares/supabase.middleware";
import { getJoinedBoardPins, getJoinedPins } from "../anchors/controller";


export const getBoards = async (c: Context) => {

  const userId = c.req.query("userId")

  try {
    if (!userId) return c.json([], 400)

    const supabase = getSupabase(c);

    const { data, error } = await supabase
      .from('pins_boards')
      .select('*')
      .or(`authors.cs.{${userId}},owner.eq.${userId}`)

    if (error) {
      console.log(error)
      return c.json([], 500)
    }

    return c.json(data, 200)

  } catch (error) {
    console.log(error);
    return c.json([], 502)
  }
}

export const getBoard = async (c: Context) => {
  const boardId = c.req.param("boardId")
  try {

    const supabase = getSupabase(c);

    const { data, error } = await supabase
      .from('pins_boards')
      .select('*')
      .eq('id', boardId)
      .limit(1)
      .maybeSingle()

    if (error) {
      console.log(error)
      return c.json(null, 500)
    }

    return c.json(data, 200)

  } catch (error) {
    console.log(error);
    return c.json(null, 502)
  }
}

export const getBoardPins = async (c: Context) => {
  try {

    const pins = await getJoinedPins(c);

    return c.json(pins, 200)

  } catch (error) {
    console.log(error);
    return c.json([], 502)
  }
}

export const getBoardAnchors = async (c: Context) => {
  try {

    const pins = await getJoinedBoardPins(c);

    return c.json(pins, 200)

  } catch (error) {
    console.log(error);
    return c.json([], 502)
  }
}

export const createBoard = async (c: Context) => {
  const body = await c.req.json()
  try {

    const supabase = getSupabase(c);

    const { data, error } = await supabase
      .from('pins_boards')
      .insert(body)
      .select('*')
      .maybeSingle()

    if (error) {
      console.log(error)
      return c.json(null, 500)
    }

    return c.json(data, 200)

  } catch (error) {
    console.log(error);
    return c.json(null, 502)
  }
}

export const updateBoard = async (c: Context) => {
  const body = await c.req.json()
  const boardId = c.req.param("boardId")
  try {

    const supabase = getSupabase(c);

    const { data, error } = await supabase
      .from('pins_boards')
      .update(body)
      .eq('id', boardId)
      .select('*')
      .maybeSingle()

    if (error) {
      console.log(error)
      return c.json(null, 500)
    }

    return c.json(data, 200)

  } catch (error) {
    console.log(error);
    return c.json(null, 502)
  }
}


export const deleteBoard = async (c: Context) => {
  const boardId = c.req.param("boardId")
  try {

    const supabase = getSupabase(c);

    const { data, error } = await supabase
      .from('pins_boards')
      .delete()
      .eq('id', boardId)
      .select('*')
      .maybeSingle()

    if (error) {
      console.log(error)
      return c.json(null, 500)
    }

    return c.json(data, 200)

  } catch (error) {
    console.log(error);
    return c.json(null, 502)
  }
}
