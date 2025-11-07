


export const cdn = (path: string) => `https://cdn.links.yz13.ru/register/${path}`

export const avatar = (id: string, path: string) => {

  const avatar_path = path.startsWith("/") ? path : `/${path}`;

  return `https://cdn.links.yz13.ru/register/${id}${avatar_path}`
}
