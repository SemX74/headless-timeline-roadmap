import dayjs from "dayjs";

export const isRangeInDaysRange = (
  rangeStart: dayjs.Dayjs,
  rangeEnd: dayjs.Dayjs,
  days: dayjs.Dayjs[]
) => {
  const withinStart = days[0];
  const withinEnd = days[days.length - 1];
  if (!withinStart || !withinEnd) return false;

  return (
    rangeStart.unix() >= withinStart.unix() ||
    rangeEnd.unix() <= withinEnd.unix()
  );
};
