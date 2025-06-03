export const environment = process.env.NODE_ENV ?? "preview"


export const isDev = environment === "development"
export const isProd = environment === "production"
export const isPreview = environment === "preview"
