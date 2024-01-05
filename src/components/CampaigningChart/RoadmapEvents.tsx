import { Fragment, ReactElement } from "react";
import { transformEvents } from "src/helpers/transformEvents";
import { useCampaigningChartContext } from "src/hooks/useCampaignChartContext";
import { DateKeys } from "src/types/DateKeys.type";

export type TElementCallback<T> = (props: {
  events: T[];
  date: string;
  dates: string[];
}) => ReactElement;

interface RoadmapEventsProps<T> {
  data: T[];
  dateKey: DateKeys<T>;
  children: TElementCallback<T>;
  hide?: boolean;
}

export type TCommonRoadmapEvent = {
  id: string;
};

export function RoadmapEvents<T extends TCommonRoadmapEvent>({
  data,
  dateKey,
  children,
  hide,
}: RoadmapEventsProps<T>) {
  const { days } = useCampaigningChartContext();

  if (hide) return null;

  const dateEventsMap = transformEvents(data, days, dateKey);

  if (!data || !data.length) return null;

  const dates = Object.keys(dateEventsMap);

  return (
    <div>
      {Object.entries(dateEventsMap).map(([date, events]) => (
        <Fragment key={date}>{children({ date, events, dates })}</Fragment>
      ))}
    </div>
  );
}

export default RoadmapEvents;
