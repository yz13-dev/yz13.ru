


export const stackCdnWrapper = async (id: string) => {
  // console.log("icon", id)
  try {

    const cdn = `https://cdn.simpleicons.org/${id}/000000/ffffff`

    const response = await fetch(cdn);

    console.log("response", response);

    if (!response.ok) return `/stack/${id}.svg`;

    return cdn;

  } catch (error) {
    console.error(error);
    return `/stack/${id}.svg`;
  }
}
