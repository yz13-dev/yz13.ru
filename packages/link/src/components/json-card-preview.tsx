"use client";
import { useJsonStore } from "../stores/json.store";
import Card from "./card";



export default function ({ username }: { username: string }) {
  const json = useJsonStore(state => state.json)
  return <Card data={json} id={username} />
}
