import dayjs from "dayjs";
import { isDayInRange } from "./isDayInRange";

export function canExtend(
  start: string,
  dates: string[],
  range: number
): boolean {
  const startDate = dayjs(start);
  const endDate = dayjs(start).add(range, "days");
  const end = endDate.format("YYYY-MM-DD");

  return !dates
    .filter((x) => ![start, end].includes(x))
    .some((x) => isDayInRange(dayjs(x, "YYYY-MM-DD"), startDate, endDate));
}
