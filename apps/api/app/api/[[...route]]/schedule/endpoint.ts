import { expire, redis } from "@/extensions/redis";
import { format, isValid, parse } from "date-fns";
import { Hono, type HonoRequest } from "hono";
import { cookies } from "next/headers";
import type { DaySchedule, Event } from "rest-api/types/calendar";
import { createClient } from "yz13/supabase/server";
import { getLastEventsForDate } from "../calendar/actions";
import { getUser } from "../user";
import { createObjFromDurations, getTimeAndDurationFromAppointments } from "./actions";

export const schedule = new Hono();

const getSchedule = async (uid: string) => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("calendar_schedule")
    .select()
    .eq("uid", uid)
    .maybeSingle();
  if (error) {
    console.log(error);
    return null;
  } return data;
};

schedule.get("/:uid", async (c) => {
  const uid = c.req.param("uid");
  const key = `schedule:${uid}`;
  try {
    const cached = await redis.get<Event[]>(key);
    if (cached) return c.json(cached);
    const schedule = await getSchedule(uid);
    if (schedule) await redis.set(key, schedule, { ex: expire.day });
    return c.json(schedule);
  } catch (error) {
    console.log(error);
    return c.json([]);
  }
});

const getBody = async (c: HonoRequest) => {
  try {
    const body = await c.json();
    return body;
  } catch (error) {
    console.log(error);
    return null;
  }
};

schedule.post("/:uid", async (c) => {
  const uid = c.req.param("uid");
  const user = await getUser(uid);
  if (!user) return c.json(null);
  const body = await getBody(c.req);
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    if (!body) {
      const { data, error } = await supabase
        .from("calendar_schedule")
        .insert({
          uid,
        })
        .select()
        .maybeSingle();
      if (error) {
        console.log(error);
        return c.json(null);
      }
      return c.json(data);
    }
    const { data, error } = await supabase
      .from("calendar_schedule")
      .insert(body)
      .select()
      .maybeSingle();
    if (error) {
      console.log(error);
      return c.json(null);
    }
    return c.json(data);
  } catch (error) {
    console.log(error);
    return c.json(null);
  }
});

schedule.patch("/:uid", async (c) => {
  const uid = c.req.param("uid");
  const user = await getUser(uid);
  if (!user) return c.json(null);
  const body = await getBody(c.req);
  const key = `schedule:${uid}`;
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("calendar_schedule")
      .update(body)
      .eq("uid", uid)
      .select()
      .maybeSingle();
    if (error) {
      console.log(error);
      return c.json(null);
    }
    if (data) await redis.set(key, data, { ex: expire.day });
    return c.json(data);
  } catch (error) {
    console.log(error);
    return c.json(null);
  }
});


schedule.get("/:uid/available", async (c) => {
  const uid = c.req.param("uid");
  const date = c.req.query("date");
  const defaultDate = format(new Date(), "yyyy-MM-dd");
  const parsedDate = parse(date ?? defaultDate, "yyyy-MM-dd", new Date());
  try {
    if (!isValid(parsedDate)) throw new Error("Provided date is invalid");
    const allAppointments = await getLastEventsForDate(uid, {
      date: format(parsedDate, "yyyy-MM-dd"),
      type: "appointment",
    });
    const appointments: Event[] = allAppointments.filter((appointment) => {

      return ["CONFIRMED", "TENTATIVE"].includes(appointment.status ?? "TENTATIVE")
    });
    const weekday = format(parsedDate, "eeeeeeee").toLowerCase();
    const schedule = await getSchedule(uid);
    if (!schedule) return c.json(null);
    const weekdaySchedule = (schedule[weekday as keyof typeof schedule] as DaySchedule[]);
    const busyTimes = getTimeAndDurationFromAppointments(appointments ?? []);
    const durations = schedule.durations;
    const obj = createObjFromDurations(
      durations ?? [],
      weekdaySchedule,
      busyTimes,
    );

    // console.log("SCHEDULE", weekdaySchedule)
    // console.log("BUSY TIMES", busyTimes)
    // console.log("AVAILABLE", obj)

    // console.log("AVAILABILITY",
    //   {
    //     availability: obj,
    //     date: format(parsedDate, "yyyy-MM-dd"),
    //     appointments,
    //   }
    // )

    return c.json({
      availability: obj,
      date: format(parsedDate, "yyyy-MM-dd"),
      appointments,
    });
  } catch (error) {
    console.log(error);
    return c.json({
      availability: {},
      date: format(parsedDate, "yyyy-MM-dd"),
      appointments: [],
    });
  }
});
