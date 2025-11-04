
export const blog = (id: string) => {
  const postId = id;
  const cdn = "https://emsrhdthyrigsgogumbr.supabase.co/storage/v1/object/public/blog/published/"
  return `${cdn}${postId}`
}
