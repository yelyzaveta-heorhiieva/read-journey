export const updateParams = (
  newParams: Record<string, string | number | undefined>, searchParams: URLSearchParams
) => {
  const currentParams = Object.fromEntries(searchParams.entries());

  const merged = {
    ...currentParams,
    ...newParams,
  };

  const filteredEntries = Object.entries(merged).filter(
    ([, v]) => v !== undefined && v !== '',
  ) as [string, string][];
  return filteredEntries;
};
