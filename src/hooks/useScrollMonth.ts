import dayjs from "dayjs";
import { RefObject, useEffect, useMemo, useRef, useState } from "react";
import { useCustomScrollIntoView } from "./useScrollIntoView";

export type TDateRefMap = Record<string, RefObject<HTMLDivElement>>;

export const getRefKeyForMonth = (date: dayjs.Dayjs) => {
  return date.format("YYYY-MM-DD");
};

export const useScrollMonth = ({ days }: { days: dayjs.Dayjs[] }) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const containerRef = useRef<HTMLDivElement>(null);
  const monthRefs = useRef<TDateRefMap>({});

  const { scrollIntoView: scroll } = useCustomScrollIntoView({
    axis: "x",
    duration: 0,
    cancelable: false,
  });

  const allDays = useMemo(() => {
    return days.map((day) => getRefKeyForMonth(day));
  }, [days]);

  useEffect(() => {
    if (!containerRef.current) return;

    const newRefs = allDays.reduce((acc, day: string) => {
      const node = document.getElementById(day);
      if (node) {
        const ref = { current: node };
        acc[day] = ref as RefObject<HTMLDivElement>;
      }
      return acc;
    }, {} as TDateRefMap);
    monthRefs.current = newRefs;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const visibleEntries = new Set<string>();

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        if (entry.isIntersecting) {
          visibleEntries.add(id);
        } else {
          visibleEntries.delete(id);
        }
      });

      const sortedVisibleDates: string[] = Array.from(visibleEntries).sort();
      let medianDate = null;

      if (sortedVisibleDates.length) {
        const medianIndex = Math.floor(sortedVisibleDates.length / 2);
        medianDate = sortedVisibleDates[medianIndex];
      }

      if (medianDate) {
        const newDate = dayjs(medianDate, "YYYY-MM-DD");

        setCurrentMonth(newDate);
      }
    };

    const options = {
      root: containerRef.current,
    };

    const observer = new IntersectionObserver(handleIntersect, options);

    allDays.forEach((day) => {
      const node = document.getElementById(day);
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, [allDays]);

  useEffect(() => {
    scrollIntoView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollTo = (date: dayjs.Dayjs) => {
    const refKey = getRefKeyForMonth(date);

    const target = monthRefs.current[refKey];
    if (!target) return;

    scroll({ targetRef: target, scrollableRef: containerRef });
  };

  const nextMonth = () => {
    scrollTo(currentMonth.add(1, "month").date(1));
  };
  const startMonth = () => {
    scrollTo(days[0].date(1));
  };
  const endMonth = () => {
    scrollTo(days[days.length - 1].date(1));
  };
  const previousMonth = () => {
    scrollTo(currentMonth.subtract(1, "month").date(1));
  };
  const scrollIntoView = () => {
    scrollTo(dayjs());
  };

  return {
    days,
    currentMonth,
    nextMonth,
    previousMonth,
    startMonth,
    endMonth,
    startMonthRefs: monthRefs,
    scroll: { scrollIntoView, containerRef },
  };
};
