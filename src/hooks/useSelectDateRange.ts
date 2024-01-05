import dayjs from "dayjs";
import { useState, useRef } from "react";
import { isDayInRange } from "src/helpers/isDayInRange";

export type TDateRange = {
  start: dayjs.Dayjs | null;
  end: dayjs.Dayjs | null;
};
const initialDays = { start: null, end: null };

export const useSelectDateRange = (callback?: (props: TDateRange) => void) => {
  const [dateRange, setDateRange] = useState<TDateRange>(initialDays);

  const mouseIsDown = useRef<boolean>(false);
  // const clearSelection = () => {
  //   setDateRange(initialDays)
  //   callback?.(initialDays)
  // }

  const onMouseDown = (e: any) => {
    mouseIsDown.current = true;
    const startDate = dayjs(e.currentTarget?.id, "YYYY-MM-DD").startOf("day");
    const endDate = dayjs(e.currentTarget?.id, "YYYY-MM-DD").endOf("day");

    setDateRange({ start: startDate, end: endDate });
  };

  const onMouseOver = (e: any) => {
    if (!mouseIsDown.current || !dateRange.start) return;
    const startDate = dayjs(e.currentTarget?.id, "YYYY-MM-DD").startOf("day");
    const endDate = dayjs(e.currentTarget?.id, "YYYY-MM-DD").endOf("day");

    //TODO: fix this range logic
    if (dateRange.start.isAfter(startDate)) {
      setDateRange({ start: startDate, end: dateRange.end });
    } else {
      setDateRange({ start: dateRange.start, end: endDate });
    }
  };

  const onMouseUp = () => {
    mouseIsDown.current = false;
    if (dateRange.start && dateRange.end) {
      callback?.(dateRange);
    }
  };

  const isDayActive = (day: dayjs.Dayjs) =>
    isDayInRange(day, dateRange.start, dateRange.end);

  return { onMouseDown, onMouseOver, onMouseUp, isDayActive };
};
