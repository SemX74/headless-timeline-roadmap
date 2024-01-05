import dayjs from "dayjs";
import { TCommonRoadmapEvent } from "src/components/CampaigningChart/RoadmapEvents";
import { DateKeys } from "src/types/DateKeys.type";
import { isDayInRange } from "./isDayInRange";

export function transformEvents<T extends TCommonRoadmapEvent>(
  input: T[],
  days: dayjs.Dayjs[],
  dateKey: DateKeys<T>
): Record<string, T[]> {
  const startDate = days[0];
  const endDate = days[days.length - 1];
  const campaignEvents: Record<string, T[]> = {};

  input
    .filter((x) => isDayInRange(dayjs(x[dateKey] as Date), startDate, endDate))
    .forEach((event) => {
      const eventDateString = dayjs(event[dateKey] as Date).format(
        "YYYY-MM-DD"
      );

      if (!campaignEvents[eventDateString]) {
        campaignEvents[eventDateString] = [event];
      } else {
        campaignEvents[eventDateString].push(event);
      }
    });

  return campaignEvents;
}
