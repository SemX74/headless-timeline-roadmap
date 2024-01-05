import dayjs from "dayjs";
import { CSSProperties, ReactElement, useMemo } from "react";
import { findAvailableRow } from "src/helpers/findAvailableRow";
import { getEventPositionStyle } from "src/helpers/getEventPositionStyle";
import { isRangeInDaysRange } from "src/helpers/isDaysInRange";
import { useCampaigningChartContext } from "src/hooks/useCampaignChartContext";
import { useGenerateRandomDateRanges } from "src/hooks/useGenerateRandomDateRanges";
import {
  TCommonCampaignEvent,
  useOccupiedRows,
} from "src/hooks/useOccupiedRows";
import { TDateRange, useSelectDateRange } from "src/hooks/useSelectDateRange";
import { TimelineContext } from "src/hooks/useTimelineContext";
import { TimelineEvent } from "./TimelineEvent";
import { TimelinePlaceholder } from "./TimelinePlaceholder";
import TimelineDay from "./TimelineDay";

type ChildCallbackProps<T> = {
  event: T;
  index: number;
  array: T[];
  style: CSSProperties;
};
type EventsChildElement<T> = (props: ChildCallbackProps<T>) => ReactElement;

interface TimelineDaysProps<T> {
  onDayRangeChange?: (range: TDateRange) => void;
  data: T[];
  children: EventsChildElement<T>;
  dayCellProps?: {
    showPlusIconOnHover?: boolean;
    onClick?: (day: Date) => void;
  };
  placeholder?: {
    show: boolean;
    element: ReactElement | null;
    timelinesAmount: number;
  };
}

export function TimelineDays<T extends TCommonCampaignEvent>({
  onDayRangeChange,
  data = [],
  children,
  dayCellProps = {},
  placeholder = {
    show: true,
    timelinesAmount: 10,
    element: null,
  },
}: TimelineDaysProps<T>) {
  const { days } = useCampaigningChartContext();
  const fakeEvents = useGenerateRandomDateRanges(placeholder.timelinesAmount);

  const { isDayActive, ...handlers } = useSelectDateRange(onDayRangeChange);

  const events = useMemo(
    () =>
      data.filter(
        (event) =>
          !!event.starts_at &&
          !!event.ends_at &&
          isRangeInDaysRange(dayjs(event.starts_at), dayjs(event.ends_at), days)
      ),
    [data, days]
  );

  const occupiedRows = useOccupiedRows({
    data: events.length ? events : placeholder.show ? fakeEvents : events,
    days,
  });

  const getEventStyle = (event: T | TCommonCampaignEvent) => {
    const rowProps = findAvailableRow({
      days,
      endsAt: event.ends_at!,
      startsAt: event.starts_at!,
      id: event.id,
      occupiedRows,
    });
    if (!rowProps) return {};
    return getEventPositionStyle(rowProps);
  };

  return (
    <>
      <TimelineContext.Provider value={{ occupiedRows }}>
        <section className="relative">
          <section
            className="grid relative min-w-max"
            style={{
              gridTemplateColumns: `repeat(${days.length}, 1fr)`,
              height: (occupiedRows.length + 1) * 70 + "px",
            }}
          >
            {days.map((day, index) => (
              <TimelineDay
                dayCellProps={{
                  ...dayCellProps,
                  onClick: () => dayCellProps?.onClick?.(day.toDate()),
                }}
                key={index}
                day={day}
                active={isDayActive(day)}
                {...handlers}
              />
            ))}
          </section>
          {placeholder.show && !events.length && (
            <TimelinePlaceholder>{placeholder.element}</TimelinePlaceholder>
          )}
          {events.length
            ? events.map((event, i, array) =>
                children({
                  array,
                  event,
                  index: i,
                  style: getEventStyle(event),
                })
              )
            : placeholder.show
            ? fakeEvents.map((event, i) => (
                <TimelineEvent
                  key={i}
                  style={{
                    ...getEventStyle(event),
                  }}
                />
              ))
            : null}
        </section>
      </TimelineContext.Provider>
    </>
  );
}
