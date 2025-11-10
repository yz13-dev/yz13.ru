import z from "zod"

export const bucketSchema = z.object({
  id: z.string(),
  name: z.string(),
  owner: z.string(),
  file_size_limit: z.number().optional(),
  allowed_mime_types: z.array(z.string()).optional(),
  created_at: z.string(),
  updated_at: z.string(),
  public: z.boolean(),
})

export const fileObjectSchema = z.object({
  name: z.string(),
  bucket_id: z.string(),
  owner: z.string(),
  id: z.string(),
  updated_at: z.string(),
  created_at: z.string(),
  last_accessed_at: z.string(),
  metadata: z.any(),
  buckets: bucketSchema,
})

export const blobSchema = z.object({
  file: z
    .custom<File>((v) => v instanceof File)
    .openapi({
      type: 'string',
      format: 'binary',
    }),
})

export const newFileObjectSchema = z.object({
  id: z.string(),
  path: z.string(),
  fullPath: z.string(),
})

export const bucketArraySchema = z.array(bucketSchema)

export const fileObjectArraySchema = z.array(fileObjectSchema)

export type FileObjectObject = z.infer<typeof fileObjectSchema>
export type Bucket = z.infer<typeof bucketSchema>
export type BucketArray = z.infer<typeof bucketArraySchema>
export type FileObjectArray = z.infer<typeof fileObjectArraySchema>
