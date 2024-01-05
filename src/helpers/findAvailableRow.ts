import dayjs from "dayjs";
import { getEventDateIndexes } from "./getEventDateIndexes";

export const findAvailableRow = ({
  id,
  occupiedRows,
  days,
  endsAt,
  startsAt,
}: {
  days: dayjs.Dayjs[];
  occupiedRows: string[][];
  endsAt: Date;
  startsAt: Date;
  id: string;
}) => {
  if (!endsAt || !startsAt) return null;

  const props = getEventDateIndexes({
    days,
    endsAt,
    startsAt,
  });

  if (!props) return null;

  const { endIndex, startIndex, percentages } = props;

  for (let row = 0; row < occupiedRows.length; row++) {
    let isAvailable = true;
    for (let i = startIndex; i <= endIndex; i++) {
      if (occupiedRows[row][i] !== id) {
        isAvailable = false;
        break;
      }
    }
    if (isAvailable) {
      return { percentages, rowIndex: row };
    }
  }

  return { percentages, rowIndex: occupiedRows.length - 1 };
};
