import { z } from "zod";

export const schema = z.object({
  userId: z.string(),
  workspaceId: z.optional(z.string()),
});
