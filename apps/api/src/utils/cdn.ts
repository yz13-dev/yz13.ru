



export const cdn = (path: string) => `${process.env.SUPABASE_URL}/storage/v1/object/public${path}`
