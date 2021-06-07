export const getPagesArray = (lastPageNumber: number, length?: number): readonly string[] => {
  const fullArray = Array.from({ length: lastPageNumber }, (_val, index) =>
    (index + 1).toString(),
  ).reverse();
  if (length) {
    return fullArray.slice(0, length);
  }
  return fullArray;
};
