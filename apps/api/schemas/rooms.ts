import { z } from "zod";

export const roomsSchema = z.object({
  id: z.string().uuid(),
  name: z.string().nullable(),
  owner: z.string(),
  max_members: z.number().nullable(),
  public: z.boolean().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
});

export const roomsInsertSchema = roomsSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
}).partial({
  name: true,
  owner: true,
  max_members: true,
  public: true,
});

export const roomsUpdateSchema = roomsSchema.partial().omit({
  id: true,
  created_at: true,
});

export const roomsArraySchema = z.array(roomsSchema);

export type Room = z.infer<typeof roomsSchema>;
export type RoomInsert = z.infer<typeof roomsInsertSchema>;
export type RoomUpdate = z.infer<typeof roomsUpdateSchema>; 