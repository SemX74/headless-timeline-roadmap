import classNames from "classnames";
import { FC } from "react";
import { TTimelineEvent } from "src/helpers/faker";

interface TimelineEventExampleProps {
  code: TTimelineEvent;
}

const TimelineEventExample: FC<TimelineEventExampleProps> = ({ code }) => {
  return (
    <div
      className={classNames(
        "w-full relative flex justify-start pl-2 items-center"
      )}
    >
      <p className="truncate w-fit text-start sticky left-2">{code.title}</p>
    </div>
  );
};

export default TimelineEventExample;
