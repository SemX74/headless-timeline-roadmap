import classNames from "classnames";
import dayjs from "dayjs";
import { ReactElement } from "react";
import { canExtend } from "src/helpers/canExtend";
import { getEventDateIndexes } from "src/helpers/getEventDateIndexes";
import { useCampaigningChartContext } from "src/hooks/useCampaignChartContext";
import { TCommonRoadmapEvent, TElementCallback } from "./RoadmapEvents";

type PropExtendedCallback<T> = (event: T) => ReactElement;

interface RoadmapEventProps<T> {
  date: string;
  events: T[];
  extended?: PropExtendedCallback<T>;
  collapsed: TElementCallback<T>;
  popover?: TElementCallback<T>;
  dates: string[];
  height: number;
  minFreeDays?: number;
  collapsedOffsetX?: number;
  extendedOffsetX?: number;
  color: string;
}

export function RoadmapEvent<T extends TCommonRoadmapEvent>({
  date,
  events,
  extended,
  popover,
  height,
  color,
  dates,
  minFreeDays = 1,
  collapsed,
  collapsedOffsetX = 1,
  extendedOffsetX = 1,
}: RoadmapEventProps<T>) {
  const { days } = useCampaigningChartContext();

  const props = getEventDateIndexes({
    days,
    endsAt: dayjs(date, "YYYY-MM-DD").toDate(),
    startsAt: dayjs(date, "YYYY-MM-DD").toDate(),
  });

  if (!props) return null;

  const isExtendedView =
    events.length === 1 && canExtend(date, dates, minFreeDays + 1) && extended;

  return (
    <>
      <div
        key={date.toString()}
        className="absolute bottom-0 pl-2 flex flex-col justify-start items-start text-center text-black"
        style={{
          left: `${
            props.percentages.position -
            (isExtendedView ? extendedOffsetX : collapsedOffsetX) / 10
          }%`,
          height: height + "px",
        }}
      >
        <div className="z-20">
          {popover?.({
            events,
            date,
            dates,
          })}
        </div>
        <div className={classNames("flex relative h-full flex-col gap-2 z-10")}>
          <div
            style={{ backgroundColor: color }}
            className="w-1 z-0 h-full absolute -translate-x-1/2 left-1/2"
          />
          {isExtendedView
            ? extended?.(events[0])
            : collapsed({ events, date, dates })}
        </div>
      </div>
    </>
  );
}
