
export const draft = (id: string) => {
  const postId = id;
  const cdn = "https://emsrhdthyrigsgogumbr.supabase.co/storage/v1/object/public/blog/drafts/"
  return `${cdn}${postId}`
}
