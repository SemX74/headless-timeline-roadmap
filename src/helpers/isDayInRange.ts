import dayjs from "dayjs";

export const isDayInRange = (
  day: dayjs.Dayjs,
  start: dayjs.Dayjs | null,
  end: dayjs.Dayjs | null
) => {
  if (!start || !end) return false;

  const formattedDay = day.format("YYYY-MM-DD");
  const formattedStart = start.format("YYYY-MM-DD");
  const formattedEnd = end.format("YYYY-MM-DD");

  return (
    (formattedDay === formattedStart ||
      dayjs(formattedDay).isAfter(formattedStart)) &&
    (dayjs(formattedDay).isBefore(formattedEnd) ||
      formattedDay === formattedEnd)
  );
};
