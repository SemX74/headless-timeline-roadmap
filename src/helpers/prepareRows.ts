export const prepareRows = (
  occupiedRows: string[][],
  startIndex: number,
  endIndex: number,
  days: unknown[],
  id: string
) => {
  for (let row = 0; row < occupiedRows.length; row++) {
    let isAvailable = true;
    for (let i = startIndex; i <= endIndex; i++) {
      if (occupiedRows[row][i]) {
        isAvailable = false;
        break;
      }
    }
    if (isAvailable) {
      for (let i = startIndex; i <= endIndex; i++) {
        occupiedRows[row][i] = id;
      }
      return row;
    }
  }
  const newRow = new Array(days.length).fill("");
  for (let i = startIndex; i <= endIndex; i++) {
    newRow[i] = id;
  }
  occupiedRows.push(newRow);
  return occupiedRows.length - 1;
};
