export const computePercentages = (
  startIndex: number,
  endIndex: number,
  totalDays: number
) => {
  const position = (startIndex / totalDays) * 100;
  const width = ((endIndex - startIndex + 1) / totalDays) * 100;
  return { position, width };
};
