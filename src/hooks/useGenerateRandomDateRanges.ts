import dayjs from "dayjs";
import { useMemo } from "react";
import { TCommonCampaignEvent } from "./useOccupiedRows";

export const useGenerateRandomDateRanges = (
  numberOfRanges: number,
  maxEventLength = 20,
  maxRangeFromToday = -10
): TCommonCampaignEvent[] => {
  const res = useMemo(() => {
    const ranges = [];
    for (let i = 0; i < numberOfRanges; i++) {
      const startOffset = Math.floor(Math.random() * (maxRangeFromToday + 1));
      const fromDate = dayjs().add(startOffset, "day");
      const eventLength = Math.floor(Math.random() * (maxEventLength + 1));
      const toDate = fromDate.add(eventLength, "day");

      ranges.push({
        starts_at: fromDate.toDate(),
        ends_at: toDate.toDate(),
        id: Math.random().toString(),
      });
    }
    return ranges;
  }, [numberOfRanges, maxEventLength, maxRangeFromToday]);

  return res;
};
