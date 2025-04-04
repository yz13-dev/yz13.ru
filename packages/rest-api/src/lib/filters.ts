export type Filter = {
  key: string;
  value: string | number;
};

export const makeFilterString = (filters: Filter[]) => {
  const filterString = filters.map((filter) => {
    return `${filter.key}=${filter.value}`;
  });
  return filterString.join("&");
};
