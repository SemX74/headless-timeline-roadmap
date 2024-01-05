import dayjs from "dayjs";

export const getDaysRange = (
  startDisplayDate: dayjs.Dayjs,
  endDisplayDate: dayjs.Dayjs
) => {
  const daysToDisplay = [];
  let currentDay = startDisplayDate;

  while (
    currentDay.isBefore(endDisplayDate) ||
    currentDay.isSame(endDisplayDate)
  ) {
    daysToDisplay.push(currentDay);
    currentDay = currentDay.add(1, "day");
  }

  return daysToDisplay;
};
