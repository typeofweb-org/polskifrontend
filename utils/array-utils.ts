export const getPagesArray = (lastPageNumber: number, length?: number): readonly string[] => {
  const fullArray = Array.from({ length: lastPageNumber }, (_val, index) =>
    (index + 1).toString(),
  ).reverse();
  if (length) {
    return fullArray.slice(0, length);
  }
  return fullArray;
};

export const includes = <T>(arr: readonly T[], item: unknown): item is T =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/consistent-type-assertions -- this assertion is required but also completely typesafe
  arr.includes(item as any);
