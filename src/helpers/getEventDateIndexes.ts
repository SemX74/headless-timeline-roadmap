import dayjs from "dayjs";
import { computePercentages } from "./computePercentages";

export const getEventDateIndexes = ({
  startsAt,
  endsAt,
  days,
}: {
  startsAt: Date;
  endsAt: Date;
  days: dayjs.Dayjs[];
}) => {
  const startIndex = days.findIndex((day) => day.isSame(startsAt, "day"));
  const endIndex = days.findIndex((day) => day.isSame(endsAt, "day"));

  const startsBeforeRange =
    startIndex === -1 && dayjs(startsAt).isBefore(days[0]);
  const endsAfterRange =
    endIndex === -1 && dayjs(endsAt).isAfter(days[days.length - 1]);

  const isCompletelyAfterRange = dayjs(startsAt).isAfter(days[days.length - 1]);

  if (isCompletelyAfterRange) {
    return null;
  } else if (startsBeforeRange && endsAfterRange) {
    return {
      startIndex: 0,
      endIndex: days.length - 1,
      percentages: computePercentages(0, days.length - 1, days.length),
    };
  } else if (startsBeforeRange) {
    return {
      startIndex: 0,
      endIndex: Math.min(endIndex, days.length - 1),
      percentages: computePercentages(0, endIndex, days.length),
    };
  } else if (endsAfterRange) {
    return {
      startIndex: Math.max(startIndex, 0),
      endIndex: days.length - 1,
      percentages: computePercentages(startIndex, days.length - 1, days.length),
    };
  } else if (startIndex === -1 || endIndex === -1) {
    return null;
  }

  return {
    startIndex,
    endIndex,
    percentages: computePercentages(startIndex, endIndex, days.length),
  };
};
