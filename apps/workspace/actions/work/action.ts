"use server"

import { works } from "@/mock/works"
import { client } from "../client"
import schema from "./schema"

export default client
  .schema(schema)
  .action(async ({ parsedInput: { id } }) => {
    const result = works.find(item => item.id === id)
    return result
  })
